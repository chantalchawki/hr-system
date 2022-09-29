const mongoose = require('mongoose');

const connect = async () => {
  try {
    const url = process.env.DATABASE_URL || 'mongodb://database:27017/hr-system';
    await mongoose.connect(url);
    console.log('Connected to database');
  } catch (err) {
    console.log(`Error connecting to database ${err}`);
  }
};

module.exports = connect;