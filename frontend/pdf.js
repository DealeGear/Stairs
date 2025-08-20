// Função para exportar o projeto para PDF
function exportToPDF() {
    if (!currentProject) {
        showNotification('Nenhum projeto selecionado.', 'error');
        return;
    }

    // Em um ambiente real, usaríamos uma biblioteca como jsPDF
    // Aqui, vamos simular a exportação
    simulateExportToPDF();
}

// Função para simular a exportação para PDF
function simulateExportToPDF() {
    // Simular a geração do PDF
    setTimeout(() => {
        // Criar um conteúdo de PDF simulado
        const pdfContent = generatePDFContent();
        
        // Criar um blob com o conteúdo
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        
        // Criar uma URL para o blob
        const url = URL.createObjectURL(blob);
        
        // Criar um link para download
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentProject.name.replace(/\s+/g, '_')}.pdf`;
        
        // Adicionar o link ao documento e clicar nele
        document.body.appendChild(a);
        a.click();
        
        // Remover o link
        document.body.removeChild(a);
        
        // Mostrar notificação
        showNotification('PDF exportado com sucesso!');
    }, 1000);
}

// Função para gerar o conteúdo do PDF
function generatePDFContent() {
    // Em um ambiente real, usaríamos uma biblioteca como jsPDF para gerar o PDF
    // Aqui, vamos apenas retornar um texto simples como exemplo
    let content = `Projeto: ${currentProject.name}\n\n`;
    
    currentProject.blocks.forEach(block => {
        content += `${block.title}\n`;
        content += `${block.guideText}\n\n`;
        content += `Anotações:\n${block.userText || '(Nenhuma anotação)'}\n\n`;
        content += '----------------------------------------\n\n';
    });
    
    return content;
}

// Configurar o evento de exportação para PDF
document.addEventListener('DOMContentLoaded', () => {
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', exportToPDF);
    }
});