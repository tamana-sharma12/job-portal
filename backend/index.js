const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const cors = require("cors");
const User = require("./userSchema");
const bcrypt = require("bcrypt");
// const Job = require("./job");
const Job = require("./jobSchema");
const Application = require("./applicationsSchema");
const SavedJob = require("./savedJobSchema");
const Message = require("./Message");
require("./db");

const {rateLimit} = require("express-rate-limit")

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",limiter,(req,res)=>{
    res.send("Backend is Running");
});

//register
app.post("/register" ,async(req,res)=>{
    try {
        const {name, email,password,role} =req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields are required"
            });
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message :"Email Already Registered"
            });
        }
        const hashPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            password:hashPassword,
            role
        });

        await newUser.save();

        res.status(201).json({
            message :"User Registered successfully",
            user : newUser
        });
        
    } catch (error) {
        res.status(500).json({
            message : "Server error",error:error.message});        
    }
})
//jobs
app.post("/jobs",async(req,res)=>{
    try {
        const job = await Job.create(req.body);

        res.status(201).json({message:"Job added Successfully",data:job});
        
    } catch (error) { 
        res.status(500).json({message:"Job not added",error:error.message});
    }
})



//login
    app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email not Found"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Password incorrect"
            });
        }

        // Login successful
        res.status(200).json({
            message: "User Login successfully",
            role: user.role,
            name : user.name,
            email: user.email
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});
//create

app.post("/create-job", async (req, res) => {

    try {

        const {
            jobTitle,
            companyName,
            location,
            salary,
            jobType,
            skills,
            description,
            employerEmail
        } = req.body;

        if (!employerEmail) {
            return res.status(400).json({
                message: "Employer email is required"
            });
        }

        const job = new Job({
            jobTitle,
            companyName,
            location,
            salary,
            jobType,
            skills,
            description,
            employerEmail
        });

        await job.save();

        res.status(201).json({
            message: "Job created successfully",
            job: job
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }

});
// Get all jobs
app.get("/jobs", async (req, res) => {
    try {

        const jobs = await Job.find();

        res.status(200).json({
            message: "Jobs fetched successfully",
            jobs: jobs
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Jobs not found",
            error: error.message
        });

    }
});

//get single job
app.get("/jobs/:id",async(req,res)=>{
    try{
        const job = await Job.findById(req.params.id);
        if(!job){
            return res.status(404).json({
                message:"Job not Found"
            });
        }
        res.status(200).json({message:"Job fetched successfully", job:job});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Server error",error:error.message});
    }
});

//Update job
app.put("/jobs/:id",async(req,res)=>{
    try{
        const updatedJob = await Job.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        }
    );
    if(!updatedJob){
        return res.status(404).json({message:"job not found"});
    }
    res.status(200).json({message:"Job updated successfully",job:updatedJob});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Job update failed",error:error.message});
    }
});
//delete
// Delete Job
app.delete("/jobs/:id", async (req, res) => {
    try {

        const deletedJob = await Job.findByIdAndDelete(req.params.id);

        if (!deletedJob) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Job delete failed",
            error: error.message
        });

    }
});

//get all applicants
app.get("/applicants",async(req,res)=>{
    try{
        const applicants=await Application.find();
        res.status(200).json({message:"Applicants fetched successfully",applicants,});
    }catch(error){
        res.status(500).json({message:"Server Error",error:error.message,});

    }
});

app.post("/apply-job", async (req, res) => {
    try {

        const {name,email,jobId,jobTitle,companyName,} = req.body;
if(!name|| !email || !jobId|| !jobTitle || !companyName){
    return res.status(400).json({message:"All fields are required"});
}
        const alreadyApplied = await Application.findOne({
            email: email,
            jobId: jobId
        });

        if (alreadyApplied) {
            return res.status(400).json({
                message: "You have already applied for this job"
            });
        }

        
        const application = new Application({
            name:name,
            email:email,
            jobId:jobId,
            jobTitle:jobTitle,
            companyName:companyName,
            status:"New"
        });

        await application.save();

        res.status(201).json({
            message: "Job applied successfully",
            application: application    });

    } catch (error) {

        console.log(error);

  res.status(500).json({message: "server error",error: error.message});
    }
});

