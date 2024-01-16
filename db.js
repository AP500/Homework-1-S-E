const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'word123',
  database: 'Homework1-SE',
});

connection.connect((err) => {
  if (err) {
    console.error('Failed to connect: ', err);
    return;
  }
  console.log('Connection succesfull.');
});

module.exports = connection;
