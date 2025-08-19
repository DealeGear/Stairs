// Módulo para integração com IA (mock)
const ai = {
    // Prompts para crítica de projeto
    critiquePrompts: [
        "Analise a clareza da definição do problema e sugira melhorias.",
        "Avalie se a solução proposta é viável e inovadora.",
        "Verifique se o público-alvo está bem definido.",
        "Analise a proposta de valor e sua diferenciação no mercado.",
        "Avalie o modelo de negócio em termos de sustentabilidade.",
        "Verifique se os recursos necessários são realistas.",
        "Analise a estrutura da equipe proposta.",
        "Avalie o plano de ação em termos de prazo e prioridades.",
        "Verifique se o método de validação é adequado.",
        "Analise os próximos passos e sua alinhamento com os objetivos."
    ],
    
    // Gerar hipótese (landing page ou postagem)
    generateHypothesis: function(projectId, outputType) {
        return new Promise((resolve, reject) => {
            // Obter projeto do banco de dados
            db.getProjectById(projectId)
                .then(project => {
                    // Simular delay de processamento
                    setTimeout(() => {
                        try {
                            let result = '';
                            
                            if (outputType === 'landing') {
                                result = this.generateLandingPage(project);
                            } else {
                                result = this.generateSocialMediaPost(project);
                            }
                            
                            resolve(result);
                        } catch (error) {
                            reject(error);
                        }
                    }, 1500);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    
    // Gerar landing page
    generateLandingPage: function(project) {
        const problemStep = project.passos.find(s => s.id === 1);
        const solutionStep = project.passos.find(s => s.id === 2);
        const valueStep = project.passos.find(s => s.id === 4);
        
        const problem = problemStep ? problemStep.textoUsuario || problemStep.textoGuia : '';
        const solution = solutionStep ? solutionStep.textoUsuario || solutionStep.textoGuia : '';
        const value = valueStep ? valueStep.textoUsuario || valueStep.textoGuia : '';
        
        return `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.nome}</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.6;
        }
        .container {
            width: 80%;
            margin: 0 auto;
            padding: 2rem 0;
        }
        header {
            text-align: center;
            padding: 4rem 0;
            background: linear-gradient(135deg, #6366f1, #818cf8);
            color: white;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        .subtitle {
            font-size: 1.2rem;
            max-width: 600px;
            margin: 0 auto;
        }
        .problem, .solution, .value {
            margin: 3rem 0;
            padding: 2rem;
            border-radius: 8px;
            background-color: #f9fafb;
        }
        h2 {
            color: #6366f1;
            margin-bottom: 1rem;
        }
        .cta {
            text-align: center;
            margin: 3rem 0;
        }
        .cta button {
            background-color: #6366f1;
            color: white;
            border: none;
            padding: 1rem 2rem;
            font-size: 1.1rem;
            border-radius: 4px;
            cursor: pointer;
        }
        footer {
            text-align: center;
            padding: 2rem 0;
            background-color: #f3f4f6;
            margin-top: 3rem;
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>${project.nome}</h1>
            <p class="subtitle">${value}</p>
        </div>
    </header>
    
    <div class="container">
        <section class="problem">
            <h2>O Problema</h2>
            <p>${problem}</p>
        </section>
        
        <section class="solution">
            <h2>Nossa Solução</h2>
            <p>${solution}</p>
        </section>
        
        <div class="cta">
            <button>Quero Saber Mais</button>
        </div>
    </div>
    
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${project.nome}. Todos os direitos reservados.</p>
        </div>
    </footer>
</body>
</html>`;
    },
    
    // Gerar postagem para redes sociais
    generateSocialMediaPost: function(project) {
        const problemStep = project.passos.find(s => s.id === 1);
        const solutionStep = project.passos.find(s => s.id === 2);
        const valueStep = project.passos.find(s => s.id === 4);
        
        const problem = problemStep ? problemStep.textoUsuario || problemStep.textoGuia : '';
        const solution = solutionStep ? solutionStep.textoUsuario || solutionStep.textoGuia : '';
        const value = valueStep ? valueStep.textoUsuario || valueStep.textoGuia : '';
        
        return `🚀 APRESENTAMOS: ${project.nome.toUpperCase()} 🚀

Você já enfrentou o problema de "${problem.substring(0, 50)}${problem.length > 50 ? '...' : ''}"? 

Nós temos a solução! Com ${project.nome.toLowerCase()}, você pode ${solution.substring(0, 80)}${solution.length > 80 ? '...' : ''}.

✨ ${value} ✨

Não perca tempo! Junte-se a nós e transforme sua maneira de ${problem.split(' ').slice(-2).join(' ')}.

👉 Comente abaixo ou envie uma mensagem direta para saber mais!

#inovação #solução #tecnologia #${project.nome.replace(/\s+/g, '').toLowerCase()}`;
    },
    
    // Gerar crítica de projeto
    generateCritique: function(projectId) {
        return new Promise((resolve, reject) => {
            // Obter projeto do banco de dados
            db.getProjectById(projectId)
                .then(project => {
                    // Simular delay de processamento
                    setTimeout(() => {
                        try {
                            let critique = `ANÁLISE CRÍTICA DO PROJETO: ${project.nome}\n`;
                            critique += `Nível de Investimento: ${project.nivelInvestimento}\n\n`;
                            
                            // Aplicar cada prompt de crítica
                            this.critiquePrompts.forEach((prompt, index) => {
                                critique += `${index + 1}. ${prompt}\n`;
                                critique += this.generateCritiqueForStep(project, index + 1);
                                critique += "\n\n";
                            });
                            
                            // Adicionar recomendações gerais
                            critique += "RECOMENDAÇÕES GERAIS:\n";
                            critique += this.generateGeneralRecommendations(project);
                            
                            resolve(critique);
                        } catch (error) {
                            reject(error);
                        }
                    }, 2000);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    
    // Gerar crítica para um passo específico
    generateCritiqueForStep: function(project, stepId) {
        const step = project.passos.find(s => s.id === stepId);
        if (!step || !step.textoUsuario || step.textoUsuario.trim() === '') {
            return "⚠️ Passo não preenchido. Recomendamos detalhar esta etapa para maior clareza do projeto.";
        }
        
        // Análise simulada com base no nível de investimento
        const level = project.nivelInvestimento;
        let analysis = "";
        
        switch (stepId) {
            case 1: // Definição do Problema
                if (level === "Baixo") {
                    analysis = "✅ A definição do problema está clara, mas poderia beneficiar-se de dados concretos para validar sua relevância.";
                } else if (level === "Médio") {
                    analysis = "✅ Bom trabalho na identificação do problema com dados básicos. Considere aprofundar com métricas específicas.";
                } else {
                    analysis = "✅ Excelente pesquisa aprofundada! Verifique se todas as estatísticas são de fontes confiáveis e atualizadas.";
                }
                break;
                
            case 2: // Solução Proposta
                if (level === "Baixo") {
                    analysis = "✅ A solução está bem descrita, mas recomendamos detalhar as funcionalidades principais.";
                } else if (level === "Médio") {
                    analysis = "✅ Boa estruturação das funcionalidades. Considere incluir um comparativo com soluções existentes.";
                } else {
                    analysis = "✅ Ótima modelagem da solução! Verifique se a documentação técnica está completa e se os protótipos foram validados.";
                }
                break;
                
            // Adicionar casos para os outros passos...
            default:
                analysis = "✅ Passo bem desenvolvido. Considere revisar para garantir clareza e objetividade.";
        }
        
        return analysis;
    },
    
    // Gerar recomendações gerais
    generateGeneralRecommendations: function(project) {
        const level = project.nivelInvestimento;
        let recommendations = "";
        
        if (level === "Baixo") {
            recommendations = "1. Considere evoluir para um nível de investimento médio para maior detalhamento do projeto.\n";
            recommendations += "2. Busque feedback de potenciais usuários para validar suas hipóteses.\n";
            recommendations += "3. Desenvolva um protótipo simples para testar a aceitação da solução.";
        } else if (level === "Médio") {
            recommendations = "1. Para um projeto mais robusto, considere avançar para o nível de investimento alto.\n";
            recommendations += "2. Realize pesquisas de mercado mais aprofundadas.\n";
            recommendations += "3. Elabore um plano financeiro mais detalhado com projeções realistas.";
        } else {
            recommendations = "1. Parabéns pelo nível de detalhamento! Considere buscar investidores ou parceiros estratégicos.\n";
            recommendations += "2. Desenvolva um plano de validação com métricas claras de sucesso.\n";
            recommendations += "3. Prepare-se para ajustes iterativos com base no feedback do mercado.";
        }
        
        return recommendations;
    }
};