const authService = require('../services/authService');

const authController = {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            await authService.register(username, password);
            res.status(201).json({ 
                success: true,
                message: 'Usuario registrado exitosamente' 
            });
        } catch (error) {
            res.status(400).json({ 
                success: false,
                message: error.message 
            });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);
            res.json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(401).json({ 
                success: false,
                message: error.message 
            });
        }
    }
};

module.exports = authController;