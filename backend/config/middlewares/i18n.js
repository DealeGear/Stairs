// Middleware para internacionalização
const i18nMiddleware = (req, res, next) => {
    // Obter o idioma do cabeçalho Accept-Language
    const acceptLanguage = req.headers['accept-language'];
    
    // Obter o idioma da query string
    const queryLanguage = req.query.lang;
    
    // Obter o idioma do corpo da requisição
    const bodyLanguage = req.body.language;
    
    // Determinar o idioma a ser usado
    let language = 'pt'; // Padrão
    
    if (bodyLanguage && ['pt', 'en', 'es'].includes(bodyLanguage)) {
        language = bodyLanguage;
    } else if (queryLanguage && ['pt', 'en', 'es'].includes(queryLanguage)) {
        language = queryLanguage;
    } else if (acceptLanguage) {
        // Extrair o idioma principal do cabeçalho Accept-Language
        const primaryLanguage = acceptLanguage.split(',')[0].split('-')[0];
        
        if (['pt', 'en', 'es'].includes(primaryLanguage)) {
            language = primaryLanguage;
        }
    }
    
    // Adicionar o idioma à requisição
    req.language = language;
    
    // Função para traduzir mensagens de resposta
    res.translate = (key, replacements = {}) => {
        // Obter as traduções
        const translations = {
            pt: {
                'auth.invalidCredentials': 'Credenciais inválidas',
                'auth.userAlreadyExists': 'Usuário já existe',
                'auth.userNotFound': 'Usuário não encontrado',
                'auth.invalidToken': 'Token inválido ou expirado',
                'auth.passwordResetSuccess': 'Senha redefinida com sucesso',
                'auth.passwordResetEmailSent': 'Email de redefinição enviado',
                'project.notFound': 'Projeto não encontrado',
                'project.created': 'Projeto criado com sucesso',
                'project.updated': 'Projeto atualizado com sucesso',
                'project.deleted': 'Projeto excluído com sucesso',
                'project.shared': 'Projeto compartilhado com sucesso',
                'template.notFound': 'Template não encontrado',
                'template.created': 'Template criado com sucesso',
                'template.updated': 'Template atualizado com sucesso',
                'template.deleted': 'Template excluído com sucesso',
                'server.error': 'Erro no servidor'
            },
            en: {
                'auth.invalidCredentials': 'Invalid credentials',
                'auth.userAlreadyExists': 'User already exists',
                'auth.userNotFound': 'User not found',
                'auth.invalidToken': 'Invalid or expired token',
                'auth.passwordResetSuccess': 'Password reset successfully',
                'auth.passwordResetEmailSent': 'Password reset email sent',
                'project.notFound': 'Project not found',
                'project.created': 'Project created successfully',
                'project.updated': 'Project updated successfully',
                'project.deleted': 'Project deleted successfully',
                'project.shared': 'Project shared successfully',
                'template.notFound': 'Template not found',
                'template.created': 'Template created successfully',
                'template.updated': 'Template updated successfully',
                'template.deleted': 'Template deleted successfully',
                'server.error': 'Server error'
            },
            es: {
                'auth.invalidCredentials': 'Credenciales inválidas',
                'auth.userAlreadyExists': 'El usuario ya existe',
                'auth.userNotFound': 'Usuario no encontrado',
                'auth.invalidToken': 'Token inválido o expirado',
                'auth.passwordResetSuccess': 'Contraseña restablecida con éxito',
                'auth.passwordResetEmailSent': 'Email de restablecimiento enviado',
                'project.notFound': 'Proyecto no encontrado',
                'project.created': 'Proyecto creado con éxito',
                'project.updated': 'Proyecto actualizado con éxito',
                'project.deleted': 'Proyecto eliminado con éxito',
                'project.shared': 'Proyecto compartido con éxito',
                'template.notFound': 'Plantilla no encontrada',
                'template.created': 'Plantilla creada con éxito',
                'template.updated': 'Plantilla actualizada con éxito',
                'template.deleted': 'Plantilla eliminada con éxito',
                'server.error': 'Error del servidor'
            }
        };
        
        // Obter a tradução
        let translation = translations[language][key] || translations.pt[key] || key;
        
        // Substituir os placeholders
        Object.keys(replacements).forEach(placeholder => {
            translation = translation.replace(`{{${placeholder}}}`, replacements[placeholder]);
        });
        
        return translation;
    };
    
    next();
};

module.exports = i18nMiddleware;