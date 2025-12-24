const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job_id: { type: mongoose.Schema.Types.ObjectId, ref: 'JobListing', required: true },
  seeker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

applicationSchema.index({ job_id: 1, seeker_id: 1 });

module.exports = mongoose.model('Application', applicationSchema);