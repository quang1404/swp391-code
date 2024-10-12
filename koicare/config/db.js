dotenv.config({ path: '../.env' });

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,   
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  host: `localhost`,
  user: `root`,
  password: `123456789`,
  database: `koicaredb`

});