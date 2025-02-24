const db = require('../db/db');
const bcrypt = require('bcrypt');

// Register New User Controller
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: "Error registering user." });
    }
};

// ✅ Proper Export
module.exports = { registerUser };
