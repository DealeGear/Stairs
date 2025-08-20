const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    idioma: {
        type: String,
        enum: ['pt', 'en', 'es'],
        default: 'pt'
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
        textoGuia: {
            type: String,
            required: true
        },
        textoUsuario: {
            type: String,
            default: ''
        }
    }],
    compartilhado: {
        type: Boolean,
        default: false
    },
    shareToken: {
        type: String,
        sparse: true
    },
    sharePermission: {
        type: String,
        enum: ['view', 'edit'],
        default: 'view'
    },
    ultimaAtualizacao: {
        type: Date,
        default: Date.now
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);