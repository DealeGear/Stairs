const Project = require('../models/projectModel');
const Template = require('../models/templateModel');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Função para obter os projetos do usuário
exports.getUserProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const language = req.language || 'pt';
        
        const projects = await Project.find({ userId })
            .select('name createdAt lastUpdated')
            .sort({ lastUpdated: -1 });
        
        // Traduzir os nomes dos projetos se necessário
        const translatedProjects = projects.map(project => {
            return {
                id: project._id,
                name: project.name,
                createdAt: project.createdAt,
                lastUpdated: project.lastUpdated
            };
        });
        
        res.json(translatedProjects);
    } catch (error) {
        console.error('Erro ao obter projetos:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para obter um projeto específico
exports.getProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;
        
        const project = await Project.findOne({ _id: projectId, userId });
        
        if (!project) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        
        res.json(project);
    } catch (error) {
        console.error('Erro ao obter projeto:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para criar um novo projeto
exports.createProject = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, templateLevel, language } = req.body;
        
        // Obter o template se especificado
        let blocks = [];
        if (templateLevel && templateLevel !== 'blank') {
            const template = await Template.findOne({ 
                nivel: templateLevel, 
                idioma: language || 'pt' 
            });
            
            if (template) {
                blocks = template.blocos;
            }
        }
        
        // Se não houver template, criar blocos padrão
        if (blocks.length === 0) {
            blocks = generateDefaultBlocks(language || 'pt');
        }
        
        // Criar o novo projeto
        const newProject = new Project({
            userId,
            name,
            idioma: language || 'pt',
            blocos: blocks,
            compartilhado: false
        });
        
        // Salvar o projeto
        await newProject.save();
        
        res.status(201).json(newProject);
    } catch (error) {
        console.error('Erro ao criar projeto:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para atualizar um projeto
exports.updateProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;
        const { name, blocos } = req.body;
        
        // Encontrar o projeto
        const project = await Project.findOne({ _id: projectId, userId });
        
        if (!project) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        
        // Atualizar os dados
        if (name) project.name = name;
        if (blocos) project.blocos = blocos;
        project.ultimaAtualizacao = new Date();
        
        // Salvar as alterações
        await project.save();
        
        res.json(project);
    } catch (error) {
        console.error('Erro ao atualizar projeto:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para excluir um projeto
exports.deleteProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;
        
        // Encontrar e excluir o projeto
        const result = await Project.deleteOne({ _id: projectId, userId });
        
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        
        res.json({ message: 'Projeto excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir projeto:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para compartilhar um projeto
exports.shareProject = async (req, res) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;
        const { permission } = req.body;
        
        // Encontrar o projeto
        const project = await Project.findOne({ _id: projectId, userId });
        
        if (!project) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        
        // Gerar um token de compartilhamento
        const shareToken = generateShareToken();
        
        // Atualizar o projeto
        project.compartilhado = true;
        project.shareToken = shareToken;
        project.sharePermission = permission || 'view';
        project.ultimaAtualizacao = new Date();
        
        // Salvar as alterações
        await project.save();
        
        // Retornar o link de compartilhamento
        const shareLink = `${process.env.FRONTEND_URL}/shared/${shareToken}`;
        res.json({ shareLink, permission: project.sharePermission });
    } catch (error) {
        console.error('Erro ao compartilhar projeto:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para obter um projeto compartilhado
exports.getSharedProject = async (req, res) => {
    try {
        const shareToken = req.params.token;
        
        // Encontrar o projeto
        const project = await Project.findOne({ shareToken });
        
        if (!project) {
            return res.status(404).json({ message: 'Projeto não encontrado' });
        }
        
        // Retornar apenas os dados necessários
        res.json({
            id: project._id,
            name: project.name,
            idioma: project.idioma,
            blocos: project.blocos,
            permission: project.sharePermission
        });
    } catch (error) {
        console.error('Erro ao obter projeto compartilhado:', error);
        res.status(500).json({ message: 'Erro no servidor' });
    }
};

// Função para gerar blocos padrão
function generateDefaultBlocks(language) {
    // Títulos dos blocos em diferentes idiomas
    const blockTitles = {
        pt: [
            'Definição do Problema',
            'Público-Alvo',
            'Solução Proposta',
            'Modelo de Negócio',
            'Concorrentes',
            'Diferenciais',
            'Plano de Marketing',
            'Recursos Necessários',
            'Cronograma',
            'Métricas de Sucesso'
        ],
        en: [
            'Problem Definition',
            'Target Audience',
            'Proposed Solution',
            'Business Model',
            'Competitors',
            'Differentiators',
            'Marketing Plan',
            'Required Resources',
            'Timeline',
            'Success Metrics'
        ],
        es: [
            'Definición del Problema',
            'Público Objetivo',
            'Solución Propuesta',
            'Modelo de Negocio',
            'Competidores',
            'Diferenciadores',
            'Plan de Marketing',
            'Recursos Necesarios',
            'Cronograma',
            'Métricas de Éxito'
        ]
    };
    
    // Textos guia para cada bloco em diferentes idiomas
    const guideTexts = {
        pt: [
            'Descreva claramente o problema que seu projeto pretende resolver.',
            'Defina quem são seus clientes potenciais e suas características.',
            'Explique como sua solução resolve o problema identificado.',
            'Descreva como seu projeto gerará valor e se sustentará financeiramente.',
            'Analise quem são seus concorrentes diretos e indiretos.',
            'Destaque o que torna seu projeto único e competitivo.',
            'Planeje como você irá alcançar seu público-alvo.',
            'Liste os recursos (humanos, financeiros, tecnológicos) necessários.',
            'Estabeleça um cronograma com as principais etapas do projeto.',
            'Defina como você medirá o sucesso do projeto.'
        ],
        en: [
            'Clearly describe the problem your project aims to solve.',
            'Define who your potential customers are and their characteristics.',
            'Explain how your solution solves the identified problem.',
            'Describe how your project will generate value and sustain itself financially.',
            'Analyze who your direct and indirect competitors are.',
            'Highlight what makes your project unique and competitive.',
            'Plan how you will reach your target audience.',
            'List the necessary resources (human, financial, technological).',
            'Establish a timeline with the main stages of the project.',
            'Define how you will measure the success of the project.'
        ],
        es: [
            'Describa claramente el problema que su proyecto pretende resolver.',
            'Defina quiénes son sus clientes potenciales y sus características.',
            'Explique cómo su solución resuelve el problema identificado.',
            'Describa cómo su proyecto generará valor y se sostendrá financieramente.',
            'Analice quiénes son sus competidores directos e indirectos.',
            'Destaque lo que hace que su proyecto sea único y competitivo.',
            'Planee cómo alcanzará a su público objetivo.',
            'Enumere los recursos necesarios (humanos, financieros, tecnológicos).',
            'Establezca un cronograma con las principales etapas del proyecto.',
            'Defina cómo medirá el éxito del proyecto.'
        ]
    };
    
    // Criar os blocos
    const blocks = [];
    const titles = blockTitles[language] || blockTitles.pt;
    const guides = guideTexts[language] || guideTexts.pt;
    
    for (let i = 0; i < 10; i++) {
        blocks.push({
            id: i + 1,
            titulo: titles[i],
            textoGuia: guides[i],
            textoUsuario: ''
        });
    }
    
    return blocks;
}

// Função para gerar um token de compartilhamento
function generateShareToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}