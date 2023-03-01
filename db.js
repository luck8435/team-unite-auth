const mongoose = require('mongoose');

module.exports = () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect('mongodb://127.0.0.1:27017/team-unite');
        console.log(`Connected to  mongodb database`);
    } catch (error) {
        console.log(error);
        console.log('could not connect to db');
    }
};
