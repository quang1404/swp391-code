const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateToken } = require('../utils/helper');

const User = require('../models/user');
const { verifyToken } = require('../middleware/authMiddleware');


// Login
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        User.getUserByEmail(email, async (error, user) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = generateToken(user.id);
                    return res.json({
                        message: "Login successful",
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                } else {
                    return res.status(401).json({ message: "Invalid credentials" });
                }
            } else {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, password_confirm } = req.body;

        if (!name || !email || !password || !password_confirm) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (password !== password_confirm) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser({ name, email, password: hashedPassword, password_confirm }, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            } else {
                return res.status(201).json({ message: "User registered" });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// View Profile 
router.get('/profile/:userId', verifyToken, (req, res) => { 
    const userId = req.params.userId;

    console.log("Authenticated user ID:", req.userId);

    User.getUserById(userId, (error, user) => {
        if (error) {
            console.error('Error fetching user profile:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found'   
 });
        }

        const { password, ...userData } = user;

        res.json({ user: userData });
    });
});

// Update Profile
router.put('/profile/:userId', verifyToken, (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    User.updateUserById(userId, updatedUserData, (error, affectedRows) => {
        if (error) {
            console.error('Error updating user profile:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully' });
    });
});

module.exports = router;