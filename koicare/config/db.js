const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const db = mysql.createConnection({
  host: `localhost`,
  user: `root`,
  password: `123456789`,
  database: `koicaredb`

});

db.connect((error) => {
  if (error) {
    console.error("MySQL connection error:", error);   
  } else {
    console.log("MYSQL Connected");
  }
});

module.exports = db;