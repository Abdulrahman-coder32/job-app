const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JobListing = require('../models/JobListing');
const mongoose = require('mongoose');

// أول حاجة: الـ routes الثابتة زي /my و /
router.get('/my', auth, async (req, res) => {
  console.log('طلب جلب وظائفي من user ID:', req.user.id, 'Role:', req.user.role);

  if (req.user.role.trim().toLowerCase() !== 'shop_owner') {
    console.log('رفض الطلب: الـ role مش shop_owner');
    return res.status(403).json({ msg: 'غير مصرح - يجب أن تكون صاحب محل' });
  }

  try {
    const jobs = await JobListing.find({ owner_id: req.user.id }).sort({ createdAt: -1 });
    console.log('تم جلب وظائفي بنجاح، العدد:', jobs.length);
    res.json(jobs);
  } catch (err) {
    console.error('خطأ في جلب وظائفي:', err);
    res.status(500).json({ msg: 'خطأ في السيرفر' });
  }
});

// جلب كل الوظائف (مع فلاتر)
router.get('/', async (req, res) => {
  try {
    const { governorate, city, category } = req.query;
    const filter = {};

    if (governorate) filter.governorate = governorate;
    if (city) filter.city = city;
    if (category) filter.category = category;

    const jobs = await JobListing.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('خطأ في جلب الوظائف:', err);
    res.status(500).json({ msg: 'خطأ في السيرفر' });
  }
});

// بعد كده: الـ routes الديناميكية زي /:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'معرف الوظيفة غير صالح' });
  }

  try {
    const job = await JobListing.findById(id);
    if (!job) {
      return res.status(404).json({ msg: 'الوظيفة غير موجودة' });
    }
    res.json(job);
  } catch (err) {
    console.error('خطأ في جلب الوظيفة:', err);
    res.status(500).json({ msg: 'خطأ في السيرفر' });
  }
});

// إنشاء وظيفة جديدة
router.post('/', auth, async (req, res) => {
  console.log('محاولة نشر وظيفة من user ID:', req.user.id, 'Role:', req.user.role);

  if (req.user.role.trim().toLowerCase() !== 'shop_owner') {
    console.log('رفض النشر: الـ role مش shop_owner');
    return res.status(403).json({ msg: 'غير مصرح - يجب أن تكون صاحب محل' });
  }

  try {
    const job = new JobListing({
      ...req.body,
      owner_id: req.user.id
    });

    await job.save();
    console.log('وظيفة جديدة تم إنشاؤها بنجاح، owner_id:', req.user.id, 'job ID:', job._id);
    res.status(201).json(job);
  } catch (err) {
    console.error('خطأ في إنشاء الوظيفة:', err);
    res.status(500).json({ msg: 'خطأ في السيرفر' });
  }
});

// حذف وظيفة (آخر حاجة، لأنها ديناميكية برضو)
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ msg: 'معرف الوظيفة غير صالح' });
  }

  try {
    const job = await JobListing.findById(id);
    if (!job) {
      return res.status(404).json({ msg: 'الوظيفة غير موجودة' });
    }

    if (job.owner_id.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'غير مصرح - ليس وظيفتك' });
    }

    await job.deleteOne();
    console.log('تم حذف الوظيفة بنجاح، ID:', id);
    res.json({ msg: 'تم حذف الوظيفة بنجاح' });
  } catch (err) {
    console.error('خطأ في حذف الوظيفة:', err);
    res.status(500).json({ msg: 'خطأ في السيرفر' });
  }
});

module.exports = router;