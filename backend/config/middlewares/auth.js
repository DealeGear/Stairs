const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware para verificar se o usuário está autenticado
const ensureAuthenticated = async (req, res, next) => {
    try {
        // Obter o token do cabeçalho Authorization
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }
        
        const token = authHeader.split(' ')[1];
        
        // Verificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Obter o usuário
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        
        // Adicionar o usuário à requisição
        req.user = user;
        next();
    } catch (error) {
        console.error('Erro de autenticação:', error);
        return res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

// Middleware para verificar se o usuário tem permissão para editar
const ensureEditPermission = (req, res, next) => {
    // Se o usuário é o proprietário, tem permissão
    if (req.user && req.user.id === req.project.userId.toString()) {
        return next();
    }
    
    // Se o projeto está compartilhado com permissão de edição
    if (req.project.compartilhado && req.project.sharePermission === 'edit') {
        return next();
    }
    
    return res.status(403).json({ message: 'Permissão negada' });
};

module.exports = {
    ensureAuthenticated,
    ensureEditPermission
};