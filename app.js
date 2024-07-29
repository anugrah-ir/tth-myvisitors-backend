const express = require('express');
const sequelize = require('./src/config/database')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('success');
});

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app
    .listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
    .on('error', (error) => {
        console.error('Error starting the server:', error);
    });