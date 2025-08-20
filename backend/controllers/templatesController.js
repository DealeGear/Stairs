const Template = require('../models/templateModel');

// Função para obter todos os templates
exports.getTemplates = async (req, res) => {
    try {
        const language = req.language || 'pt';
        
        const templates = await Template.find({ idioma: language });
        
        res.json(templates);
    } catch (error) {
        console.error('Erro ao obter templates:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para obter um template específico
exports.getTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        
        const template = await Template.findById(templateId);
        
        if (!template) {
            return res.status(404).json({ message: 'Template não encontrado' });
        }
        
        res.json(template);
    } catch (error) {
        console.error('Erro ao obter template:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para criar um novo template
exports.createTemplate = async (req, res) => {
    try {
        const { nivel, idioma, blocos } = req.body;
        
        const newTemplate = new Template({
            nivel,
            idioma,
            blocos
        });
        
        await newTemplate.save();
        
        res.status(201).json(newTemplate);
    } catch (error) {
        console.error('Erro ao criar template:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para atualizar um template
exports.updateTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        const { nivel, idioma, blocos } = req.body;
        
        const template = await Template.findById(templateId);
        
        if (!template) {
            return res.status(404).json({ message: 'Template não encontrado' });
        }
        
        if (nivel) template.nivel = nivel;
        if (idioma) template.idioma = idioma;
        if (blocos) template.blocos = blocos;
        
        await template.save();
        
        res.json(template);
    } catch (error) {
        console.error('Erro ao atualizar template:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para excluir um template
exports.deleteTemplate = async (req, res) => {
    try {
        const templateId = req.params.id;
        
        const result = await Template.deleteOne({ _id: templateId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Template não encontrado' });
        }
        
        res.json({ message: 'Template excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir template:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};