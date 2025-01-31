const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const pokemonRoutes = require('./routes/pokemon');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pokemon', pokemonRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Pokedex Api corriendo en el puerto ${PORT}`);
});