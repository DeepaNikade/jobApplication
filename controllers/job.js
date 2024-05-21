const JobModel = require("../models/job");

const createJob = async (req, res) => {
  try {
    const jobObj = req.body;
    const newJob = new JobModel(jobObj);
    const newlySavedJob = await newJob.save();

    res.json({
      success: true,
      message: "Job created successfully",
      jobId: newlySavedJob._id,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong, please try again after sometime",
    });
  }
};

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
    const jobId = req.params.jobId;
    console.log(jobId);
    console.log(req.body);

    await JobModel.findByIdAndUpdate(jobId, req.body);
    const updatedjob = await JobModel.findById(jobId);

    res.json({
      success: true,
      message: "Job edited successfully",
      updatedjob,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "Something went wrong, please try again after sometime",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    await JobModel.findByIdAndDelete(jobId, req.body);
    res.status(200).json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};

const jobController = {
  createJob,
  listJob,
  editJob,
  deleteJob,
};

module.exports = jobController;
