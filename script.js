// Variáveis globais
let currentUser = null;
let currentProject = null;
let currentView = 'projects';

// Inicialização do aplicativo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar se há um usuário logado
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainScreen();
    } else {
        showLoginScreen();
    }
    
    // Configurar event listeners
    setupEventListeners();
    
    // Inicializar internacionalização
    i18n.init();
    
    // Inicializar modo escuro
    darkMode.init();
});

// Configurar event listeners
function setupEventListeners() {
    // Login e Cadastro
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    
    // Tabs de login/cadastro
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchTab(tab);
        });
    });
    
    // Navegação
    document.getElementById('new-project-btn').addEventListener('click', () => {
        createNewProject();
    });
    
    document.getElementById('my-projects-btn').addEventListener('click', () => {
        showView('projects');
    });
    
    document.getElementById('test-hypothesis-btn').addEventListener('click', () => {
        showView('hypothesis');
    });
    
    document.getElementById('critique-project-btn').addEventListener('click', () => {
        showView('critique');
    });
    
    document.getElementById('manage-project-btn').addEventListener('click', () => {
        showView('manage');
    });
    
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Ações do projeto
    document.getElementById('save-btn').addEventListener('click', saveProject);
    document.getElementById('reedit-btn').addEventListener('click', reeditProject);
    document.getElementById('delete-btn').addEventListener('click', confirmDeleteProject);
    document.getElementById('export-btn').addEventListener('click', exportProjectToPDF);
    document.getElementById('share-btn').addEventListener('click', shareProject);
    
    // Nível de investimento
    document.getElementById('investment-select').addEventListener('change', updateInvestmentLevel);
    
    // Modal de confirmação
    document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
    document.getElementById('modal-confirm-btn').addEventListener('click', confirmModalAction);
    
    // Modal de compartilhamento
    document.getElementById('close-share-modal-btn').addEventListener('click', closeShareModal);
    document.getElementById('copy-share-link-btn').addEventListener('click', copyShareLink);
    
    // Link para o DealeGear
    document.getElementById('dealegear-link').addEventListener('click', (e) => {
        e.preventDefault();
        confirmDealeGearRedirect();
    });
    
    // Criar novo projeto na tela de projetos
    document.getElementById('create-new-project-btn').addEventListener('click', () => {
        createNewProject();
    });
    
    // Testar hipótese
    document.getElementById('project-select').addEventListener('change', enableHypothesisButton);
    document.getElementById('generate-hypothesis-btn').addEventListener('click', generateHypothesis);
    document.getElementById('copy-hypothesis-btn').addEventListener('click', copyHypothesis);
    
    // Crítica de projeto
    document.getElementById('critique-project-select').addEventListener('change', enableCritiqueButton);
    document.getElementById('generate-critique-btn').addEventListener('click', generateCritique);
    document.getElementById('export-critique-btn').addEventListener('click', exportCritique);
    
    // Gerenciar projeto
    document.getElementById('manage-project-select').addEventListener('change', loadManageProject);
}

// Funções de tela
function showLoginScreen() {
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('main-screen').classList.add('hidden');
}

function showMainScreen() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-screen').classList.remove('hidden');
    
    // Carregar projetos do usuário
    loadUserProjects();
    
    // Mostrar a tela de projetos por padrão
    showView('projects');
    
    // Garantir que o texto "Nenhum Projeto Aberto" tenha a classe correta
    const projectNameElement = document.getElementById('project-name');
    projectNameElement.textContent = i18n.t('project.noProject');
    projectNameElement.className = 'project-title';
}

function showView(viewName) {
    currentView = viewName;
    
    // Esconder todas as views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.add('hidden');
    });
    
    // Mostrar a view selecionada
    document.getElementById(`${viewName}-view`).classList.remove('hidden');
    
    // Atualizar navegação
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Atualizar botões de ação
    updateActionButtons();
    
    // Carregar dados específicos da view
    switch (viewName) {
        case 'projects':
            loadUserProjects();
            break;
        case 'hypothesis':
            loadProjectsForSelect('project-select');
            break;
        case 'critique':
            loadProjectsForSelect('critique-project-select');
            break;
        case 'manage':
            loadProjectsForSelect('manage-project-select');
            break;
    }
}

