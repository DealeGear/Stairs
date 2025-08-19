// Módulo de banco de dados IndexedDB
const db = {
    // Nome e versão do banco de dados
    dbName: 'stairsDB',
    dbVersion: 1,
    
    // Referência para o banco de dados
    db: null,
    
    // Inicializar o banco de dados
    init: function() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = (event) => {
                reject(new Error('Erro ao abrir o banco de dados: ' + event.target.error));
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Criar object store para projetos
                if (!db.objectStoreNames.contains('projects')) {
                    const projectsStore = db.createObjectStore('projects', { keyPath: 'id' });
                    projectsStore.createIndex('usuario', 'usuario', { unique: false });
                    projectsStore.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    },
    
    // Salvar um projeto
    saveProject: function(project) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Banco de dados não inicializado.'));
                return;
            }
            
            const transaction = this.db.transaction(['projects'], 'readwrite');
            const store = transaction.objectStore('projects');
            const request = store.put(project);
            
            request.onsuccess = () => {
                resolve(project);
            };
            
            request.onerror = (event) => {
                reject(new Error('Erro ao salvar projeto: ' + event.target.error));
            };
        });
    },
    
    // Obter um projeto pelo ID
    getProjectById: function(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Banco de dados não inicializado.'));
                return;
            }
            
            const transaction = this.db.transaction(['projects'], 'readonly');
            const store = transaction.objectStore('projects');
            const request = store.get(id);
            
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            
            request.onerror = (event) => {
                reject(new Error('Erro ao obter projeto: ' + event.target.error));
            };
        });
    },
    
    // Obter todos os projetos de um usuário
    getProjectsByUser: function(userId) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Banco de dados não inicializado.'));
                return;
            }
            
            const transaction = this.db.transaction(['projects'], 'readonly');
            const store = transaction.objectStore('projects');
            const index = store.index('usuario');
            const request = index.getAll(userId);
            
            request.onsuccess = (event) => {
                // Ordenar por timestamp (mais recentes primeiro)
                const projects = event.target.result.sort((a, b) => {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                });
                resolve(projects);
            };
            
            request.onerror = (event) => {
                reject(new Error('Erro ao obter projetos: ' + event.target.error));
            };
        });
    },
    
    // Excluir um projeto
    deleteProject: function(id) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject(new Error('Banco de dados não inicializado.'));
                return;
            }
            
            const transaction = this.db.transaction(['projects'], 'readwrite');
            const store = transaction.objectStore('projects');
            const request = store.delete(id);
            
            request.onsuccess = () => {
                resolve();
            };
            
            request.onerror = (event) => {
                reject(new Error('Erro ao excluir projeto: ' + event.target.error));
            };
        });
    }
};

// Inicializar o banco de dados quando o script for carregado
document.addEventListener('DOMContentLoaded', () => {
    db.init()
        .then(() => {
            console.log('Banco de dados inicializado com sucesso.');
        })
        .catch(error => {
            console.error('Erro ao inicializar banco de dados:', error);
        });
});