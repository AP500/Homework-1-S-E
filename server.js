const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./db.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { username, name, surname, department, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Failed Hash: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const insertQuery = 'INSERT INTO User (username, name, surname, department, password) VALUES (?, ?, ?, ?, ?)';

        db.query(insertQuery, [username, name, surname, department, hashedPassword], (err, result) => {
            if (err) {
                console.error('Failed to insert data: ', err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            console.log('Data inserted successfully.');
            res.status(200).json({ success: true });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