// Funções de autenticação
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simular login
    auth.login(email, password)
        .then(user => {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMainScreen();
            showNotification('Login realizado com sucesso!', 'success');
        })
        .catch(error => {
            showNotification(error.message, 'error');
        });
}

function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // Simular cadastro
    auth.register(name, email, password)
        .then(user => {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            showMainScreen();
            showNotification('Cadastro realizado com sucesso!', 'success');
        })
        .catch(error => {
            showNotification(error.message, 'error');
        });
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    currentProject = null;
    showLoginScreen();
    showNotification('Logout realizado com sucesso!', 'info');
}

function switchTab(tab) {
    // Atualizar botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    
    // Atualizar formulários
    document.querySelectorAll('.form').forEach(form => {
        form.classList.remove('active');
    });
    document.getElementById(`${tab}-form`).classList.add('active');
}

// Funções de projeto
function createNewProject() {
    // Criar um novo projeto vazio
    currentProject = {
        id: generateUUID(),
        nome: 'Novo Projeto',
        nivelInvestimento: 'Baixo',
        passos: getEmptySteps(),
        usuario: currentUser.id,
        timestamp: new Date().toISOString()
    };
    
    // Atualizar a interface
    const projectNameElement = document.getElementById('project-name');
    projectNameElement.textContent = currentProject.nome;
    projectNameElement.className = 'project-title'; // Adicionando a classe
    
    document.getElementById('investment-select').value = currentProject.nivelInvestimento;
    
    // Carregar os passos do projeto
    loadProjectSteps();
    
    // Mostrar a view de projeto
    showView('project');
    
    // Atualizar botões de ação
    updateActionButtons();
    
    showNotification('Novo projeto criado!', 'success');
}

