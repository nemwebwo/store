
require('dotenv').config();

const express = require('express');
const path = require('path');

const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// กำหนด EJS เป็น View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware สำหรับอ่านข้อมูลจาก Form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// เปิดให้ Browser เข้าถึงไฟล์ CSS, JS, Images
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', dashboardRoutes);

// จัดการ URL ที่ไม่มีในระบบ
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

// เริ่มต้น Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
