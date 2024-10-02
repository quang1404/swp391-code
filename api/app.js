const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/homeRoutes'); 
const koiRoutes = require('./routes/koiRoutes');
const koiGrowthRoutes = require('./routes/koiGrowthRoutes');
const pondRoutes = require('./routes/pondRoutes');
const productRoutes = require('./routes/productRoutes');
const waterValueRoutes = require('./routes/waterValueRoutes');

const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRoutes); 
app.use('/', homeRoutes); 
app.use('/koi', koiRoutes);
app.use('/koiGrowth', koiGrowthRoutes);
app.use('/pond', pondRoutes);
app.use('/product', productRoutes);
app.use('/waterValue', waterValueRoutes);

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected")
    }
});

// login api
app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Internal server error" });
            }
            if (results.length
                > 0) {
                const user = results[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const token = jwt.sign({
                        id: user.id
                    }, process.env.JWT_SECRET, {
                        expiresIn:
                            '1h'
                    });
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

// register api
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, password_confirm } = req.body;

        if (!name || !email || !password || !password_confirm) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }

        if (password !== password_confirm) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = await bcrypt.hash(password,
            10);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: "Internal server error"
                });
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

// profile api
app.get('/profile/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT * FROM users WHERE id = ?';

    db.query(query, [userId], (error, results) => {
        if (error) {
            console.error('Error fetching user profile:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];

        const { password, ...userData } = user;

        res.json({ user: userData });
    });
});

// update profile api
app.put('/profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    const query = 'UPDATE users SET ? WHERE id = ?'; // dùng để update usre trong database

    db.query(query, [updatedUserData, userId], (error, results) => {
        if (error) {
            console.error('Error updating user profile:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message:
                    'User not found'
            });
        }

        res.json({ message: 'Profile updated successfully' });
    });
});


app.get("/", (req, res) => {
    res.render('index');
});


app.listen(3000, () => {
    console.log("Server started on Port 3000");
});