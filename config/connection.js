//import the Sequelize constructor from the library
const Sequelize = require('sequelize');

//load .env into connection.js file
require('dotenv').config();

//server port, to deploy app
const PORT = process.env.PORT || 3001;

//create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize('just_tech_news_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;
