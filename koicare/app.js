const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cors = require('cors');
const https = require('https')

const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/homeRoutes');
const koiRoutes = require('./routes/koiRoutes');
const koiGrowthRoutes = require('./routes/koiGrowthRoutes');
const pondRoutes = require('./routes/pondRoutes');
const productRoutes = require('./routes/productRoutes');
const waterValueRoutes = require('./routes/waterValueRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes'); 
const newsBlogRoutes = require('./routes/newsBlogRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./koi_swagger.yaml');
const dashboardRoutes = require('./routes/dashboardRoutes');
const db = require("./config/db");

dotenv.config({ path: './.env' }); 
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  };
  
  app.use(cors(corsOptions));  

// const db = mysql.createConnection({
//     host: "127.0.0.1",
//     port: 33060,
//     user: "root",
//     password: "123456789",
//     database: "koicare"
// });

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
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes); 
app.use('/newsBlog', newsBlogRoutes);
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/dashboard', dashboardRoutes);

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected")
    }
});

app.get("/", (req, res) => {
    res.render('index');
});

https.createServer(app).listen(443)

// app.listen(80, () => {
//     console.log("Server started on Port 80");
// });