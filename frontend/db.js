// Variáveis globais
let currentProject = null;
let userProjects = [];
let autoSaveTimer = null;

// Função para inicializar o banco de dados
function initDB() {
    // Configurar eventos relacionados ao banco de dados
    setupDBEvents();
}

// Função para configurar os eventos relacionados ao banco de dados
function setupDBEvents() {
    // Botão de novo projeto
    const newProjectBtn = document.getElementById('new-project-btn');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', showNewProjectModal);
    }
    
    // Botão de criar projeto (na tela inicial)
    const createProjectBtn = document.getElementById('create-project-btn');
    if (createProjectBtn) {
        createProjectBtn.addEventListener('click', showNewProjectModal);
    }
    
    // Botão de meus projetos
    const myProjectsBtn = document.getElementById('my-projects-btn');
    if (myProjectsBtn) {
        myProjectsBtn.addEventListener('click', showMyProjectsModal);
    }
    
    // Botão de excluir projeto
    const deleteProjectBtn = document.getElementById('delete-project-btn');
    if (deleteProjectBtn) {
        deleteProjectBtn.addEventListener('click', showDeleteProjectModal);
    }
    
    // Botão de renomear projeto
    const renameProjectBtn = document.getElementById('rename-project-btn');
    if (renameProjectBtn) {
        renameProjectBtn.addEventListener('click', showRenameProjectModal);
    }
    
    // Botão de salvar projeto
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveProject);
    }
    
    // Botão de reeditar projeto
    const reeditBtn = document.getElementById('reedit-btn');
    if (reeditBtn) {
        reeditBtn.addEventListener('click', reeditProject);
    }
    
    // Botão de compartilhar projeto
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', showShareProjectModal);
    }
    
    // Formulário de novo projeto
    const newProjectForm = document.getElementById('new-project-form');
    if (newProjectForm) {
        newProjectForm.addEventListener('submit', handleNewProject);
    }
    
    // Botões de template
    const templateButtons = document.querySelectorAll('[data-template-level]');
    templateButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const level = button.getAttribute('data-template-level');
            showNewProjectModal(level);
        });
    });
    
    // Botão de confirmar exclusão
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', deleteProject);
    }
    
    // Botão de cancelar exclusão
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            const deleteProjectModal = document.getElementById('delete-project-modal');
            if (deleteProjectModal) {
                deleteProjectModal.style.display = 'none';
            }
        });
    }
    
    // Botão de copiar link
    const copyLinkBtn = document.getElementById('copy-link-btn');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', copyShareLink);
    }
    
    // Mudança de permissão de compartilhamento
    const permissionRadios = document.querySelectorAll('input[name="permission"]');
    permissionRadios.forEach(radio => {
        radio.addEventListener('change', updateShareLink);
    });
}

// Função para carregar os projetos do usuário
function loadUserProjects() {
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular o carregamento dos projetos
    simulateLoadUserProjects();
}

// Função para simular o carregamento dos projetos do usuário
function simulateLoadUserProjects() {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Simular uma resposta com projetos
        userProjects = [
            {
                id: 'project1',
                name: 'Plano de Negócios',
                lastUpdated: '2023-06-15T10:30:00Z'
            },
            {
                id: 'project2',
                name: 'Lançamento de Produto',
                lastUpdated: '2023-06-10T15:45:00Z'
            }
        ];
        
        // Se não houver um projeto atual, mostrar a tela inicial
        if (!currentProject) {
            showNoProjectScreen();
        }
    }, 500);
}

// Função para mostrar a tela de nenhum projeto
function showNoProjectScreen() {
    const projectBlocks = document.getElementById('project-blocks');
    const noProject = document.getElementById('no-project');
    
    if (projectBlocks) {
        projectBlocks.style.display = 'none';
    }
    
    if (noProject) {
        noProject.style.display = 'flex';
    }
}

// Função para mostrar o modal de novo projeto
function showNewProjectModal(templateLevel = null) {
    const newProjectModal = document.getElementById('new-project-modal');
    if (newProjectModal) {
        // Se um nível de template foi especificado, selecioná-lo
        if (templateLevel) {
            const templateSelect = document.getElementById('project-template');
            if (templateSelect) {
                templateSelect.value = templateLevel;
            }
        }
        
        newProjectModal.style.display = 'block';
    }
}

// Função para mostrar o modal de meus projetos
function showMyProjectsModal() {
    const myProjectsModal = document.getElementById('my-projects-modal');
    if (myProjectsModal) {
        // Preencher a lista de projetos
        populateProjectsList();
        
        myProjectsModal.style.display = 'block';
    }
}

