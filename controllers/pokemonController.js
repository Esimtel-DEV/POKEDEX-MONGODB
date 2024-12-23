const pokemonService = require('../services/pokemonService');

const pokemonController = {
    // Métodos públicos
    async getAllPokemons(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search || '';

            const result = await pokemonService.getAllPokemon({
                page,
                limit,
                search
            });

            res.json({
                success: true,
                data: result.pokemons,
                pagination: {
                    total: result.total,
                    page,
                    limit,
                    pages: Math.ceil(result.total / limit)
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener los pokemon',
                error: error.message
            });
        }
    },

    async getPokemonById(req, res) {
        try {
            const pokemon = await pokemonService.getPokemonById(req.params.id);
            
            if (!pokemon) {
                return res.status(404).json({
                    success: false,
                    message: 'Pokemon no encontrado'
                });
            }

            res.json({
                success: true,
                data: pokemon
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener el pokemon',
                error: error.message
            });
        }
    },

    // Métodos protegidos
    async createPokemon(req, res) {
        try {
            const pokemon = await pokemonService.createPokemon(req.body);
            res.status(201).json({
                success: true,
                message: 'Pokemon creado exitosamente',
                data: pokemon
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al crear el pokemon',
                error: error.message
            });
        }
    },

    async updatePokemon(req, res) {
        try {
            const pokemon = await pokemonService.updatePokemon(
                req.params.id,
                req.body
            );

            if (!pokemon) {
                return res.status(404).json({
                    success: false,
                    message: 'Pokemon no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Pokemon actualizado exitosamente',
                data: pokemon
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error al actualizar el pokemon',
                error: error.message
            });
        }
    },

    async deletePokemon(req, res) {
        try {
            const pokemon = await pokemonService.deletePokemon(req.params.id);

            if (!pokemon) {
                return res.status(404).json({
                    success: false,
                    message: 'Pokemon no encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Pokemon eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el pokemon',
                error: error.message
            });
        }
    }
};

module.exports = pokemonController;