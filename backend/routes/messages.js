const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// جلب رسائل محادثة معينة
router.get('/:applicationId', auth, async (req, res) => {
  try {
    const messages = await Message.find({ application_id: req.params.applicationId })
      .sort('timestamp');
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'خطأ في جلب الرسائل' });
  }
});

// إرسال رسالة (اختياري، لأن الـ socket هيعملها، بس مفيد لو عايز HTTP)
router.post('/', auth, async (req, res) => {
  const { application_id, message } = req.body;
  try {
    const newMessage = new Message({
      application_id,
      sender_id: req.user.id,
      message
    });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'خطأ في إرسال الرسالة' });
  }
});

module.exports = router;