// Função para preencher a lista de projetos
function populateProjectsList() {
    const projectsList = document.getElementById('projects-list');
    if (!projectsList) return;
    
    // Limpar a lista
    projectsList.innerHTML = '';
    
    // Adicionar cada projeto à lista
    userProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <h4>${project.name}</h4>
            <p>Última atualização: ${formatDate(project.lastUpdated)}</p>
        `;
        
        // Adicionar evento de clique para carregar o projeto
        projectCard.addEventListener('click', () => {
            loadProject(project.id);
            myProjectsModal.style.display = 'none';
        });
        
        projectsList.appendChild(projectCard);
    });
}

// Função para formatar uma data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Função para mostrar o modal de excluir projeto
function showDeleteProjectModal() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    const deleteProjectModal = document.getElementById('delete-project-modal');
    if (deleteProjectModal) {
        deleteProjectModal.style.display = 'block';
    }
}

// Função para mostrar o modal de renomear projeto
function showRenameProjectModal() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    // Em um ambiente real, mostraríamos um modal para renomear o projeto
    // Aqui, vamos apenas pedir o nome com prompt
    const newName = prompt('Digite o novo nome do projeto:', currentProject.name);
    
    if (newName && newName.trim() !== '') {
        renameProject(newName.trim());
    }
}

// Função para mostrar o modal de compartilhar projeto
function showShareProjectModal() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    const shareProjectModal = document.getElementById('share-project-modal');
    if (shareProjectModal) {
        // Gerar um link de compartilhamento
        generateShareLink();
        
        shareProjectModal.style.display = 'block';
    }
}

// Função para lidar com a criação de um novo projeto
function handleNewProject(e) {
    e.preventDefault();
    
    const projectName = document.getElementById('project-name').value;
    const templateLevel = document.getElementById('project-template').value;
    
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular a criação do projeto
    simulateCreateProject(projectName, templateLevel);
}

// Função para simular a criação de um projeto
function simulateCreateProject(name, templateLevel) {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Criar um novo projeto
        const newProject = {
            id: 'project' + Date.now(),
            name: name,
            templateLevel: templateLevel,
            language: localStorage.getItem('language') || 'pt',
            blocks: generateProjectBlocks(templateLevel),
            createdAt: new Date().toISOString(),
            lastUpdated: new Date().toISOString()
        };
        
        // Adicionar o projeto à lista de projetos do usuário
        userProjects.push(newProject);
        
        // Definir como projeto atual
        currentProject = newProject;
        
        // Fechar o modal
        const newProjectModal = document.getElementById('new-project-modal');
        if (newProjectModal) {
            newProjectModal.style.display = 'none';
        }
        
        // Carregar o projeto
        loadProject(newProject.id);
        
        // Mostrar notificação
        showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.projectCreated'));
    }, 500);
}

// Função para gerar os blocos do projeto com base no template
function generateProjectBlocks(templateLevel) {
    // Em um ambiente real, buscaríamos os templates do backend
    // Aqui, vamos gerar blocos genéricos
    const blocks = [];
    
    // Títulos dos blocos em português
    const blockTitles = [
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
    ];
    
    // Textos guia para cada bloco
    const guideTexts = [
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
    ];
    
    // Criar os blocos
    for (let i = 0; i < 10; i++) {
        blocks.push({
            id: i + 1,
            title: blockTitles[i],
            guideText: guideTexts[i],
            userText: ''
        });
    }
    
    return blocks;
}

// Função para carregar um projeto
function loadProject(projectId) {
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos buscar o projeto na lista de projetos do usuário
    const project = userProjects.find(p => p.id === projectId);
    
    if (project) {
        currentProject = project;
        
        // Atualizar a interface
        updateUIForProject();
        
        // Mostrar notificação
        showNotification(`Projeto "${project.name}" carregado com sucesso!`);
    } else {
        showNotification('Projeto não encontrado.', 'error');
    }
}

// Função para atualizar a interface para um projeto carregado
function updateUIForProject() {
    if (!currentProject) return;
    
    // Atualizar o nome do projeto na barra superior
    const currentProjectName = document.getElementById('current-project-name');
    if (currentProjectName) {
        currentProjectName.textContent = currentProject.name;
    }
    
    // Mostrar os blocos do projeto
    const projectBlocks = document.getElementById('project-blocks');
    const noProject = document.getElementById('no-project');
    
    if (projectBlocks && noProject) {
        projectBlocks.style.display = 'grid';
        noProject.style.display = 'none';
        
        // Limpar os blocos existentes
        projectBlocks.innerHTML = '';
        
        // Adicionar os blocos do projeto
        currentProject.blocks.forEach(block => {
            const blockElement = createProjectBlock(block);
            projectBlocks.appendChild(blockElement);
        });
    }
    
    // Configurar o auto-save
    setupAutoSave();
}

// Função para criar um elemento de bloco de projeto
function createProjectBlock(block) {
    const blockElement = document.createElement('div');
    blockElement.className = 'project-block';
    blockElement.innerHTML = `
        <h3>${block.title}</h3>
        <p class="guide-text">${block.guideText}</p>
        <textarea id="block-${block.id}" data-block-id="${block.id}" placeholder="Adicione suas anotações aqui...">${block.userText || ''}</textarea>
    `;
    
    // Adicionar evento de mudança ao textarea
    const textarea = blockElement.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', handleBlockChange);
    }
    
    return blockElement;
}

// Função para lidar com mudanças em um bloco
function handleBlockChange(e) {
    const blockId = parseInt(e.target.getAttribute('data-block-id'));
    const newText = e.target.value;
    
    // Atualizar o texto do bloco no projeto atual
    if (currentProject) {
        const block = currentProject.blocks.find(b => b.id === blockId);
        if (block) {
            block.userText = newText;
            
            // Reiniciar o timer de auto-save
            resetAutoSaveTimer();
        }
    }
}

// Função para configurar o auto-save
function setupAutoSave() {
    // Limpar o timer existente
    if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
    }
    
    // Configurar um novo timer
    autoSaveTimer = setTimeout(() => {
        saveProject(true); // true indica que é um auto-save
    }, 5000); // 5 segundos
}

// Função para reiniciar o timer de auto-save
function resetAutoSaveTimer() {
    setupAutoSave();
}

// Função para salvar o projeto
function saveProject(isAutoSave = false) {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular o salvamento
    simulateSaveProject(isAutoSave);
}

// Função para simular o salvamento do projeto
function simulateSaveProject(isAutoSave) {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Atualizar a data de última modificação
        currentProject.lastUpdated = new Date().toISOString();
        
        // Atualizar o projeto na lista de projetos do usuário
        const index = userProjects.findIndex(p => p.id === currentProject.id);
        if (index !== -1) {
            userProjects[index] = currentProject;
        }
        
        // Mostrar notificação apenas se não for auto-save
        if (!isAutoSave) {
            showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.projectSaved'));
        }
    }, 500);
}

// Função para reeditar o projeto
function reeditProject() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    // Em um ambiente real, poderíamos implementar um histórico de versões
    // Aqui, vamos apenas recarregar o projeto
    loadProject(currentProject.id);
    
    showNotification('Projeto reeditado com sucesso!');
}

// Função para renomear o projeto
function renameProject(newName) {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular a renomeação
    simulateRenameProject(newName);
}

// Função para simular a renomeação do projeto
function simulateRenameProject(newName) {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Atualizar o nome do projeto
        currentProject.name = newName;
        currentProject.lastUpdated = new Date().toISOString();
        
        // Atualizar o projeto na lista de projetos do usuário
        const index = userProjects.findIndex(p => p.id === currentProject.id);
        if (index !== -1) {
            userProjects[index] = currentProject;
        }
        
        // Atualizar a interface
        const currentProjectName = document.getElementById('current-project-name');
        if (currentProjectName) {
            currentProjectName.textContent = newName;
        }
        
        // Mostrar notificação
        showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.projectRenamed'));
    }, 500);
}

// Função para excluir o projeto
function deleteProject() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular a exclusão
    simulateDeleteProject();
}

// Função para simular a exclusão do projeto
function simulateDeleteProject() {
    // Simular uma requisição ao backend
    setTimeout(() => {
        // Remover o projeto da lista de projetos do usuário
        userProjects = userProjects.filter(p => p.id !== currentProject.id);
        
        // Limpar o projeto atual
        currentProject = null;
        
        // Fechar o modal
        const deleteProjectModal = document.getElementById('delete-project-modal');
        if (deleteProjectModal) {
            deleteProjectModal.style.display = 'none';
        }
        
        // Mostrar a tela inicial
        showNoProjectScreen();
        
        // Mostrar notificação
        showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.projectDeleted'));
    }, 500);
}

// Função para gerar um link de compartilhamento
function generateShareLink() {
    if (!currentProject) return;
    
    // Em um ambiente real, geraríamos um link único no backend
    // Aqui, vamos gerar um link fake
    const shareLink = `${window.location.origin}/shared/${currentProject.id}`;
    
    // Atualizar o campo de link
    const shareLinkInput = document.getElementById('share-link');
    if (shareLinkInput) {
        shareLinkInput.value = shareLink;
    }
}

// Função para atualizar o link de compartilhamento com base nas permissões
function updateShareLink() {
    // Em um ambiente real, atualizaríamos as permissões no backend
    // Aqui, vamos apenas regenerar o link
    generateShareLink();
}

// Função para copiar o link de compartilhamento
function copyShareLink() {
    const shareLinkInput = document.getElementById('share-link');
    if (shareLinkInput) {
        shareLinkInput.select();
        document.execCommand('copy');
        
        // Mostrar notificação
        showNotification(getTranslation(localStorage.getItem('language') || 'pt', 'notifications.linkCopied'));
    }
}

// Inicializar o banco de dados quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initDB);