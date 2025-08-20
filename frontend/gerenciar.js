// Variáveis globais para gerenciamento de projeto
let projectTasks = [];
let projectTeam = [];
let projectTimeline = [];

// Função para inicializar o gerenciamento de projeto
function initProjectManagement() {
    // Configurar eventos relacionados ao gerenciamento
    setupManagementEvents();
}

// Função para configurar os eventos relacionados ao gerenciamento
function setupManagementEvents() {
    // Botão de gerenciar projeto
    const manageProjectBtn = document.getElementById('manage-project-btn');
    if (manageProjectBtn) {
        manageProjectBtn.addEventListener('click', showManageProjectModal);
    }
    
    // Abas do modal de gerenciamento
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchManagementTab(tabName);
        });
    });
    
    // Botão de adicionar tarefa
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', addTask);
    }
    
    // Botão de adicionar membro
    const addMemberBtn = document.getElementById('add-member-btn');
    if (addMemberBtn) {
        addMemberBtn.addEventListener('click', addTeamMember);
    }
    
    // Botão de adicionar marco
    const addMilestoneBtn = document.getElementById('add-milestone-btn');
    if (addMilestoneBtn) {
        addMilestoneBtn.addEventListener('click', addTimelineMilestone);
    }
}

// Função para mostrar o modal de gerenciar projeto
function showManageProjectModal() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }
    
    const manageProjectModal = document.getElementById('manage-project-modal');
    if (manageProjectModal) {
        // Carregar os dados de gerenciamento do projeto
        loadProjectManagementData();
        
        manageProjectModal.style.display = 'block';
    }
}

// Função para carregar os dados de gerenciamento do projeto
function loadProjectManagementData() {
    // Em um ambiente real, faríamos uma requisição ao backend
    // Aqui, vamos simular o carregamento dos dados
    simulateLoadProjectManagementData();
}

// Função para simular o carregamento dos dados de gerenciamento
function simulateLoadProjectManagementData() {
    // Simular dados de tarefas
    projectTasks = [
        { id: 1, name: 'Pesquisa de mercado', assignee: 'João Silva', completed: false },
        { id: 2, name: 'Desenvolvimento do protótipo', assignee: 'Maria Santos', completed: false },
        { id: 3, name: 'Teste com usuários', assignee: 'Pedro Oliveira', completed: true }
    ];
    
    // Simular dados da equipe
    projectTeam = [
        { id: 1, name: 'João Silva', role: 'Gerente de Projeto', avatar: 'JS' },
        { id: 2, name: 'Maria Santos', role: 'Desenvolvedora', avatar: 'MS' },
        { id: 3, name: 'Pedro Oliveira', role: 'Designer', avatar: 'PO' }
    ];
    
    // Simular dados do cronograma
    projectTimeline = [
        { id: 1, title: 'Início do projeto', date: '2023-06-01', description: 'Kickoff do projeto' },
        { id: 2, title: 'Entrega do protótipo', date: '2023-07-15', description: 'Protótipo funcional' },
        { id: 3, title: 'Lançamento', date: '2023-09-01', description: 'Lançamento oficial' }
    ];
    
    // Atualizar as abas
    updateTasksTab();
    updateTeamTab();
    updateTimelineTab();
}

