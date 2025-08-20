// Função para inicializar a integração com IA
function initAI() {
    // Configurar eventos relacionados à IA
    setupAIEvents();
}

// Função para configurar os eventos relacionados à IA
function setupAIEvents() {
    // Botão de testar hipótese
    const testHypothesisBtn = document.getElementById('test-hypothesis-btn');
    if (testHypothesisBtn) {
        testHypothesisBtn.addEventListener('click', showTestHypothesisModal);
    }
    
    // Botão de criticar projeto
    const critiqueProjectBtn = document.getElementById('critique-project-btn');
    if (critiqueProjectBtn) {
        critiqueProjectBtn.addEventListener('click', showCritiqueProjectModal);
    }
    
    // Formulário de testar hipótese
    const testHypothesisForm = document.getElementById('test-hypothesis-form');
    if (testHypothesisForm) {
        testHypothesisForm.addEventListener('submit', handleTestHypothesis);
    }
    
    // Botão de analisar projeto
    const analyzeProjectBtn = document.getElementById('analyze-project-btn');
    if (analyzeProjectBtn) {
        analyzeProjectBtn.addEventListener('click', handleCritiqueProject);
    }
}

// Função para mostrar o modal de testar hipótese
function showTestHypothesisModal() {
    const testHypothesisModal = document.getElementById('test-hypothesis-modal');
    if (testHypothesisModal) {
        // Limpar o formulário e o resultado anterior
        const form = document.getElementById('test-hypothesis-form');
        if (form) {
            form.reset();
        }
        
        const result = document.getElementById('hypothesis-result');
        if (result) {
            result.innerHTML = '';
        }
        
        testHypothesisModal.style.display = 'block';
    }
}

// Função para mostrar o modal de criticar projeto
function showCritiqueProjectModal() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    const critiqueProjectModal = document.getElementById('critique-project-modal');
    if (critiqueProjectModal) {
        // Limpar o resultado anterior
        const result = document.getElementById('critique-result');
        if (result) {
            result.innerHTML = '';
        }
        
        critiqueProjectModal.style.display = 'block';
    }
}

// Função para lidar com o teste de hipótese
function handleTestHypothesis(e) {
    e.preventDefault();
    
    const hypothesisDescription = document.getElementById('hypothesis-description').value;
    
    if (!hypothesisDescription.trim()) {
        showNotification('Por favor, descreva a hipótese.', 'error');
        return;
    }
    
    // Em um ambiente real, faríamos uma requisição a uma API de IA
    // Aqui, vamos simular a análise
    simulateTestHypothesis(hypothesisDescription);
}

// Função para simular o teste de hipótese
function simulateTestHypothesis(hypothesis) {
    // Mostrar um indicador de carregamento
    const resultContainer = document.getElementById('hypothesis-result');
    if (resultContainer) {
        resultContainer.innerHTML = '<p>Analisando hipótese...</p>';
    }
    
    // Simular uma requisição a uma API de IA
    setTimeout(() => {
        // Gerar uma análise simulada
        const analysis = generateHypothesisAnalysis(hypothesis);
        
        // Exibir a análise
        if (resultContainer) {
            resultContainer.innerHTML = analysis;
        }
    }, 2000);
}

// Função para gerar uma análise de hipótese simulada
function generateHypothesisAnalysis(hypothesis) {
    // Em um ambiente real, isso seria gerado por uma IA
    // Aqui, vamos retornar uma análise genérica
    return `
        <h3>Análise da Hipótese</h3>
        <p><strong>Hipótese:</strong> ${hypothesis}</p>
        <h4>Pontos Fortes:</h4>
        <ul>
            <li>A hipótese está claramente definida.</li>
            <li>Foca em um problema específico.</li>
        </ul>
        <h4>Pontos a Melhorar:</h4>
        <ul>
            <li>Considere incluir métricas para validar a hipótese.</li>
            <li>Pense em possíveis cenários alternativos.</li>
        </ul>
        <h4>Recomendações:</h4>
        <ul>
            <li>Realize pesquisas com potenciais clientes para validar a hipótese.</li>
            <li>Crie um protótipo para testar a solução proposta.</li>
        </ul>
    `;
}

// Função para lidar com a crítica do projeto
function handleCritiqueProject() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    // Em um ambiente real, faríamos uma requisição a uma API de IA
    // Aqui, vamos simular a análise
    simulateCritiqueProject();
}

// Função para simular a crítica do projeto
function simulateCritiqueProject() {
    // Mostrar um indicador de carregamento
    const resultContainer = document.getElementById('critique-result');
    if (resultContainer) {
        resultContainer.innerHTML = '<p>Analisando projeto...</p>';
    }
    
    // Simular uma requisição a uma API de IA
    setTimeout(() => {
        // Gerar uma crítica simulada
        const critique = generateProjectCritique();
        
        // Exibir a crítica
        if (resultContainer) {
            resultContainer.innerHTML = critique;
        }
    }, 3000);
}

// Função para gerar uma crítica de projeto simulada
function generateProjectCritique() {
    // Em um ambiente real, isso seria gerado por uma IA
    // Aqui, vamos retornar uma crítica genérica
    return `
        <h3>Análise do Projeto</h3>
        <h4>Pontos Fortes:</h4>
        <ul>
            <li>O projeto tem uma definição clara do problema.</li>
            <li>A solução proposta é inovadora.</li>
            <li>O plano de marketing é bem estruturado.</li>
        </ul>
        <h4>Pontos a Melhorar:</h4>
        <ul>
            <li>Considere detalhar mais os recursos necessários.</li>
            <li>O cronograma poderia ser mais específico.</li>
            <li>As métricas de sucesso poderiam ser mais quantitativas.</li>
        </ul>
        <h4>Recomendações:</h4>
        <ul>
            <li>Realize uma pesquisa de mercado mais aprofundada.</li>
            <li>Considere a possibilidade de parcerias estratégicas.</li>
            <li>Desenvolva um plano de contingência para riscos identificados.</li>
        </ul>
    `;
}

// Inicializar a integração com IA quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initAI);