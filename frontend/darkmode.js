// Função para inicializar o modo escuro
function initDarkMode() {
    // Verificar se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Verificar a preferência do sistema se não houver uma salva
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Definir o tema inicial
    const initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');
    setTheme(initialTheme);
    
    // Adicionar evento de mudança ao interruptor de tema
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.checked = initialTheme === 'dark';
        themeSwitch.addEventListener('change', (e) => {
            setTheme(e.target.checked ? 'dark' : 'light');
        });
    }
    
    // Ouvir mudanças na preferência do sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
            if (themeSwitch) {
                themeSwitch.checked = e.matches;
            }
        }
    });
}

// Função para definir o tema
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    
    // Salvar a preferência no localStorage
    localStorage.setItem('theme', theme);
}

// Inicializar o modo escuro quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initDarkMode);