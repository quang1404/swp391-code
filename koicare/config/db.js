const mysql = require("mysql2");

const databaseConfig = {
  host: process.env.DATABASE_HOST || "127.0.0.1",
  port: process.env.DATABASE_PORT || 3333,
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "123456789",
  database: process.env.DATABASE_NAME || "koicaredb"
}
console.log(databaseConfig)
const db = mysql.createConnection(databaseConfig);

// db.connect((error) => {
//   if (error) {
//     console.error("MySQL connection error:", error.message);  
//   } else {
//     console.log("MYSQL Connected");
//   }
// });

module.exports = db