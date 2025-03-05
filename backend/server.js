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
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM admin_users WHERE username = ?`;
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error. Please try again.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const admin = results[0];
        const isPasswordValid = await bcrypt.compare(password, admin.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', admin_id: admin.id });
    });
});


app.post('/register', async (req, res) => {
    const { fullName, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // ✅ Hash password

    const sql = `INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)`;
    db.query(sql, [fullName, username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ message: 'Registration failed.' });
        }
        res.status(200).json({ message: 'Registration successful.' });
    });
});

const jwt = require('jsonwebtoken'); // JSON Web Token for authentication
const bcrypt = require('bcrypt');

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM users WHERE username = ?`;
    db.query(sql, [username], async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error. Please try again.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ 
            message: 'Login successful!',
            userId: user.id,  // Send user ID
            token 
        });
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

// Fetch all events
app.get('/api/events', (req, res) => {
    db.query('SELECT * FROM events', (err, results) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Fetch a single event by ID
app.get('/api/events/:id', (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM events WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).send(err);
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(result[0]);
    });
});

app.post('/api/events', (req, res) => {
    const { name, description, date, image } = req.body;

    // Convert the date to the MySQL compatible format (YYYY-MM-DD HH:MM:SS)
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

    const query = 'INSERT INTO events (name, description, date, image) VALUES (?, ?, ?, ?)';
    
    db.query(query, [name, description, formattedDate, image], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to create event', details: err });
        }
        res.status(201).json({ message: 'Event created successfully' });
    });
});

// server.js

app.post('/api/volunteers', (req, res) => {
    const { fullName, email, phone, address, eventId } = req.body;

    const query = `
        INSERT INTO volunteers (full_name, email, phone, address, event_id) 
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [fullName, email, phone, address, eventId],
        (err, result) => {
            if (err) {
                console.error('Error inserting data:', err.message);
                return res.status(500).json({ message: 'Volunteer registration failed.' });
            }
            res.status(200).json({ success: true, message: 'Volunteer registration successful.' });
        }
    );
});

app.get('/api/user/:id', async (req, res) => {
    const { id } = req.params;
    
    const sql = "SELECT full_name, username, email, profile_photo FROM users WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("User data fetched from database:", results[0]);
        res.json(results[0]);
    });
});


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, req.body.userId + path.extname(file.originalname)); // Save file as userId.extension
    },
});

const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post("/api/upload-profile-photo", upload.single("profilePhoto"), (req, res) => {
    const { userId } = req.body;

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = `/uploads/${req.file.filename}`;

    const sql = "UPDATE users SET profile_photo = ? WHERE id = ?";
    db.query(sql, [filePath, userId], (err) => {
        if (err) return res.status(500).json({ error: "Database update failed." });

        res.json({ message: "Profile photo updated successfully!", filePath });
    });
});

// Add these new endpoints after the existing routes

// ✅ Fetch total donations for a user
app.get('/api/user/:id/total-donations', (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT SUM(amount) AS total_donated 
        FROM donations 
        WHERE user_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // If no donations are found, return 0
        const totalDonated = results[0].total_donated || 0;
        res.json({ total_donated: totalDonated });
    });
});
// ✅ Fetch number of events participated by a user
app.get('/api/user/:id/events-participated', (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT COUNT(*) AS events_participated 
        FROM events 
        WHERE user_id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // If no events are found, return 0
        const eventsParticipated = results[0].events_participated || 0;
        res.json({ events_participated: eventsParticipated });
    });
});


// ✅ Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
