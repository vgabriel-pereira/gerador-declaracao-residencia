// validators.js - Validações de formulário

const Validators = {
    // Valida nome completo (mínimo 2 palavras)
    validateNomeCompleto(nome) {
        const trimmed = nome.trim();
        const words = trimmed.split(/\s+/).filter(word => word.length > 0);
        
        if (words.length < 2) {
            return { valid: false, message: 'Digite nome e sobrenome' };
        }
        
        if (trimmed.length < 5) {
            return { valid: false, message: 'Nome muito curto' };
        }
        
        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)) {
            return { valid: false, message: 'Use apenas letras' };
        }
        
        return { valid: true, message: '' };
    },

    // Valida CPF com algoritmo oficial
    validateCPF(cpf) {
        // Remove caracteres não numéricos
        const cleanCPF = cpf.replace(/\D/g, '');
        
        if (cleanCPF.length !== 11) {
            return { valid: false, message: 'CPF deve ter 11 dígitos' };
        }
        
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cleanCPF)) {
            return { valid: false, message: 'CPF inválido' };
        }
        
        // Validação dos dígitos verificadores
        let sum = 0;
        let remainder;
        
        // Valida primeiro dígito
        for (let i = 1; i <= 9; i++) {
            sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
        }
        
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
            return { valid: false, message: 'CPF inválido' };
        }
        
        // Valida segundo dígito
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
        }
        
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
            return { valid: false, message: 'CPF inválido' };
        }
        
        return { valid: true, message: '' };
    },

    // Valida CEP
    validateCEP(cep) {
        const cleanCEP = cep.replace(/\D/g, '');
        
        if (cleanCEP.length !== 8) {
            return { valid: false, message: 'CEP deve ter 8 dígitos' };
        }
        
        return { valid: true, message: '' };
    },

    // Valida data
    validateData(data) {
        if (!data) {
            return { valid: false, message: 'Data obrigatória' };
        }
        
        const selectedDate = new Date(data + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate > today) {
            return { valid: false, message: 'Data não pode ser futura' };
        }
        
        // Verifica se a data não é muito antiga (mais de 100 anos)
        const oldestDate = new Date();
        oldestDate.setFullYear(oldestDate.getFullYear() - 100);
        
        if (selectedDate < oldestDate) {
            return { valid: false, message: 'Data muito antiga' };
        }
        
        return { valid: true, message: '' };
    },

    // Valida campo obrigatório
    validateRequired(value, fieldName = 'Campo') {
        const trimmed = String(value).trim();
        
        if (!trimmed) {
            return { valid: false, message: `${fieldName} obrigatório` };
        }
        
        return { valid: true, message: '' };
    },

    // Valida RG
    validateRG(rg) {
        const trimmed = rg.trim();
        
        if (trimmed.length < 4) {
            return { valid: false, message: 'RG muito curto' };
        }
        
        return { valid: true, message: '' };
    },

    // Valida órgão expedidor
    validateOrgaoExpedidor(orgao) {
        const trimmed = orgao.trim();
        
        if (trimmed.length < 3) {
            return { valid: false, message: 'Informe o órgão expedidor' };
        }
        
        return { valid: true, message: '' };
    }
};

// Máscaras de entrada
const Masks = {
    // Máscara de CPF
    cpf(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },

    // Máscara de CEP
    cep(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    },

    // Máscara de telefone
    phone(value) {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');
    }
};

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Validators, Masks };
}