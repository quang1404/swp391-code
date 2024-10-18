const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const databaseConfig = {
  host: process.env.HOST || "127.0.0.1",
  port: process.env.PORT || 3333,
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "123456789",
  database: process.env.DATABASE || "koicaredb",
}

const db = mysql.createConnection();

// db.connect((error) => {
//   if (error) {
//     console.error("MySQL connection error:", error.message);  
//   } else {
//     console.log("MYSQL Connected");
//   }
// });

module.exports = db