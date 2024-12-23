const express = require('express');
const { body, query } = require('express-validator');
const { authMiddleware } = require('../middleware/auth');
const validateRequest = require('../middleware/validate');
const pokemonController = require('../controllers/pokemonController');

const router = express.Router();

// Rutas públicas
router.get('/', 
    [
        query('page').optional().isInt({ min: 1 }),
        query('limit').optional().isInt({ min: 1, max: 100 }),
        query('search').optional().isString(),
        validateRequest
    ],
    pokemonController.getAllPokemons
);

router.get('/:id', pokemonController.getPokemonById);

// Rutas protegidas
router.post('/',
    authMiddleware,
    [
        body('name').isString().notEmpty(),
        body('type').isArray().notEmpty(),
        body('level').isInt({ min: 1, max: 100 }),
        body('abilities').isArray().notEmpty(),
        body('stats.hp').isInt({ min: 1 }),
        body('stats.attack').isInt({ min: 1 }),
        body('stats.defense').isInt({ min: 1 }),
        body('stats.speed').isInt({ min: 1 }),
        validateRequest
    ],
    pokemonController.createPokemon
);

router.put('/:id',
    authMiddleware,
    [
        body('name').optional().isString(),
        body('type').optional().isArray(),
        body('level').optional().isInt({ min: 1, max: 100 }),
        body('abilities').optional().isArray(),
        body('stats.hp').optional().isInt({ min: 1 }),
        body('stats.attack').optional().isInt({ min: 1 }),
        body('stats.defense').optional().isInt({ min: 1 }),
        body('stats.speed').optional().isInt({ min: 1 }),
        validateRequest
    ],
    pokemonController.updatePokemon
);

router.delete('/:id', 
    authMiddleware, 
    pokemonController.deletePokemon
);

module.exports = router;