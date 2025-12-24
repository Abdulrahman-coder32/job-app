const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const Message = require('./models/Message'); // تأكد من وجود المودل

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages')); // إذا أنشأت route للرسائل

// Socket Authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error('غير مصرح'));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;  // { id, role }
    next();
  } catch (err) {
    next(new Error('توكن غير صالح'));
  }
});

io.on('connection', (socket) => {
  console.log('مستخدم متصل:', socket.user.id);
  socket.join(socket.user.id);

  // الإضافة المطلوبة: استقبال الرسائل وإرسالها فوريًا لكل المشاركين في المحادثة
  socket.on('sendMessage', async (data) => {
    try {
      const newMessage = new Message({
        application_id: data.application_id,
        sender_id: socket.user.id,
        message: data.message
      });
      await newMessage.save();

      // بث الرسالة لكل من في غرفة المحادثة (application_id)
      io.to(data.application_id).emit('newMessage', newMessage);
    } catch (err) {
      console.error('خطأ في إرسال الرسالة:', err);
    }
  });

  // اختياري: انضمام للغرفة عند فتح المحادثة
  socket.on('joinChat', (applicationId) => {
    socket.join(applicationId);
    console.log(`المستخدم ${socket.user.id} انضم للمحادثة ${applicationId}`);
  });

  socket.on('disconnect', () => {
    console.log('مستخدم انفصل:', socket.user.id);
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend شغال تمام مع Angular!', socket: 'Socket.IO جاهز' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ متصل بـ MongoDB Atlas');
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 السيرفر شغال على http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error('❌ خطأ في الاتصال بقاعدة البيانات:', err));