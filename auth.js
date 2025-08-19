// Módulo de autenticação (mock para futura integração com backend)
const auth = {
    // Usuários mock para demonstração
    users: [
        {
            id: '1',
            name: 'Usuário Demo',
            email: 'demo@stairs.com',
            password: 'demo123'
        }
    ],
    
    // Função de login
    login: function(email, password) {
        return new Promise((resolve, reject) => {
            // Simular delay de rede
            setTimeout(() => {
                const user = this.users.find(u => u.email === email && u.password === password);
                
                if (user) {
                    // Retornar usuário sem senha
                    const { password, ...userWithoutPassword } = user;
                    resolve(userWithoutPassword);
                } else {
                    reject(new Error('E-mail ou senha incorretos.'));
                }
            }, 500);
        });
    },
    
    // Função de cadastro
    register: function(name, email, password) {
        return new Promise((resolve, reject) => {
            // Simular delay de rede
            setTimeout(() => {
                // Verificar se e-mail já está em uso
                const existingUser = this.users.find(u => u.email === email);
                
                if (existingUser) {
                    reject(new Error('Este e-mail já está em uso.'));
                    return;
                }
                
                // Criar novo usuário
                const newUser = {
                    id: generateUUID(),
                    name,
                    email,
                    password
                };
                
                // Adicionar à lista de usuários
                this.users.push(newUser);
                
                // Retornar usuário sem senha
                const { password: _, ...userWithoutPassword } = newUser;
                resolve(userWithoutPassword);
            }, 500);
        });
    },
    
    // Função de logout
    logout: function() {
        return new Promise((resolve) => {
            // Simular delay de rede
            setTimeout(() => {
                resolve();
            }, 300);
        });
    }
};

// Função auxiliar para gerar UUID
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}