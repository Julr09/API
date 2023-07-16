const express = require('express');

const router = express.Router();
const {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJob,
  getJobStats,
} = require('../controllers/jobsController');

router.get('/', getJobs);
router.post('/', createJob);
router.get('/stats/:topic', getJobStats);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
router.get('/:id/:slug', getJob);

module.exports = router;
