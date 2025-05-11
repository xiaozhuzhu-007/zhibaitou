const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 存储预约信息的JSON文件路径
const DATA_FILE = path.join(__dirname, 'reservations.json');

// 确保数据文件存在
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

// 处理预约表单提交
app.post('/api/reservation', (req, res) => {
    const reservation = req.body;
    const reservations = JSON.parse(fs.readFileSync(DATA_FILE));
    reservations.push(reservation);
    fs.writeFileSync(DATA_FILE, JSON.stringify(reservations, null, 2));
    res.json({ success: true });
});

// 获取所有预约信息
app.get('/api/reservations', (req, res) => {
    const reservations = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(reservations);
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
