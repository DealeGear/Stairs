// Módulo para modo escuro
const darkMode = {
    // Inicializar o módulo
    init: function() {
        const themeToggle = document.getElementById('theme-toggle');
        
        // Verificar preferência salva no localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }
        
        // Adicionar event listener
        themeToggle.addEventListener('change', () => {
            this.toggleTheme();
        });
    },
    
    // Alternar tema
    toggleTheme: function() {
        const body = document.body;
        const themeToggle = document.getElementById('theme-toggle');
        
        if (themeToggle.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }
};