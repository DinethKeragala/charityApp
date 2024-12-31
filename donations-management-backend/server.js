const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',       // Replace with your MySQL username
    password: '',       // Replace with your MySQL password
    database: 'donations_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connected.');
    }
});

// Routes
app.get('/charities', (req, res) => {
    const sql = 'SELECT * FROM charities';
    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

app.post('/donations', (req, res) => {
    const { user_id, charity_id, amount } = req.body;
    const sql = 'INSERT INTO donations (user_id, charity_id, amount) VALUES (?, ?, ?)';
    db.query(sql, [user_id, charity_id, amount], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ success: true, message: 'Donation recorded.' });
        }
    });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
