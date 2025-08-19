// Módulo para exportação de PDF
const pdf = {
    // Exportar projeto para PDF
    exportProjectToPDF: function(project) {
        return new Promise((resolve, reject) => {
            try {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();
                
                // Configurações de estilo
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();
                const margin = 20;
                let yPosition = margin;
                
                // Adicionar título
                doc.setFontSize(24);
                doc.setFont('helvetica', 'bold');
                doc.text(project.nome, margin, yPosition);
                yPosition += 15;
                
                // Adicionar metadados
                doc.setFontSize(12);
                doc.setFont('helvetica', 'normal');
                doc.text(`Nível de Investimento: ${project.nivelInvestimento}`, margin, yPosition);
                yPosition += 10;
                
                const date = new Date(project.timestamp).toLocaleDateString('pt-BR');
                doc.text(`Data: ${date}`, margin, yPosition);
                yPosition += 20;
                
                // Adicionar passos
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text('Passos do Projeto', margin, yPosition);
                yPosition += 15;
                
                project.passos.forEach((step, index) => {
                    // Verificar se precisamos de uma nova página
                    if (yPosition > pageHeight - 40) {
                        doc.addPage();
                        yPosition = margin;
                    }
                    
                    // Título do passo
                    doc.setFontSize(14);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`${index + 1}. ${step.titulo}`, margin, yPosition);
                    yPosition += 10;
                    
                    // Texto guia
                    doc.setFontSize(10);
                    doc.setFont('helvetica', 'italic');
                    const guideLines = doc.splitTextToSize(`Guia: ${step.textoGuia}`, pageWidth - 2 * margin);
                    doc.text(guideLines, margin, yPosition);
                    yPosition += guideLines.length * 5 + 5;
                    
                    // Texto do usuário (se existir)
                    if (step.textoUsuario && step.textoUsuario.trim() !== '') {
                        doc.setFont('helvetica', 'normal');
                        const userLines = doc.splitTextToSize(`Anotações: ${step.textoUsuario}`, pageWidth - 2 * margin);
                        doc.text(userLines, margin, yPosition);
                        yPosition += userLines.length * 5 + 10;
                    } else {
                        yPosition += 5;
                    }
                });
                
                // Salvar o PDF
                doc.save(`${project.nome.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    }
};