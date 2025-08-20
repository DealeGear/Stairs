// Função para inicializar o aplicativo
function initApp() {
    // Inicializar os módulos
    initI18n();
    initDarkMode();
    initAuth();
    initDB();
    initAI();
    initProjectManagement();
    
    // Configurar eventos globais
    setupGlobalEvents();
}

// Função para configurar eventos globais
function setupGlobalEvents() {
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S: Salvar projeto
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveProject();
        }
        
        // Ctrl/Cmd + N: Novo projeto
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            showNewProjectModal();
        }
        
        // Ctrl/Cmd + O: Meus projetos
        if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
            e.preventDefault();
            showMyProjectsModal();
        }
        
        // Ctrl/Cmd + E: Exportar PDF
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            exportToPDF();
        }
        
        // Esc: Fechar modais
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                }
            });
        }
    });
    
    // Submenu de templates
    const templatesBtn = document.getElementById('templates-btn');
    if (templatesBtn) {
        templatesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = templatesBtn.closest('.submenu');
            if (submenu) {
                submenu.classList.toggle('active');
            }
        });
    }
    
    // Fechar notificação
    const closeNotificationBtn = document.getElementById('close-notification');
    if (closeNotificationBtn) {
        closeNotificationBtn.addEventListener('click', () => {
            const notification = document.getElementById('notification');
            if (notification) {
                notification.style.display = 'none';
            }
        });
    }
}

// Função para mostrar uma notificação
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    if (notification && notificationMessage) {
        // Definir a mensagem
        notificationMessage.textContent = message;
        
        // Definir a cor com base no tipo
        if (type === 'error') {
            notification.style.backgroundColor = '#e74c3c';
        } else {
            notification.style.backgroundColor = 'var(--primary-color)';
        }
        
        // Mostrar a notificação
        notification.style.display = 'block';
        
        // Esconder automaticamente após 3 segundos
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

// Inicializar o aplicativo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);