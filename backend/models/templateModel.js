const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
    nivel: {
        type: String,
        enum: ['baixo', 'medio', 'alto'],
        required: true
    },
    idioma: {
        type: String,
        enum: ['pt', 'en', 'es'],
        required: true
    },
    blocos: [{
        id: {
            type: Number,
            required: true
        },
        titulo: {
            type: String,
            required: true
        },
        conteudo: {
            type: String,
            required: true
        }
    }],
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

// Índice composto para nível e idioma
templateSchema.index({ nivel: 1, idioma: 1 }, { unique: true });

module.exports = mongoose.model('Template', templateSchema);