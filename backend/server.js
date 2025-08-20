const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o Express
const app = express();

// Configurar middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar sessão
app.use(session({
    secret: process.env.SESSION_SECRET || 'stairs-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Em produção, use true com HTTPS
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// Configurar Passport
require('./config/passport')(passport);

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/stairs', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Configurar rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/templates', require('./routes/templates'));

// Rota de teste
app.get('/api', (req, res) => {
    res.json({ message: 'API do Stairs funcionando!' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});