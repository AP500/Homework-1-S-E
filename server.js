const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./db.js');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

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

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const selectQuery = 'SELECT * FROM User WHERE username = ?';

    db.query(selectQuery, [username], (err, results) => {
        if (err) {
            console.error('Failed to fetch user data: ', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length === 0) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (compareErr, match) => {
            if (compareErr) {
                console.error('Failed to compare passwords: ', compareErr);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (!match) {
                res.status(401).json({ error: 'Incorrect password' });
                return;
            }

            res.status(200).json({ success: true });
        });
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

