const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Application = require('../models/Application');
const JobListing = require('../models/JobListing');

// تقديم على وظيفة
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'job_seeker') return res.status(403).json({ msg: 'غير مصرح' });

  const { job_id, message } = req.body;
  try {
    const job = await JobListing.findById(job_id);
    if (!job) return res.status(404).json({ msg: 'الوظيفة غير موجودة' });

    const existing = await Application.findOne({ job_id, seeker_id: req.user.id });
    if (existing) return res.status(400).json({ msg: 'سبق وتقدمت على هذه الوظيفة' });

    const app = new Application({ job_id, seeker_id: req.user.id, message });
    await app.save();
    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ msg: 'خطأ' });
  }
});

// جلب المتقدمين على وظيفة معينة (لصاحب المحل)
router.get('/job/:jobId', auth, async (req, res) => {
  try {
    const job = await JobListing.findById(req.params.jobId);
    if (!job || job.owner_id.toString() !== req.user.id) return res.status(403).json({ msg: 'غير مصرح' });

    const applications = await Application.find({ job_id: req.params.jobId })
      .populate('seeker_id', 'name age governorate city work_experience')
      .sort('-createdAt');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: 'خطأ' });
  }
});

// جلب تقديماتي
router.get('/my', auth, async (req, res) => {
  try {
    const applications = await Application.find({ seeker_id: req.user.id })
      .populate('job_id', 'shop_name category governorate city')
      .sort('-createdAt');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ msg: 'خطأ' });
  }
});

// تحديث حالة التقديم (قبول/رفض)
router.patch('/:id', auth, async (req, res) => {
  const { status } = req.body;
  try {
    const app = await Application.findById(req.params.id).populate('job_id');
    if (!app) return res.status(404).json({ msg: 'التقديم غير موجود' });

    if (app.job_id.owner_id.toString() !== req.user.id) return res.status(403).json({ msg: 'غير مصرح' });

    app.status = status;
    await app.save();
    res.json(app);
  } catch (err) {
    res.status(500).json({ msg: 'خطأ' });
  }
});

module.exports = router;