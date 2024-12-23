const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/pokedex');
    console.log('MongoDB conectado satisfactoriamente');
  } catch (error) {
    console.error('Error de conexión MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;