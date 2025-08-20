// Módulo de internacionalização
const i18n = {
    // Idioma atual
    currentLang: 'pt',
    
    // Traduções
    translations: {
        pt: {
            // Sidebar
            "sidebar.newProject": "Novo Projeto",
            "sidebar.myProjects": "Meus Projetos",
            "sidebar.delete": "Excluir Projeto",
            "sidebar.testHypothesis": "Testar Hipótese",
            "sidebar.critiqueProject": "Criticar Projeto",
            "sidebar.manageProject": "Gerenciar Projeto",
            "sidebar.dealegearPortal": "Portal DealeGear",
            "sidebar.logout": "Sair",
            
            // Topbar
            "project.noProject": "Nenhum Projeto Aberto",
            "topbar.save": "Salvar",
            "topbar.reedit": "Renomear",
            
            "topbar.exportPDF": "Exportar",
            "topbar.share": "Compartilhar",
            
            // Projetos
            "projects.title": "Meus Projetos",
            "projects.createNew": "Criar Novo Projeto",
            "projects.empty": "Você ainda não tem projetos.",
            
            // Nível de investimento
            "project.investmentLevel": "Nível de Investimento:",
            "investment.low": "Baixo",
            "investment.medium": "Médio",
            "investment.high": "Alto",
            
            // Testar Hipótese
            "hypothesis.title": "Testar Hipótese",
            "hypothesis.description": "Gere uma landing page ou postagem para redes sociais baseada no seu projeto.",
            "hypothesis.selectProject": "Selecione um Projeto:",
            "hypothesis.noProject": "Nenhum projeto selecionado",
            "hypothesis.outputType": "Tipo de Saída:",
            "hypothesis.landingPage": "Landing Page",
            "hypothesis.socialPost": "Postagem para Redes Sociais",
            "hypothesis.generate": "Gerar",
            "hypothesis.result": "Resultado",
            "hypothesis.copy": "Copiar",
            "hypothesis.generating": "Gerando conteúdo...",
            "hypothesis.error": "Erro ao gerar conteúdo",
            
            // Crítica de Projeto
            "critique.title": "Criticar Projeto",
            "critique.description": "Obtenha feedback sobre seu projeto com base em análises de IA.",
            "critique.selectProject": "Selecione um Projeto:",
            "critique.noProject": "Nenhum projeto selecionado",
            "critique.generate": "Gerar Crítica",
            "critique.result": "Resultado da Análise",
            "critique.export": "Exportar",
            "critique.generating": "Analisando projeto...",
            "critique.error": "Erro ao analisar projeto",
            
            // Gerenciar Projeto
            "manage.title": "Gerenciar Projeto",
            "manage.description": "Atribua tarefas administrativas para cada passo do seu projeto.",
            "manage.selectProject": "Selecione um Projeto:",
            "manage.noProject": "Nenhum projeto selecionado",
            
            // Modal
            "modal.confirmTitle": "Confirmar Ação",
            "modal.confirmMessage": "Tem certeza que deseja continuar?",
            "modal.cancel": "Cancelar",
            "modal.confirm": "Confirmar",
            "modal.deleteProjectTitle": "Excluir Projeto",
            "modal.deleteProjectMessage": "Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.",
            "modal.dealegearTitle": "Saindo do Stairs",
            "modal.dealegearMessage": "Você está saindo do Stairs, deseja continuar?",
            
            // Compartilhamento
            "share.title": "Compartilhar Projeto",
            "share.description": "Copie o link abaixo para compartilhar seu projeto:",
            "share.copy": "Copiar",
            "share.close": "Fechar"
        },
        en: {
            // Sidebar
            "sidebar.newProject": "New Project",
            "sidebar.myProjects": "My Projects",
            "sidebar.testHypothesis": "Test Hypothesis",
            "sidebar.critiqueProject": "Critique Project",
            "sidebar.manageProject": "Manage Project",
            "sidebar.dealegearPortal": "DealeGear Portal",
            "sidebar.logout": "Logout",
            
            // Topbar
            "project.noProject": "No Project Open",
            "topbar.save": "Save",
            "topbar.reedit": "Reedit",
            "topbar.delete": "Delete",
            "topbar.exportPDF": "Export PDF",
            "topbar.share": "Share",
            
            // Projetos
            "projects.title": "My Projects",
            "projects.createNew": "Create New Project",
            "projects.empty": "You don't have any projects yet.",
            
            // Nível de investimento
            "project.investmentLevel": "Investment Level:",
            "investment.low": "Low",
            "investment.medium": "Medium",
            "investment.high": "High",
            
            // Testar Hipótese
            "hypothesis.title": "Test Hypothesis",
            "hypothesis.description": "Generate a landing page or social media post based on your project.",
            "hypothesis.selectProject": "Select a Project:",
            "hypothesis.noProject": "No project selected",
            "hypothesis.outputType": "Output Type:",
            "hypothesis.landingPage": "Landing Page",
            "hypothesis.socialPost": "Social Media Post",
            "hypothesis.generate": "Generate",
            "hypothesis.result": "Result",
            "hypothesis.copy": "Copy",
            "hypothesis.generating": "Generating content...",
            "hypothesis.error": "Error generating content",
            
            // Crítica de Projeto
            "critique.title": "Critique Project",
            "critique.description": "Get feedback on your project based on AI analysis.",
            "critique.selectProject": "Select a Project:",
            "critique.noProject": "No project selected",
            "critique.generate": "Generate Critique",
            "critique.result": "Analysis Result",
            "critique.export": "Export",
            "critique.generating": "Analyzing project...",
            "critique.error": "Error analyzing project",
            
            // Gerenciar Projeto
            "manage.title": "Manage Project",
            "manage.description": "Assign administrative tasks for each step of your project.",
            "manage.selectProject": "Select a Project:",
            "manage.noProject": "No project selected",
            
            // Modal
            "modal.confirmTitle": "Confirm Action",
            "modal.confirmMessage": "Are you sure you want to continue?",
            "modal.cancel": "Cancel",
            "modal.confirm": "Confirm",
            "modal.deleteProjectTitle": "Delete Project",
            "modal.deleteProjectMessage": "Are you sure you want to delete this project? This action cannot be undone.",
            "modal.dealegearTitle": "Leaving Stairs",
            "modal.dealegearMessage": "You are leaving Stairs, do you want to continue?",
            
            // Compartilhamento
            "share.title": "Share Project",
            "share.description": "Copy the link below to share your project:",
            "share.copy": "Copy",
            "share.close": "Close"
        },
        es: {
            // Sidebar
            "sidebar.newProject": "Nuevo Proyecto",
            "sidebar.myProjects": "Mis Proyectos",
            "sidebar.testHypothesis": "Probar Hipótesis",
            "sidebar.critiqueProject": "Criticar Proyecto",
            "sidebar.manageProject": "Gestionar Proyecto",
            "sidebar.dealegearPortal": "Portal DealeGear",
            "sidebar.logout": "Cerrar Sesión",
            
            // Topbar
            "project.noProject": "Ningún Proyecto Abierto",
            "topbar.save": "Guardar",
            "topbar.reedit": "Reeditar",
            "topbar.delete": "Eliminar",
            "topbar.exportPDF": "Exportar PDF",
            "topbar.share": "Compartir",
            
            // Projetos
            "projects.title": "Mis Proyectos",
            "projects.createNew": "Crear Nuevo Proyecto",
            "projects.empty": "Aún no tienes proyectos.",
            
            // Nível de investimento
            "project.investmentLevel": "Nivel de Inversión:",
            "investment.low": "Bajo",
            "investment.medium": "Medio",
            "investment.high": "Alto",
            
            // Testar Hipótese
            "hypothesis.title": "Probar Hipótesis",
            "hypothesis.description": "Genere una página de destino o publicación para redes sociales basada en su proyecto.",
            "hypothesis.selectProject": "Seleccionar un Proyecto:",
            "hypothesis.noProject": "Ningún proyecto seleccionado",
            "hypothesis.outputType": "Tipo de Salida:",
            "hypothesis.landingPage": "Página de Aterrizaje",
            "hypothesis.socialPost": "Publicación para Redes Sociales",
            "hypothesis.generate": "Generar",
            "hypothesis.result": "Resultado",
            "hypothesis.copy": "Copiar",
            "hypothesis.generating": "Generando contenido...",
            "hypothesis.error": "Error al generar contenido",
            
            // Crítica de Projeto
            "critique.title": "Criticar Proyecto",
            "critique.description": "Obtenga comentarios sobre su proyecto basados en análisis de IA.",
            "critique.selectProject": "Seleccionar un Proyecto:",
            "critique.noProject": "Ningún proyecto seleccionado",
            "critique.generate": "Generar Crítica",
            "critique.result": "Resultado del Análisis",
            "critique.export": "Exportar",
            "critique.generating": "Analizando proyecto...",
            "critique.error": "Error al analizar proyecto",
            
            // Gerenciar Projeto
            "manage.title": "Gestionar Proyecto",
            "manage.description": "Asigne tareas administrativas para cada paso de su proyecto.",
            "manage.selectProject": "Seleccionar un Proyecto:",
            "manage.noProject": "Ningún proyecto seleccionado",
            
            // Modal
            "modal.confirmTitle": "Confirmar Acción",
            "modal.confirmMessage": "¿Está seguro de que desea continuar?",
            "modal.cancel": "Cancelar",
            "modal.confirm": "Confirmar",
            "modal.deleteProjectTitle": "Eliminar Proyecto",
            "modal.deleteProjectMessage": "¿Está seguro de que desea eliminar este proyecto? Esta acción no se puede deshacer.",
            "modal.dealegearTitle": "Saliendo de Stairs",
            "modal.dealegearMessage": "Está saliendo de Stairs, ¿desea continuar?",
            
            // Compartilhamento
            "share.title": "Compartir Proyecto",
            "share.description": "Copie el enlace a continuación para compartir su proyecto:",
            "share.copy": "Copiar",
            "share.close": "Cerrar"
        }
        
    },
    
    // Inicializar o módulo
    init: function() {
        // Configurar seletor de idioma
        const languageSelect = document.getElementById('language-select');
        if (languageSelect) {
            // Definir idioma atual
            languageSelect.value = this.currentLang;
            
            // Adicionar event listener
            languageSelect.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        }
        
        // Aplicar traduções iniciais
        this.updateUI();
    },
    
    // Definir idioma
    setLanguage: function(lang) {
        if (this.translations[lang]) {
            this.currentLang = lang;
            this.updateUI();
            localStorage.setItem('language', lang);
        }
    },
    
    // Obter tradução
    t: function(key) {
        return this.translations[this.currentLang][key] || key;
    },
    
    // Atualizar interface com traduções
    updateUI: function() {
        // Atualizar todos os elementos com atributo data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Atualizar atributos placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
        
        // Atualizar atributos title
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });
        
        // Atualizar atributo lang do HTML
        document.documentElement.lang = this.currentLang;
    }
};

// Carregar idioma salvo no localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && i18n.translations[savedLanguage]) {
        i18n.currentLang = savedLanguage;
    }
});