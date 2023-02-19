const mongoose = require('mongoose');

module.exports = () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect('mongodb://localhost:27017/team-unite');
        console.log(`Connected to  mongodb database`);
    } catch (error) {
        console.log(error);
        console.log('could not connect to db');
    }
}