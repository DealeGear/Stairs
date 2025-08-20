// Variáveis globais
let currentUser = null;
let authToken = null;

// Função para inicializar a autenticação
function initAuth() {
    // Verificar se há um token salvo no localStorage
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedToken && savedUser) {
        authToken = savedToken;
        currentUser = JSON.parse(savedUser);
        
        // Verificar se o token ainda é válido
        checkAuthToken();
    } else {
        // Mostrar o modal de login
        showAuthModal();
    }
    
    // Adicionar eventos aos elementos de autenticação
    setupAuthEvents();
}

// Função para verificar se o token de autenticação é válido
function checkAuthToken() {
    // Em um ambiente real, faríamos uma requisição ao backend para verificar o token
    // Aqui, vamos apenas verificar se o token existe
    if (authToken) {
        // Atualizar a interface para mostrar que o usuário está logado
        updateUIForLoggedInUser();
    } else {
        // Mostrar o modal de login
        showAuthModal();
    }
}

// Função para configurar os eventos de autenticação
function setupAuthEvents() {
    // Abas de login/cadastro
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchAuthTab(tabName);
        });
    });
    
    // Formulário de login
    const loginForm = document.getElementById('login-form-element');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Formulário de cadastro
    const registerForm = document.getElementById('register-form-element');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Login com Google
    const googleLoginBtn = document.getElementById('google-login-btn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', handleGoogleLogin);
    }
    
    // Link de esqueceu a senha
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            showForgotPasswordModal();
        });
    }
    
    // Formulário de recuperação de senha
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Botão de logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Fechar modais
    const closeButtons = document.querySelectorAll('.modal .close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Fechar modais ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

// Função para alternar entre as abas de login e cadastro
function switchAuthTab(tabName) {
    // Atualizar as abas
    const authTabs = document.querySelectorAll('.auth-tab');
    authTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Atualizar os formulários
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        if (form.id === `${tabName}-form`) {
            form.classList.add('active');
        } else {
            form.classList.remove('active');
        }
    });
}

// Função para mostrar o modal de autenticação
function showAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.style.display = 'block';
    }
}

// Função para mostrar o modal de recuperação de senha
function showForgotPasswordModal() {
    const forgotPasswordModal = document.getElementById('forgot-password-modal');
    if (forgotPasswordModal) {
        forgotPasswordModal.style.display = 'block';
    }
}

// Função para lidar com o login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular um login bem-sucedido
    simulateLogin(email, password);
}

// Função para simular o login
function simulateLogin(email, password) {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Simular uma resposta bem-sucedida
        const user = {
            id: 'user123',
            name: 'João Silva',
            email: email
        };
        
        const token = 'fake-jwt-token';
        
        // Salvar o token e o usuário no localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Atualizar as variáveis globais
        currentUser = user;
        authToken = token;
        
        // Fechar o modal de autenticação
        const authModal = document.getElementById('auth-modal');
        if (authModal) {
            authModal.style.display = 'none';
        }
        
        // Atualizar a interface
        updateUIForLoggedInUser();
        
        // Mostrar notificação
        showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.loginSuccess'));
    }, 1000);
}

// Função para lidar com o cadastro
function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
        showNotification('As senhas não coincidem.', 'error');
        return;
    }
    
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular um cadastro bem-sucedido
    simulateRegister(name, email, password);
}

// Função para simular o cadastro
function simulateRegister(name, email, password) {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Simular uma resposta bem-sucedida
        const user = {
            id: 'user123',
            name: name,
            email: email
        };
        
        const token = 'fake-jwt-token';
        
        // Salvar o token e o usuário no localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Atualizar as variáveis globais
        currentUser = user;
        authToken = token;
        
        // Fechar o modal de autenticação
        const authModal = document.getElementById('auth-modal');
        if (authModal) {
            authModal.style.display = 'none';
        }
        
        // Atualizar a interface
        updateUIForLoggedInUser();
        
        // Mostrar notificação
        showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.registerSuccess'));
    }, 1000);
}

// Função para lidar com o login com Google
function handleGoogleLogin() {
    // Em um ambiente real, redirecionaríamos para o Google OAuth
    // Aqui, vamos simular um login bem-sucedido
    simulateGoogleLogin();
}

// Função para simular o login com Google
function simulateGoogleLogin() {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Simular uma resposta bem-sucedida
        const user = {
            id: 'user123',
            name: 'João Silva',
            email: 'joao.silva@gmail.com',
            authProvider: 'google'
        };
        
        const token = 'fake-jwt-token';
        
        // Salvar o token e o usuário no localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Atualizar as variáveis globais
        currentUser = user;
        authToken = token;
        
        // Fechar o modal de autenticação
        const authModal = document.getElementById('auth-modal');
        if (authModal) {
            authModal.style.display = 'none';
        }
        
        // Atualizar a interface
        updateUIForLoggedInUser();
        
        // Mostrar notificação
        showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.loginSuccess'));
    }, 1000);
}

// Função para lidar com a recuperação de senha
function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgot-password-email').value;
    
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular o envio do email
    simulateForgotPassword(email);
}

// Função para simular a recuperação de senha
function simulateForgotPassword(email) {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Fechar o modal de recuperação de senha
        const forgotPasswordModal = document.getElementById('forgot-password-modal');
        if (forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
        }
        
        // Mostrar notificação
        showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.passwordResetSent'));
    }, 1000);
}

// Função para lidar com o logout
function handleLogout() {
    // Limpar o localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    
    // Atualizar as variáveis globais
    currentUser = null;
    authToken = null;
    
    // Atualizar a interface
    updateUIForLoggedOutUser();
    
    // Mostrar notificação
    showNotification('Logout realizado com sucesso!');
}

// Função para atualizar a interface para um usuário logado
function updateUIForLoggedInUser() {
    // Em um ambiente real, atualizaríamos a interface para mostrar informações do usuário
    // Aqui, vamos apenas ocultar o modal de autenticação
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.style.display = 'none';
    }
    
    // Carregar os projetos do usuário
    loadUserProjects();
}

// Função para atualizar a interface para um usuário deslogado
function updateUIForLoggedOutUser() {
    // Mostrar o modal de autenticação
    showAuthModal();
    
    // Limpar a área de conteúdo
    const projectBlocks = document.getElementById('project-blocks');
    const noProject = document.getElementById('no-project');
    
    if (projectBlocks) {
        projectBlocks.style.display = 'none';
    }
    
    if (noProject) {
        noProject.style.display = 'flex';
    }
}

// Inicializar a autenticação quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAuth);