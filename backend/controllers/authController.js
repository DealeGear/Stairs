const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mailer = require('../utils/mailer');

// Função de login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }
        
        // Verificar se a senha está correta
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciais inválidas' });
        }
        
        // Criar token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        // Retornar o token e os dados do usuário
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função de cadastro
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe' });
        }
        
        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Criar novo usuário
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            authProvider: 'local'
        });
        
        // Salvar o usuário
        await newUser.save();
        
        // Criar token JWT
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        
        // Retornar o token e os dados do usuário
        res.status(201).json({
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Erro no cadastro:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função de recuperação de senha
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        // Verificar se o usuário existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }
        
        // Gerar token de redefinição de senha
        const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        // Salvar o token no usuário
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();
        
        // Enviar email com o link de redefinição
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        const message = `
            <p>Você solicitou a redefinição de senha.</p>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>Se você não solicitou isso, ignore este email.</p>
        `;
        
        await mailer.sendEmail(
            user.email,
            'Redefinição de Senha',
            message
        );
        
        res.json({ message: 'Email de redefinição enviado' });
    } catch (error) {
        console.error('Erro na recuperação de senha:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função de redefinição de senha
exports.resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;
        
        // Verificar o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Encontrar o usuário
        const user = await User.findOne({
            _id: decoded.id,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        
        if (!user) {
            return res.status(400).json({ message: 'Token inválido ou expirado' });
        }
        
        // Hash da nova senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Atualizar a senha
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        
        res.json({ message: 'Senha redefinida com sucesso' });
    } catch (error) {
        console.error('Erro na redefinição de senha:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função de logout
exports.logout = (req, res) => {
    // Em uma aplicação real, poderíamos adicionar o token a uma lista de bloqueio
    // Por simplicidade, apenas retornamos uma resposta de sucesso
    res.json({ message: 'Logout realizado com sucesso' });
};