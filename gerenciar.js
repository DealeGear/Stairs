// Módulo para gerenciamento de projetos
const gerenciar = {
    // Inicializar o módulo
    init: function() {
        // Este módulo é inicializado através de funções no script.js
        console.log("Módulo de gerenciamento de projetos carregado");
    },
    
    // Salvar tarefas administrativas
    saveAdministrativeTasks: function(projectId, tasks) {
        return new Promise((resolve, reject) => {
            // Obter projeto do banco de dados
            db.getProjectById(projectId)
                .then(project => {
                    // Atualizar tarefas administrativas
                    project.administrativeTasks = tasks;
                    
                    // Salvar projeto atualizado
                    return db.saveProject(project);
                })
                .then(updatedProject => {
                    resolve(updatedProject);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    
    // Obter tarefas administrativas
    getAdministrativeTasks: function(projectId) {
        return new Promise((resolve, reject) => {
            // Obter projeto do banco de dados
            db.getProjectById(projectId)
                .then(project => {
                    resolve(project.administrativeTasks || []);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
};

// Inicializar o módulo quando o script for carregado
document.addEventListener('DOMContentLoaded', () => {
    gerenciar.init();
});