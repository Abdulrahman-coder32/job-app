const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// تعديل الملف الشخصي
router.patch('/:id', auth, async (req, res) => {
  if (req.params.id !== req.user.id) return res.status(403).json({ msg: 'غير مصرح' });

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!user) return res.status(404).json({ msg: 'المستخدم غير موجود' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'خطأ في التحديث' });
  }
});

module.exports = router;