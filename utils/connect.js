const model = require('../models/user.model');
const mongoose = require('mongoose');

const connectDB = (dbUri) => {
  return mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to ${model.db.name} database.`);
  })
  .catch((error) => {
    console.log(error);
  })
};

module.exports = connectDB;