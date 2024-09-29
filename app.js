const express = require('express');
const sequelize = require('./src/config/database');
const routes = require('./src/routes/index');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);
app.use(express.static('public'));

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((error) => {
        console.error('Error synchronizing the database:', error);
    });
    
app
    .listen(port, () => {
        console.log(`App listening on port ${port}`);
    })
    .on('error', (error) => {
        console.error('Error starting the server:', error);
    });