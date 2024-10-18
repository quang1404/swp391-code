const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("hello world")
    // res.render('index');
});

router.get('/register', (req, res) => {
    res.render('register'); 
});

module.exports = router;