function loadUserProjects() {
    // Carregar projetos do usuário
    db.getProjectsByUser(currentUser.id)
        .then(projects => {
            const projectsList = document.getElementById('projects-list');
            projectsList.innerHTML = '';
            
            if (projects.length === 0) {
                projectsList.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-folder-open"></i>
                        <p data-i18n="projects.empty">Você ainda não tem projetos.</p>
                        <button class="btn-primary" id="empty-create-btn">
                            <i class="fas fa-plus"></i>
                            <span data-i18n="projects.createNew">Criar Novo Projeto</span>
                        </button>
                    </div>
                `;
                
                document.getElementById('empty-create-btn').addEventListener('click', () => {
                    createNewProject();
                });
                
                return;
            }
            
            projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                projectCard.innerHTML = `
                    <h3>${project.nome}</h3>
                    <p>${formatDate(project.timestamp)}</p>
                    <div class="project-meta">
                        <span class="project-level level-${project.nivelInvestimento.toLowerCase()}">${project.nivelInvestimento}</span>
                        <span>${project.passos.filter(p => p.textoUsuario.trim() !== '').length}/10 passos preenchidos</span>
                    </div>
                `;
                
                projectCard.addEventListener('click', () => {
                    loadProject(project);
                });
                
                projectsList.appendChild(projectCard);
            });
        })
        .catch(error => {
            showNotification('Erro ao carregar projetos: ' + error.message, 'error');
        });
}

function loadProject(project) {
    currentProject = project;
    
    // Atualizar a interface
    const projectNameElement = document.getElementById('project-name');
    projectNameElement.textContent = project.nome;
    projectNameElement.className = 'project-title'; // Adicionando a classe
    
    document.getElementById('investment-select').value = project.nivelInvestimento;
    
    // Carregar os passos do projeto
    loadProjectSteps();
    
    // Mostrar a view de projeto
    showView('project');
    
    // Atualizar botões de ação
    updateActionButtons();
}

function loadProjectSteps() {
    const stepsContainer = document.getElementById('steps-container');
    stepsContainer.innerHTML = '';
    
    currentProject.passos.forEach(step => {
        const stepCard = document.createElement('div');
        stepCard.className = 'step-card';
        stepCard.innerHTML = `
            <h3><i class="fas fa-check-circle"></i> ${step.titulo}</h3>
            <div class="step-guide">${step.textoGuia}</div>
            <textarea class="step-input" data-step-id="${step.id}" placeholder="Adicione suas anotações aqui...">${step.textoUsuario || ''}</textarea>
        `;
        
        stepsContainer.appendChild(stepCard);
    });
    
    // Adicionar event listeners para os campos de texto
    document.querySelectorAll('.step-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const stepId = parseInt(e.target.getAttribute('data-step-id'));
            const step = currentProject.passos.find(s => s.id === stepId);
            if (step) {
                step.textoUsuario = e.target.value;
            }
        });
    });
}

function saveProject() {
    if (!currentProject) return;
    
    // Atualizar dados do projeto
    currentProject.nome = document.getElementById('project-name').textContent;
    currentProject.nivelInvestimento = document.getElementById('investment-select').value;
    currentProject.timestamp = new Date().toISOString();
    
    // Salvar no banco de dados
    db.saveProject(currentProject)
        .then(() => {
            showNotification('Projeto salvo com sucesso!', 'success');
            updateActionButtons();
        })
        .catch(error => {
            showNotification('Erro ao salvar projeto: ' + error.message, 'error');
        });
}

function reeditProject() {
    if (!currentProject) return;
    
    // Habilitar campos para edição
    document.getElementById('project-name').contentEditable = true;
    document.getElementById('project-name').focus();
    
    document.getElementById('investment-select').disabled = false;
    
    document.querySelectorAll('.step-input').forEach(input => {
        input.disabled = false;
    });
    
    updateActionButtons();
    showNotification('Modo de edição ativado', 'info');
}

function confirmDeleteProject() {
    if (!currentProject) return;
    
    showModal(
        i18n.t('modal.deleteProjectTitle'),
        i18n.t('modal.deleteProjectMessage'),
        () => {
            deleteProject();
        }
    );
}

function deleteProject() {
    if (!currentProject) return;
    
    db.deleteProject(currentProject.id)
        .then(() => {
            showNotification('Projeto excluído com sucesso!', 'success');
            currentProject = null;
            showView('projects');
            updateActionButtons();
        })
        .catch(error => {
            showNotification('Erro ao excluir projeto: ' + error.message, 'error');
        });
}

function exportProjectToPDF() {
    if (!currentProject) return;
    
    pdf.exportProjectToPDF(currentProject)
        .then(() => {
            showNotification('PDF exportado com sucesso!', 'success');
        })
        .catch(error => {
            showNotification('Erro ao exportar PDF: ' + error.message, 'error');
        });
}

function shareProject() {
    if (!currentProject) return;
    
    // Gerar link de compartilhamento (simulado)
    const shareLink = `${window.location.origin}/shared-project/${currentProject.id}`;
    document.getElementById('share-link').value = shareLink;
    
    // Mostrar modal de compartilhamento
    document.getElementById('share-modal').classList.remove('hidden');
}

function updateInvestmentLevel() {
    if (!currentProject) return;
    
    const level = document.getElementById('investment-select').value;
    currentProject.nivelInvestimento = level;
    
    // Atualizar textos guia
    currentProject.passos.forEach((step, index) => {
        step.textoGuia = getStepGuideText(index, level);
    });
    
    // Recarregar os passos
    loadProjectSteps();
}

function updateActionButtons() {
    const hasProject = currentProject !== null;
    const isProjectView = currentView === 'project';
    
    document.getElementById('save-btn').disabled = !hasProject;
    document.getElementById('reedit-btn').disabled = !hasProject || !isProjectView;
    document.getElementById('delete-btn').disabled = !hasProject;
    document.getElementById('export-btn').disabled = !hasProject;
    document.getElementById('share-btn').disabled = !hasProject;
}

// Funções de utilidade
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.currentLang, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function showModal(title, message, confirmCallback) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-message').textContent = message;
    document.getElementById('confirmation-modal').classList.remove('hidden');
    
    // Configurar callback de confirmação
    document.getElementById('modal-confirm-btn').onclick = () => {
        confirmCallback();
        closeModal();
    };
}

function closeModal() {
    document.getElementById('confirmation-modal').classList.add('hidden');
}

function confirmModalAction() {
    // Ação será definida na função showModal
}

function closeShareModal() {
    document.getElementById('share-modal').classList.add('hidden');
}

function copyShareLink() {
    const shareLinkInput = document.getElementById('share-link');
    shareLinkInput.select();
    document.execCommand('copy');
    showNotification('Link copiado para a área de transferência!', 'success');
}

function confirmDealeGearRedirect() {
    showModal(
        i18n.t('modal.dealegearTitle'),
        i18n.t('modal.dealegearMessage'),
        () => {
            window.open('https://dealegear.com', '_blank');
        }
    );
}

function enableHypothesisButton() {
    const projectSelect = document.getElementById('project-select');
    const generateBtn = document.getElementById('generate-hypothesis-btn');
    
    generateBtn.disabled = !projectSelect.value;
}

function generateHypothesis() {
    const projectId = document.getElementById('project-select').value;
    
    if (!projectId) return;
    
    // Mostrar indicador de carregamento
    const outputDiv = document.getElementById('hypothesis-output');
    outputDiv.classList.remove('hidden');
    document.getElementById('hypothesis-content').textContent = i18n.t('hypothesis.generating');
    
    // Obter tipo de saída
    const outputType = document.getElementById('output-type').value;
    
    // Gerar hipótese com IA
    ai.generateHypothesis(projectId, outputType)
        .then(result => {
            document.getElementById('hypothesis-content').textContent = result;
        })
        .catch(error => {
            document.getElementById('hypothesis-content').textContent = i18n.t('hypothesis.error') + ': ' + error.message;
        });
}

function copyHypothesis() {
    const hypothesisContent = document.getElementById('hypothesis-content').textContent;
    
    // Copiar para a área de transferência
    const textArea = document.createElement('textarea');
    textArea.value = hypothesisContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    showNotification('Hipótese copiada para a área de transferência!', 'success');
}

function enableCritiqueButton() {
    const projectSelect = document.getElementById('critique-project-select');
    const generateBtn = document.getElementById('generate-critique-btn');
    
    generateBtn.disabled = !projectSelect.value;
}

function generateCritique() {
    const projectId = document.getElementById('critique-project-select').value;
    
    if (!projectId) return;
    
    // Mostrar indicador de carregamento
    const outputDiv = document.getElementById('critique-output');
    outputDiv.classList.remove('hidden');
    document.getElementById('critique-content').textContent = i18n.t('critique.generating');
    
    // Gerar crítica com IA
    ai.generateCritique(projectId)
        .then(result => {
            document.getElementById('critique-content').textContent = result;
        })
        .catch(error => {
            document.getElementById('critique-content').textContent = i18n.t('critique.error') + ': ' + error.message;
        });
}

function exportCritique() {
    const critiqueContent = document.getElementById('critique-content').textContent;
    
    // Criar blob para download
    const blob = new Blob([critiqueContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Criar link de download
    const a = document.createElement('a');
    a.href = url;
    a.download = `critica-projeto-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Limpar
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
    
    showNotification('Crítica exportada com sucesso!', 'success');
}

function loadProjectsForSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option value="" disabled selected>${i18n.t('hypothesis.noProject')}</option>`;
    
    db.getProjectsByUser(currentUser.id)
        .then(projects => {
            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = project.nome;
                select.appendChild(option);
            });
        })
        .catch(error => {
            showNotification('Erro ao carregar projetos: ' + error.message, 'error');
        });
}

function loadManageProject() {
    const projectId = document.getElementById('manage-project-select').value;
    
    if (!projectId) {
        document.getElementById('manage-steps-container').classList.add('hidden');
        return;
    }
    
    db.getProjectById(projectId)
        .then(project => {
            currentProject = project;
            renderManageSteps();
            document.getElementById('manage-steps-container').classList.remove('hidden');
        })
        .catch(error => {
            showNotification('Erro ao carregar projeto: ' + error.message, 'error');
        });
}

function renderManageSteps() {
    const container = document.getElementById('manage-steps-container');
    container.innerHTML = '';
    
    currentProject.passos.forEach(step => {
        const stepCard = document.createElement('div');
        stepCard.className = 'manage-step-card';
        stepCard.innerHTML = `
            <h3>${step.titulo}</h3>
            <div class="manage-step-form">
                <div class="form-group">
                    <label for="responsible-${step.id}">Responsável</label>
                    <input type="text" id="responsible-${step.id}" value="${step.responsible || ''}">
                </div>
                <div class="form-group">
                    <label for="deadline-${step.id}">Prazo</label>
                    <input type="date" id="deadline-${step.id}" value="${step.deadline || ''}">
                </div>
                <div class="form-group">
                    <label for="status-${step.id}">Status</label>
                    <select id="status-${step.id}">
                        <option value="pending" ${step.status === 'pending' ? 'selected' : ''}>Pendente</option>
                        <option value="in-progress" ${step.status === 'in-progress' ? 'selected' : ''}>Em Progresso</option>
                        <option value="completed" ${step.status === 'completed' ? 'selected' : ''}>Concluído</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="notes-${step.id}">Observações</label>
                    <textarea id="notes-${step.id}">${step.notes || ''}</textarea>
                </div>
            </div>
        `;
        
        container.appendChild(stepCard);
        
        // Adicionar event listeners para salvar alterações
        document.getElementById(`responsible-${step.id}`).addEventListener('change', () => saveManageStep(step.id));
        document.getElementById(`deadline-${step.id}`).addEventListener('change', () => saveManageStep(step.id));
        document.getElementById(`status-${step.id}`).addEventListener('change', () => saveManageStep(step.id));
        document.getElementById(`notes-${step.id}`).addEventListener('input', () => saveManageStep(step.id));
    });
}

function saveManageStep(stepId) {
    const step = currentProject.passos.find(s => s.id === stepId);
    if (!step) return;
    
    step.responsible = document.getElementById(`responsible-${stepId}`).value;
    step.deadline = document.getElementById(`deadline-${stepId}`).value;
    step.status = document.getElementById(`status-${stepId}`).value;
    step.notes = document.getElementById(`notes-${stepId}`).value;
    
    // Salvar projeto atualizado
    db.saveProject(currentProject)
        .then(() => {
            showNotification('Alterações salvas com sucesso!', 'success');
        })
        .catch(error => {
            showNotification('Erro ao salvar alterações: ' + error.message, 'error');
        });
}

// Funções para obter textos dos passos
function getEmptySteps() {
    return [
        { id: 1, titulo: "Definição do Problema", textoGuia: getStepGuideText(0, "Baixo"), textoUsuario: "" },
        { id: 2, titulo: "Solução Proposta", textoGuia: getStepGuideText(1, "Baixo"), textoUsuario: "" },
        { id: 3, titulo: "Público-Alvo", textoGuia: getStepGuideText(2, "Baixo"), textoUsuario: "" },
        { id: 4, titulo: "Proposta de Valor", textoGuia: getStepGuideText(3, "Baixo"), textoUsuario: "" },
        { id: 5, titulo: "Modelo de Negócio", textoGuia: getStepGuideText(4, "Baixo"), textoUsuario: "" },
        { id: 6, titulo: "Recursos Necessários", textoGuia: getStepGuideText(5, "Baixo"), textoUsuario: "" },
        { id: 7, titulo: "Equipe", textoGuia: getStepGuideText(6, "Baixo"), textoUsuario: "" },
        { id: 8, titulo: "Plano de Ação", textoGuia: getStepGuideText(7, "Baixo"), textoUsuario: "" },
        { id: 9, titulo: "Validação", textoGuia: getStepGuideText(8, "Baixo"), textoUsuario: "" },
        { id: 10, titulo: "Próximos Passos", textoGuia: getStepGuideText(9, "Baixo"), textoUsuario: "" }
    ];
}

function getStepGuideText(stepIndex, level) {
    const steps = [
        {
            titulo: "Definição do Problema",
            textos: {
                "Baixo": "Identifique rapidamente a dor principal que seu projeto resolve.",
                "Médio": "Levante dados básicos para comprovar a relevância do problema.",
                "Alto": "Faça uma pesquisa aprofundada, com estatísticas, entrevistas e relatórios."
            }
        },
        {
            titulo: "Solução Proposta",
            textos: {
                "Baixo": "Escreva em poucas frases como seu projeto resolve o problema.",
                "Médio": "Estruture funcionalidades principais e diferenciais.",
                "Alto": "Modele sua solução com protótipos, testes iniciais e documentação técnica."
            }
        },
        {
            titulo: "Público-Alvo",
            textos: {
                "Baixo": "Descreva quem seriam os primeiros usuários.",
                "Médio": "Crie uma persona simples, incluindo faixa etária e objetivos.",
                "Alto": "Desenvolva várias personas com perfis detalhados e jornadas de uso."
            }
        },
        {
            titulo: "Proposta de Valor",
            textos: {
                "Baixo": "Explique em 1 frase o valor único que você entrega.",
                "Médio": "Mostre como sua solução se diferencia das existentes.",
                "Alto": "Desenhe uma matriz de valor comparativa com concorrentes."
            }
        },
        {
            titulo: "Modelo de Negócio",
            textos: {
                "Baixo": "Anote como imagina ganhar dinheiro com o projeto.",
                "Médio": "Descreva possíveis fontes de receita e custos básicos.",
                "Alto": "Elabore um modelo detalhado (assinaturas, parcerias, escalabilidade)."
            }
        },
        {
            titulo: "Recursos Necessários",
            textos: {
                "Baixo": "Liste os recursos imediatos que você já possui.",
                "Médio": "Inclua recursos financeiros, humanos e tecnológicos previstos.",
                "Alto": "Monte um orçamento estruturado com fluxo de caixa."
            }
        },
        {
            titulo: "Equipe",
            textos: {
                "Baixo": "Liste quem pode ajudar no início.",
                "Médio": "Defina papéis principais (ex.: marketing, tecnologia, financeiro).",
                "Alto": "Estruture um organograma (mesmo que conceitual) e responsabilidades detalhadas."
            }
        },
        {
            titulo: "Plano de Ação",
            textos: {
                "Baixo": "Liste as primeiras tarefas a serem feitas.",
                "Médio": "Crie um cronograma simples com prazos.",
                "Alto": "Elabore um roadmap detalhado com entregas trimestrais."
            }
        },
        {
            titulo: "Validação",
            textos: {
                "Baixo": "Compartilhe sua ideia com amigos e colete feedback inicial.",
                "Médio": "Teste hipóteses com uma landing page ou postagens em redes sociais.",
                "Alto": "Realize experimentos pagos (ads, protótipos interativos) e análises de métricas."
            }
        },
        {
            titulo: "Próximos Passos",
            textos: {
                "Baixo": "Defina um objetivo simples para a próxima semana.",
                "Médio": "Planeje as etapas do próximo mês.",
                "Alto": "Estruture metas para os próximos 6–12 meses."
            }
        }
    ];
    
    return steps[stepIndex].textos[level];
}