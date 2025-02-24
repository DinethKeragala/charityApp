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
    database: process.env.DB_NAME,
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
    const { fullName, username, email, password} = req.body;

    const query = `
        INSERT INTO users (full_name, username, email, password) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [fullName, username, email, password],
        (err, result) => {
            if (err) {
                console.error('Error inserting data:', err.message);
                return res.status(500).json({ message: 'Registration failed.' });
            }
            res.status(200).json({ message: 'Registration successful.' });
        }
    );
});
// ✅ Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error. Please try again.' });
        }

        if (results.length > 0) {
            const user = results[0];
            res.status(200).json({ message: 'Login successful!', user_id: user.id });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});


// ✅ Fetch all charities
app.get('/api/charities', (req, res) => {
    db.query('SELECT * FROM charities', (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// ✅ Fetch Charity Details and Leaderboard
app.get('/api/charities/:id', (req, res) => {
    const { id } = req.params;

    const charityQuery = `SELECT * FROM charities WHERE id = ?`;
    const leaderboardQuery = `
        SELECT users.username, donations.amount 
        FROM donations 
        JOIN users ON donations.user_id = users.id 
        WHERE donations.charity_id = ?
        ORDER BY donations.amount DESC
        LIMIT 10
    `;

    db.query(charityQuery, [id], (err, charityResults) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (charityResults.length === 0) {
            return res.status(404).json({ error: 'Charity not found' });
        }

        db.query(leaderboardQuery, [id], (err, leaderboardResults) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            console.log('Leaderboard results:', leaderboardResults); // Debugging tip
            res.json({
                charity: charityResults[0],
                leaderboard: leaderboardResults,
            });
        });
    });
});

// ✅ Record a Donation
app.post('/api/donations', (req, res) => {
    const { user_id, charity_id, amount } = req.body;

    console.log('Received donation data:', { user_id, charity_id, amount }); // Debugging tip

    if (!user_id || !charity_id || !amount) {
        console.error('Invalid input:', { user_id, charity_id, amount });
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `INSERT INTO donations (user_id, charity_id, amount) VALUES (?, ?, ?)`;

    db.query(sql, [user_id, charity_id, amount], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error. Please try again.' });
        }
        console.log('Donation inserted:', result); // Debugging tip
        res.status(201).json({ message: 'Donation recorded successfully!' });
    });
});

// ✅ Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