// Update application status
app.put("/applicants/:id/status", async(req,res)=>{
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(
            req.params.id,
            {status:status},
            {new:true}
        );
        if(!application){
            return res.status(404).json({message:"Application not found"});
        }
        res.status(200).json({message:"Application status updated successfully"});
    
    }catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error ", error:error.message});
        
    }
})

// Get Job Seeker's Applications
app.get("/my-applications/:email", async (req, res) => {
    try {
        const { email } = req.params;
        const applications = await Application.find({
            email: email
         }).sort({
             appliedOn: -1
         });
        res.status(200).json({message: "Applications fetched successfully",applications: applications});
     } catch (error) {
         console.log(error);
         res.status(500).json({message: "Server error",error: error.message});
     }
 });

// Save Job
app.post("/save-job", async (req, res) => {
    try {

        const {name,email,jobId,jobTitle,companyName,location} = req.body;

        if (!name ||!email ||!jobId ||!jobTitle ||!companyName ||!location) {
            return res.status(400).json({message: "All fields are required"});
        }

        const alreadySaved = await SavedJob.findOne({
            email: email,
            jobId: jobId
        });

        if (alreadySaved) {return res.status(400).json({message: "Job already saved"});
        }

         const savedJob = new SavedJob({
             name: name,
             email: email,
             jobId: jobId,
             jobTitle: jobTitle,
             companyName: companyName,
             location: location
         });
        

        await savedJob.save();

        res.status(201).json({message: "Job saved successfully",savedJob: savedJob});

    } catch (error) {

        console.log(error);

        res.status(500).json({message: "Server error",error: error.message});

    }
});

// Get Saved Jobs

app.get("/saved-jobs/:email", async (req, res) => {
    try {

        const { email } = req.params;

        const savedJobs = await SavedJob.find({
            email: email
        }).sort({
            createdAt: -1
        });

        res.status(200).json({message: "Saved jobs fetched successfully",savedJobs: savedJobs});

    } catch (error) {

        console.log(error);

        res.status(500).json({message: "Server error",error: error.message});

    }
});

// Get Job Seeker Profile
app.get("/profile/:email",async(req,res)=>{
    try {
        
        const {email} = req.params;

        const user = await User.findOne({email:email});

        if(!user){

            return res.status(404).json({message:"User no Found"});

        }

        res.status(200).json({message:"Profile fetched successfully", user:user});

    } catch (error) {
        console.log(error);
    
        res.status(500).json({message:"Server error",error:error.message});  
    }
})

// ================= COMPANY PROFILE =================

// Get Company Profile
app.get("/company-profile/:email", async (req, res) => {

    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({message: "Employer not found"});
        }
        res.status(200).json({message: "Company profile fetched successfully",company: user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error",error: error.message});
    }

});


// Update Company Profile
app.put("/company-profile/:email", async (req, res) => {

    try {

        const { email } = req.params;
        const{companyName,phone,location,website,companyDescription}=req.body;
        const user = await User.findOneAndUpdate(

            { email: email },

            {
                companyName: companyName,
                phone: phone,
                location: location,
                website: website,
                companyDescription: companyDescription
            },

            { new: true }

        );
    
        
        if (!user) {

            return res.status(404).json({message: "Employer not found"});

        }
        res.status(200).json({message: "Company profile updated successfully",company: user});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error",error: error.message});
    }

});


//send message
app.post("/send-message", async (req, res) => {
    try {

        const {senderName,senderEmail,employerEmail,jobId,jobTitle,companyName,message} = req.body;

        if (!senderName ||!senderEmail ||!employerEmail ||!jobId ||!jobTitle || !companyName ||!message   ) {
            return res.status(400).json({message: "All fields are required"});
        }

    const newMessage = new Message({senderName,senderEmail,employerEmail,jobId,jobTitle,companyName,message});

        await newMessage.save();

        res.status(201).json({
            message: "Message Sent successfully",
            data: newMessage
        });

    } catch (error) {

        console.log("Send Message Error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


app.get("/messages/:email", async (req, res) => {
    try {

        const email = req.params.email;

        const messages = await Message.find({
            employerEmail: email
        }).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Messages fetched successfully",
            messages: messages
        });

    } catch (error) {

        console.log("Get Messages Error:", error);

        res.status(500).json({
            message: "Messages not found",
            error: error.message
        });

    }
});

app.listen(4000,()=>{
    console.log("Server is Running on port 4000");
});
