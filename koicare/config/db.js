const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const db = mysql.createConnection({
  host: "127.0.0.1",
  port: 3333,
  user: "root",
  password: "123456789",
  database: "koicaredb",
});

// db.connect((error) => {
//   if (error) {
//     console.error("MySQL connection error:", error.message);  
//   } else {
//     console.log("MYSQL Connected");
//   }
// });

module.exports = db