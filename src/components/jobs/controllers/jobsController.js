const Job = require('../models/jobsModel');

exports.getJobs = async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json({
    success: true,
    results: jobs.length,
    data: jobs,
  });
};

exports.createJob = async (req, res) => {
  const job = await Job.create(req.body);

  res.status(200).json({
    success: true,
    message: 'Job created',
    data: job,
  });
};

exports.updateJob = async (req, res) => {
  let job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: 'Job updated',
    data: job,
  });
};

exports.deleteJob = async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  await Job.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: 'Job deleted',
  });
};

exports.getJob = async (req, res) => {
  const job = await Job.find({
    $and: [
      { _id: req.params.id },
      { slug: req.params.slug },
    ],
  });

  if (!job || job.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Job not found',
    });
  }

  return res.status(200).json({
    success: true,
    data: job,
  });
};

exports.getJobStats = async (req, res) => {
  const stats = await Job.aggregate([
    {
      $match: { $text: { $search: `"${req.params.topic}"` } },
    },
    {
      $group: {
        _id: { $toUpper: '$experience' },
        totalJobs: { $sum: 1 },
        averagePositions: { $avg: '$positions' },
        averageSalary: { $avg: '$salary' },
        minSalary: { $min: '$salary' },
        maxSalary: { $max: '$salary' },
      },
    },
  ]);

  if (stats.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No stats found for ${req.params.topic}`,
    });
  }

  return res.status(200).json({
    success: true,
    data: stats,
  });
};