// Função para alternar entre as abas de gerenciamento
function switchManagementTab(tabName) {
    // Atualizar as abas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Atualizar os conteúdos das abas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Função para atualizar a aba de tarefas
function updateTasksTab() {
    const tasksList = document.getElementById('tasks-list');
    if (!tasksList) return;
    
    // Limpar a lista
    tasksList.innerHTML = '';
    
    // Adicionar cada tarefa à lista
    projectTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <input type="checkbox" id="task-${task.id}" ${task.completed ? 'checked' : ''}>
            <label for="task-${task.id}" class="task-name">${task.name}</label>
            <span class="task-assignee">${task.assignee}</span>
        `;
        
        // Adicionar evento de mudança ao checkbox
        const checkbox = taskItem.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                toggleTaskCompletion(task.id);
            });
        }
        
        tasksList.appendChild(taskItem);
    });
}

// Função para atualizar a aba de equipe
function updateTeamTab() {
    const teamList = document.getElementById('team-list');
    if (!teamList) return;
    
    // Limpar a lista
    teamList.innerHTML = '';
    
    // Adicionar cada membro à lista
    projectTeam.forEach(member => {
        const memberItem = document.createElement('div');
        memberItem.className = 'team-member';
        memberItem.innerHTML = `
            <div class="member-avatar">${member.avatar}</div>
            <div class="member-info">
                <div class="member-name">${member.name}</div>
                <div class="member-role">${member.role}</div>
            </div>
        `;
        
        teamList.appendChild(memberItem);
    });
}

// Função para atualizar a aba de cronograma
function updateTimelineTab() {
    const timelineContainer = document.getElementById('timeline-container');
    if (!timelineContainer) return;
    
    // Limpar o cronograma
    timelineContainer.innerHTML = '';
    
    // Adicionar cada marco ao cronograma
    projectTimeline.forEach(milestone => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-marker">
                <i class="fas fa-flag"></i>
            </div>
            <div class="timeline-content">
                <h4>${milestone.title}</h4>
                <p>${formatDate(milestone.date)}</p>
                <p>${milestone.description}</p>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Função para adicionar uma tarefa
function addTask() {
    // Em um ambiente real, mostraríamos um formulário
    // Aqui, vamos pedir as informações com prompt
    const taskName = prompt('Nome da tarefa:');
    if (!taskName || taskName.trim() === '') return;
    
    const assignee = prompt('Responsável:');
    if (!assignee || assignee.trim() === '') return;
    
    // Criar a nova tarefa
    const newTask = {
        id: projectTasks.length + 1,
        name: taskName.trim(),
        assignee: assignee.trim(),
        completed: false
    };
    
    // Adicionar à lista de tarefas
    projectTasks.push(newTask);
    
    // Atualizar a aba de tarefas
    updateTasksTab();
    
    // Mostrar notificação
    showNotification('Tarefa adicionada com sucesso!');
}

// Função para alternar a conclusão de uma tarefa
function toggleTaskCompletion(taskId) {
    // Encontrar a tarefa
    const task = projectTasks.find(t => t.id === taskId);
    if (task) {
        // Alternar o status de conclusão
        task.completed = !task.completed;
        
        // Em um ambiente real, faríamos uma requisição ao backend
        // Aqui, vamos apenas atualizar a interface
    }
}

// Função para adicionar um membro à equipe
function addTeamMember() {
    // Em um ambiente real, mostraríamos um formulário
    // Aqui, vamos pedir as informações com prompt
    const memberName = prompt('Nome do membro:');
    if (!memberName || memberName.trim() === '') return;
    
    const memberRole = prompt('Função:');
    if (!memberRole || memberRole.trim() === '') return;
    
    // Gerar iniciais para o avatar
    const initials = memberName.trim().split(' ').map(n => n[0]).join('').toUpperCase();
    
    // Criar o novo membro
    const newMember = {
        id: projectTeam.length + 1,
        name: memberName.trim(),
        role: memberRole.trim(),
        avatar: initials
    };
    
    // Adicionar à lista da equipe
    projectTeam.push(newMember);
    
    // Atualizar a aba de equipe
    updateTeamTab();
    
    // Mostrar notificação
    showNotification('Membro adicionado com sucesso!');
}

// Função para adicionar um marco ao cronograma
function addTimelineMilestone() {
    // Em um ambiente real, mostraríamos um formulário
    // Aqui, vamos pedir as informações com prompt
    const milestoneTitle = prompt('Título do marco:');
    if (!milestoneTitle || milestoneTitle.trim() === '') return;
    
    const milestoneDate = prompt('Data (AAAA-MM-DD):');
    if (!milestoneDate || milestoneDate.trim() === '') return;
    
    const milestoneDescription = prompt('Descrição:');
    if (!milestoneDescription || milestoneDescription.trim() === '') return;
    
    // Criar o novo marco
    const newMilestone = {
        id: projectTimeline.length + 1,
        title: milestoneTitle.trim(),
        date: milestoneDate.trim(),
        description: milestoneDescription.trim()
    };
    
    // Adicionar ao cronograma
    projectTimeline.push(newMilestone);
    
    // Ordenar o cronograma por data
    projectTimeline.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Atualizar a aba de cronograma
    updateTimelineTab();
    
    // Mostrar notificação
    showNotification('Marco adicionado com sucesso!');
}

// Inicializar o gerenciamento de projeto quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initProjectManagement);