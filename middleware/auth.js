const jwt = require('jsonwebtoken');

const JWT_SECRET = '50318831c118d0020efe9905500146a18f660ab65bbe8cb36519df5a56a813449374b5b58bdfe7f0796521bdac86442cf00f912fc176a64ef9a3e6098308d43e';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Requiere de autenticación' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = { authMiddleware, JWT_SECRET };