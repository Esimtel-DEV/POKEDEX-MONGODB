const Pokemon = require('../models/pokemon');

const pokemonService = {
  async createPokemon(pokemonData) {
    const pokemon = new Pokemon(pokemonData);
    return await pokemon.save();
  },

  async getAllPokemon({ page = 1, limit = 10, search = '' }) {
    const skip = (page - 1) * limit;
    
    let query = {};
    if (search) {
        query = {
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { type: { $regex: search, $options: 'i' } }
            ]
        };
    }

    const [pokemons, total] = await Promise.all([
        Pokemon.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ name: 1 }),
        Pokemon.countDocuments(query)
    ]);

    return {
        pokemons,
        total
    };
},

  async getPokemonById(id) {
    return await Pokemon.findById(id);
  },

  async updatePokemon(id, pokemonData) {
    return await Pokemon.findByIdAndUpdate(id, pokemonData, { new: true });
  },

  async deletePokemon(id) {
    return await Pokemon.findByIdAndDelete(id);
  }
};

module.exports = pokemonService;
