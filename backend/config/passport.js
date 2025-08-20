const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

module.exports = (passport) => {
    // Estratégia local para autenticação com email e senha
    passport.use(User.createStrategy());

    // Estratégia do Google OAuth
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Verificar se o usuário já existe
            let user = await User.findOne({ googleId: profile.id });
            
            if (user) {
                // Usuário já existe, retornar o usuário
                return done(null, { ...user.toObject(), token: generateToken(user) });
            }
            
            // Verificar se já existe um usuário com o mesmo email
            user = await User.findOne({ email: profile.emails[0].value });
            
            if (user) {
                // Atualizar o usuário com o Google ID
                user.googleId = profile.id;
                user.authProvider = 'google';
                await user.save();
                return done(null, { ...user.toObject(), token: generateToken(user) });
            }
            
            // Criar um novo usuário
            const newUser = new User({
                nome: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                authProvider: 'google'
            });
            
            await newUser.save();
            return done(null, { ...newUser.toObject(), token: generateToken(newUser) });
        } catch (error) {
            return done(error, null);
        }
    }));

    // Serialização do usuário
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Desserialização do usuário
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

// Função para gerar token JWT
function generateToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}