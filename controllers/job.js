const JobModel=require("../models/job");

const createJob =async(req,res)=>{
    try {
        const jobObj=req.body;
        const newJob=new JobModel(jobObj);
        const newlySavedJob=await newJob.save();

        res.json({
            success:true,
            message: "Job created successfully",
            jobId: newlySavedJob._id,
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong, please try again after sometime",
          });
        } 
    
}

const listJob = async (req, res) => {
    try {
      const { minSalary, maxSalary } = req.query;
      const jobsList = await JobModel.find({
        $and: [{ salary: { $gte: minSalary } }, { salary: { $lte: maxSalary } }],
      });
    
      res.json({
        success: true,
        message: "List job api",
        results: jobsList,
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Something went wrong, please try again after sometime",
      });
    }
  };


  const editJob = async (req, res) => {
    try {
      const jobId = req.params.id;
      console.log(jobId);
      console.log(req.body);
    
      await JobModel.findByIdAndUpdate(jobId, req.body);
     
      const findObj = {
        company: "Google",
      };
      const updateObj = {
        age: 10,
      };
      
      res.json({
        success: true,
        message: "Job edited successfully",
      });
    } catch (err) {
      res.json({
        success: false,
        message: "Something went wrong, please try again after sometime",
      });
    }
  };

  const deleteJob = async (req, res) => {
    const jobId = req.params.id;
   
    const findObj = {
      age: 0,
    };
   
    await JobModel.deleteMany(findObj); // Dangerous method (Avoid using it)
    res.json({
      success: true,
      message: "Dummy Delete job api",
    });
  };
  

  const jobController = {
    createJob,
    listJob,
    editJob,
    deleteJob,
  };
  
  module.exports = jobController;