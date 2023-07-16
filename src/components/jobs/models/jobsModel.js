const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const jobsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Provide a job title.'],
    trim: true,
    maxLength: [100, 'Job title can not exceed 100 characters.'],
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'Job description can not be empty.'],
    maxLength: [1000, 'Job description is too long.'],
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please provide a valid email address.'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address.'],
  },
  company: {
    type: String,
    required: [true, "Please add the company's name"],
  },
  industry: {
    type: [String],
    required: true,
    enum: {
      values: [
        'Business',
        'Information Technology',
        'Banking',
        'Education/Training',
        'Telecommunications',
        'Others',
      ],
      message: 'Please select the correct options for industry',
    },
  },
  jobType: {
    type: String,
    required: true,
    enum: {
      values: [
        'Permanent',
        'Temporary',
        'Internship',
      ],
      message: 'Please select the correct options for job type',
    },
  },
  minEducation: {
    type: String,
    required: true,
    enum: {
      values: [
        'Bachelors',
        'Masters',
        'Phd',
      ],
      message: 'Please select the correct options for education',
    },
  },
  positions: {
    type: Number,
    default: 1,
  },
  experience: {
    type: String,
    required: true,
    enum: {
      values: [
        'No Experience',
        '1 year - 2 years',
        '2 years - 5 years',
        '5 years+',
      ],
      message: 'Please select the correct options for experience',
    },
  },
  salary: {
    type: Number,
    required: [true, 'Please enter the expected salary for this job'],
  },
  postingDate: {
    type: Date,
    default: Date.now,
  },
  lastDate: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + 7),
  },
  applicantsApplied: {
    type: [Object],
    select: false,
  },
});

// Create slug before saving
jobsSchema.pre('save', function createSlug(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Job', jobsSchema);
