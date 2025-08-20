// Objeto com as traduções
const translations = {
    pt: {
        sidebar: {
            newProject: "Novo Projeto",
            myProjects: "Meus Projetos",
            templates: "Templates",
            lowInvestment: "Baixo Investimento",
            mediumInvestment: "Médio Investimento",
            highInvestment: "Alto Investimento",
            deleteProject: "Excluir Projeto",
            testHypothesis: "Testar Hipótese",
            critiqueProject: "Criticar Projeto",
            manageProject: "Gerenciar Projeto",
            logout: "Sair"
        },
        header: {
            noProject: "Nenhum projeto selecionado",
            save: "Salvar",
            reedit: "Reeditar",
            exportPDF: "Exportar PDF",
            share: "Compartilhar"
        },
        noProject: {
            title: "Nenhum projeto selecionado",
            description: "Crie um novo projeto ou selecione um existente para começar.",
            createButton: "Criar Novo Projeto"
        },
        auth: {
            login: "Login",
            register: "Cadastro",
            loginTitle: "Entre na sua conta",
            email: "Email",
            password: "Senha",
            forgotPassword: "Esqueceu a senha?",
            loginButton: "Entrar",
            or: "ou",
            loginWithGoogle: "Entrar com Google",
            registerTitle: "Crie sua conta",
            name: "Nome",
            confirmPassword: "Confirmar Senha",
            registerButton: "Cadastrar"
        },
        forgotPassword: {
            title: "Recuperar Senha",
            description: "Digite seu email para receber um link de recuperação de senha.",
            sendButton: "Enviar"
        },
        newProject: {
            title: "Novo Projeto",
            name: "Nome do Projeto",
            template: "Template",
            blankTemplate: "Em Branco",
            lowInvestment: "Baixo Investimento",
            mediumInvestment: "Médio Investimento",
            highInvestment: "Alto Investimento",
            createButton: "Criar"
        },
        myProjects: {
            title: "Meus Projetos"
        },
        deleteProject: {
            title: "Excluir Projeto",
            confirmation: "Tem certeza de que deseja excluir este projeto? Esta ação não pode ser desfeita.",
            cancel: "Cancelar",
            delete: "Excluir"
        },
        testHypothesis: {
            title: "Testar Hipótese",
            description: "Descreva a hipótese que você deseja testar:",
            hypothesis: "Hipótese",
            testButton: "Testar"
        },
        critiqueProject: {
            title: "Criticar Projeto",
            description: "A IA analisará seu projeto e fornecerá feedback construtivo.",
            analyzeButton: "Analisar Projeto"
        },
        manageProject: {
            title: "Gerenciar Projeto",
            tasks: "Tarefas",
            team: "Equipe",
            timeline: "Cronograma",
            assignTasks: "Atribuir Tarefas",
            addTask: "Adicionar Tarefa",
            teamMembers: "Membros da Equipe",
            addMember: "Adicionar Membro",
            projectTimeline: "Cronograma do Projeto",
            addMilestone: "Adicionar Marco"
        },
        shareProject: {
            title: "Compartilhar Projeto",
            description: "Compartilhe seu projeto com outras pessoas através do link abaixo:",
            copyLink: "Copiar Link",
            permissions: "Permissões",
            viewOnly: "Apenas visualização",
            canEdit: "Pode editar"
        },
        notifications: {
            projectSaved: "Projeto salvo com sucesso!",
            projectCreated: "Projeto criado com sucesso!",
            projectDeleted: "Projeto excluído com sucesso!",
            projectRenamed: "Projeto renomeado com sucesso!",
            linkCopied: "Link copiado para a área de transferência!",
            loginSuccess: "Login realizado com sucesso!",
            registerSuccess: "Cadastro realizado com sucesso!",
            passwordResetSent: "Email de recuperação de senha enviado!",
            error: "Ocorreu um erro. Tente novamente."
        }
    },
    en: {
        sidebar: {
            newProject: "New Project",
            myProjects: "My Projects",
            templates: "Templates",
            lowInvestment: "Low Investment",
            mediumInvestment: "Medium Investment",
            highInvestment: "High Investment",
            deleteProject: "Delete Project",
            testHypothesis: "Test Hypothesis",
            critiqueProject: "Critique Project",
            manageProject: "Manage Project",
            logout: "Logout"
        },
        header: {
            noProject: "No project selected",
            save: "Save",
            reedit: "Reedit",
            exportPDF: "Export PDF",
            share: "Share"
        },
        noProject: {
            title: "No project selected",
            description: "Create a new project or select an existing one to get started.",
            createButton: "Create New Project"
        },
        auth: {
            login: "Login",
            register: "Register",
            loginTitle: "Sign in to your account",
            email: "Email",
            password: "Password",
            forgotPassword: "Forgot password?",
            loginButton: "Sign In",
            or: "or",
            loginWithGoogle: "Sign in with Google",
            registerTitle: "Create your account",
            name: "Name",
            confirmPassword: "Confirm Password",
            registerButton: "Register"
        },
        forgotPassword: {
            title: "Reset Password",
            description: "Enter your email to receive a password reset link.",
            sendButton: "Send"
        },
        newProject: {
            title: "New Project",
            name: "Project Name",
            template: "Template",
            blankTemplate: "Blank",
            lowInvestment: "Low Investment",
            mediumInvestment: "Medium Investment",
            highInvestment: "High Investment",
            createButton: "Create"
        },
        myProjects: {
            title: "My Projects"
        },
        deleteProject: {
            title: "Delete Project",
            confirmation: "Are you sure you want to delete this project? This action cannot be undone.",
            cancel: "Cancel",
            delete: "Delete"
        },
        testHypothesis: {
            title: "Test Hypothesis",
            description: "Describe the hypothesis you want to test:",
            hypothesis: "Hypothesis",
            testButton: "Test"
        },
        critiqueProject: {
            title: "Critique Project",
            description: "AI will analyze your project and provide constructive feedback.",
            analyzeButton: "Analyze Project"
        },
        manageProject: {
            title: "Manage Project",
            tasks: "Tasks",
            team: "Team",
            timeline: "Timeline",
            assignTasks: "Assign Tasks",
            addTask: "Add Task",
            teamMembers: "Team Members",
            addMember: "Add Member",
            projectTimeline: "Project Timeline",
            addMilestone: "Add Milestone"
        },
        shareProject: {
            title: "Share Project",
            description: "Share your project with others using the link below:",
            copyLink: "Copy Link",
            permissions: "Permissions",
            viewOnly: "View only",
            canEdit: "Can edit"
        },
        notifications: {
            projectSaved: "Project saved successfully!",
            projectCreated: "Project created successfully!",
            projectDeleted: "Project deleted successfully!",
            projectRenamed: "Project renamed successfully!",
            linkCopied: "Link copied to clipboard!",
            loginSuccess: "Login successful!",
            registerSuccess: "Registration successful!",
            passwordResetSent: "Password reset email sent!",
            error: "An error occurred. Please try again."
        }
    },
    es: {
        sidebar: {
            newProject: "Nuevo Proyecto",
            myProjects: "Mis Proyectos",
            templates: "Plantillas",
            lowInvestment: "Baja Inversión",
            mediumInvestment: "Inversión Media",
            highInvestment: "Alta Inversión",
            deleteProject: "Eliminar Proyecto",
            testHypothesis: "Probar Hipótesis",
            critiqueProject: "Criticar Proyecto",
            manageProject: "Gestionar Proyecto",
            logout: "Salir"
        },
        header: {
            noProject: "Ningún proyecto seleccionado",
            save: "Guardar",
            reedit: "Reeditar",
            exportPDF: "Exportar PDF",
            share: "Compartir"
        },
        noProject: {
            title: "Ningún proyecto seleccionado",
            description: "Crea un nuevo proyecto o selecciona uno existente para comenzar.",
            createButton: "Crear Nuevo Proyecto"
        },
        auth: {
            login: "Iniciar Sesión",
            register: "Registro",
            loginTitle: "Inicia sesión en tu cuenta",
            email: "Correo Electrónico",
            password: "Contraseña",
            forgotPassword: "¿Olvidaste tu contraseña?",
            loginButton: "Iniciar Sesión",
            or: "o",
            loginWithGoogle: "Iniciar sesión con Google",
            registerTitle: "Crea tu cuenta",
            name: "Nombre",
            confirmPassword: "Confirmar Contraseña",
            registerButton: "Registrarse"
        },
        forgotPassword: {
            title: "Restablecer Contraseña",
            description: "Ingresa tu correo electrónico para recibir un enlace de restablecimiento de contraseña.",
            sendButton: "Enviar"
        },
        newProject: {
            title: "Nuevo Proyecto",
            name: "Nombre del Proyecto",
            template: "Plantilla",
            blankTemplate: "En Blanco",
            lowInvestment: "Baja Inversión",
            mediumInvestment: "Inversión Media",
            highInvestment: "Alta Inversión",
            createButton: "Crear"
        },
        myProjects: {
            title: "Mis Proyectos"
        },
        deleteProject: {
            title: "Eliminar Proyecto",
            confirmation: "¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.",
            cancel: "Cancelar",
            delete: "Eliminar"
        },
        testHypothesis: {
            title: "Probar Hipótesis",
            description: "Describe la hipótesis que deseas probar:",
            hypothesis: "Hipótesis",
            testButton: "Probar"
        },
        critiqueProject: {
            title: "Criticar Proyecto",
            description: "La IA analizará tu proyecto y proporcionará comentarios constructivos.",
            analyzeButton: "Analizar Proyecto"
        },
        manageProject: {
            title: "Gestionar Proyecto",
            tasks: "Tareas",
            team: "Equipo",
            timeline: "Cronograma",
            assignTasks: "Asignar Tareas",
            addTask: "Agregar Tarea",
            teamMembers: "Miembros del Equipo",
            addMember: "Agregar Miembro",
            projectTimeline: "Cronograma del Proyecto",
            addMilestone: "Agregar Hito"
        },
        shareProject: {
            title: "Compartir Proyecto",
            description: "Comparte tu proyecto con otros a través del siguiente enlace:",
            copyLink: "Copiar Enlace",
            permissions: "Permisos",
            viewOnly: "Solo visualización",
            canEdit: "Puede editar"
        },
        notifications: {
            projectSaved: "¡Proyecto guardado con éxito!",
            projectCreated: "¡Proyecto creado con éxito!",
            projectDeleted: "¡Proyecto eliminado con éxito!",
            projectRenamed: "¡Proyecto renombrado con éxito!",
            linkCopied: "¡Enlace copiado al portapapeles!",
            loginSuccess: "¡Inicio de sesión exitoso!",
            registerSuccess: "¡Registro exitoso!",
            passwordResetSent: "¡Correo de restablecimiento de contraseña enviado!",
            error: "Ocurrió un error. Inténtalo de nuevo."
        }
    }
};

// Função para inicializar a internacionalização
function initI18n() {
    // Verificar se há um idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('language') || 'pt';
    
    // Definir o idioma atual
    setCurrentLanguage(savedLanguage);
    
    // Adicionar evento de mudança ao seletor de idioma
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = savedLanguage;
        languageSelect.addEventListener('change', (e) => {
            setCurrentLanguage(e.target.value);
        });
    }
}

// Função para definir o idioma atual
function setCurrentLanguage(language) {
    // Salvar o idioma no localStorage
    localStorage.setItem('language', language);
    
    // Atualizar o atributo lang do HTML
    document.documentElement.lang = language;
    
    // Atualizar o seletor de idioma
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = language;
    }
    
    // Traduzir todos os elementos com o atributo data-i18n
    translatePage(language);
}

// Função para traduzir a página
function translatePage(language) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getTranslation(language, key);
        
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Função para obter uma tradução
function getTranslation(language, key) {
    const keys = key.split('.');
    let translation = translations[language];
    
    for (const k of keys) {
        if (translation && translation[k]) {
            translation = translation[k];
        } else {
            return null;
        }
    }
    
    return translation;
}

// Inicializar a internacionalização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initI18n);