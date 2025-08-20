require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/stairs',
    JWT_SECRET: process.env.JWT_SECRET || 'stairs-secret-key',
    SESSION_SECRET: process.env.SESSION_SECRET || 'stairs-session-secret',
    FRONTEND_URL