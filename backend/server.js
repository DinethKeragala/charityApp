require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        process.exit(1); // Stops the server if DB connection fails
    }
    console.log('✅ Connected to the MySQL Database');
});

// ✅ ROOT Route
app.get('/', (req, res) => {
    res.send('Welcome to the Donation Management System API!');
});


// ✅ Register Route
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    db.query(sql, [username, email, password], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error. Please try again.' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// ✅ Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error. Please try again.' });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful!' });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

// ✅ Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
