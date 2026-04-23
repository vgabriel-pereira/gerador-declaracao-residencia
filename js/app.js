// app.js - Aplicação principal

class DeclaracaoApp {
    constructor() {
        this.form = document.getElementById('declaracaoForm');
        this.generateBtn = document.getElementById('generatePdfBtn');
        this.previewBtn = document.getElementById('previewBtn');
        
        this.init();
    }

    init() {
        // Inicializa todos os serviços
        this.initServices();
        
        // Configura máscaras de input
        this.setupMasks();
        
        // Configura validações em tempo real
        this.setupValidations();
        
        // Configura data padrão (hoje)
        this.setupDefaultDate();
        
        // Monitora mudanças no formulário
        this.setupFormMonitoring();
    }

    initServices() {
        // Inicializa CEP Service
        if (typeof CEPService !== 'undefined') {
            CEPService.init();
        }

        // Inicializa Storage Service
        if (typeof StorageService !== 'undefined') {
            StorageService.init();
        }

        // Inicializa Signature Service
        if (typeof SignatureService !== 'undefined') {
            SignatureService.init();
        }

        // Inicializa PDF Service
        if (typeof PDFService !== 'undefined') {
            PDFService.init();
        }
    }

    setupMasks() {
        // Máscara de CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('input', (e) => {
                e.target.value = Masks.cpf(e.target.value);
            });
        }

        // Máscara de CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('input', (e) => {
                e.target.value = Masks.cep(e.target.value);
            });
        }
    }

    setupValidations() {
        // Validação de nome completo
        const nomeInput = document.getElementById('nomeCompleto');
        if (nomeInput) {
            nomeInput.addEventListener('blur', () => {
                this.validateField('nomeCompleto', Validators.validateNomeCompleto);
            });
        }

        // Validação de CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput) {
            cpfInput.addEventListener('blur', () => {
                this.validateField('cpf', Validators.validateCPF);
            });
        }

        // Validação de RG
        const rgInput = document.getElementById('rg');
        if (rgInput) {
            rgInput.addEventListener('blur', () => {
                this.validateField('rg', Validators.validateRG);
            });
        }

        // Validação de órgão expedidor
        const orgaoInput = document.getElementById('orgaoExpedidor');
        if (orgaoInput) {
            orgaoInput.addEventListener('blur', () => {
                this.validateField('orgaoExpedidor', Validators.validateOrgaoExpedidor);
            });
        }

        // Validação de CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('blur', () => {
                this.validateField('cep', Validators.validateCEP);
            });
        }

        // Validação de data
        const dataInput = document.getElementById('dataDeclaracao');
        if (dataInput) {
            dataInput.addEventListener('change', () => {
                this.validateField('dataDeclaracao', Validators.validateData);
            });
        }

        // Validações de campos obrigatórios
        const requiredFields = [
            'nacionalidade',
            'profissao',
            'estadoCivil',
            'logradouro',
            'bairro',
            'cidade',
            'estado',
            'localDeclaracao'
        ];

        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => {
                    this.validateRequired(fieldId);
                });
            }
        });
    }

    validateField(fieldId, validatorFn) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (!input || !errorElement) return false;

        const value = input.value;
        const result = validatorFn(value);

        if (result.valid) {
            input.classList.remove('error');
            input.classList.add('success');
            errorElement.textContent = '';
            
            // Remove classe success após 2 segundos
            setTimeout(() => {
                input.classList.remove('success');
            }, 2000);
        } else {
            input.classList.add('error');
            input.classList.remove('success');
            errorElement.textContent = result.message;
        }

        return result.valid;
    }

    validateRequired(fieldId) {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (!input) return false;

        const value = input.value;
        const result = Validators.validateRequired(value);

        if (errorElement) {
            if (result.valid) {
                input.classList.remove('error');
                errorElement.textContent = '';
            } else {
                input.classList.add('error');
                errorElement.textContent = result.message;
            }
        }

        return result.valid;
    }

    setupDefaultDate() {
        const dataInput = document.getElementById('dataDeclaracao');
        if (dataInput && !dataInput.value) {
            const hoje = new Date().toISOString().split('T')[0];
            dataInput.value = hoje;
        }
    }

    setupFormMonitoring() {
        // Monitora mudanças no formulário para habilitar/desabilitar botões
        if (this.form) {
            this.form.addEventListener('input', () => {
                this.updateButtonStates();
            });

            this.form.addEventListener('change', () => {
                this.updateButtonStates();
            });
        }

        // Submit do formulário
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSubmit();
            });
        }
    }

    updateButtonStates() {
        const isValid = this.isFormValid();
        
        if (this.generateBtn) {
            this.generateBtn.disabled = !isValid;
        }

        if (this.previewBtn) {
            this.previewBtn.disabled = !isValid;
        }
    }

    isFormValid() {
        // Verifica todos os campos obrigatórios
        const requiredFields = [
            'nomeCompleto',
            'cpf',
            'rg',
            'orgaoExpedidor',
            'nacionalidade',
            'profissao',
            'estadoCivil',
            'cep',
            'logradouro',
            'bairro',
            'cidade',
            'estado',
            'dataDeclaracao',
            'localDeclaracao'
        ];

        for (const fieldId of requiredFields) {
            const input = document.getElementById(fieldId);
            if (!input || !input.value.trim()) {
                return false;
            }
        }

        // Valida CPF
        const cpf = document.getElementById('cpf').value;
        const cpfValidation = Validators.validateCPF(cpf);
        if (!cpfValidation.valid) {
            return false;
        }

        // Valida CEP
        const cep = document.getElementById('cep').value;
        const cepValidation = Validators.validateCEP(cep);
        if (!cepValidation.valid) {
            return false;
        }

        // Valida nome completo
        const nome = document.getElementById('nomeCompleto').value;
        const nomeValidation = Validators.validateNomeCompleto(nome);
        if (!nomeValidation.valid) {
            return false;
        }

        // Valida data
        const data = document.getElementById('dataDeclaracao').value;
        const dataValidation = Validators.validateData(data);
        if (!dataValidation.valid) {
            return false;
        }

        return true;
    }

    async handleSubmit() {
        if (!this.isFormValid()) {
            if (StorageService) {
                StorageService.mostrarNotificacao('Por favor, preencha todos os campos obrigatórios corretamente', 'error');
            } else {
                alert('Por favor, preencha todos os campos obrigatórios corretamente');
            }
            return;
        }

        // Gera o PDF
        if (PDFService) {
            await PDFService.handleGerarPDF();
        }
    }

    // Método auxiliar para formatar texto
    formatText(text) {
        return text.trim().replace(/\s+/g, ' ');
    }
}

// Inicializa a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DeclaracaoApp();
    });
} else {
    new DeclaracaoApp();
}

// Previne perda de dados ao sair da página
window.addEventListener('beforeunload', (e) => {
    const form = document.getElementById('declaracaoForm');
    if (form) {
        const formData = new FormData(form);
        let hasData = false;
        
        for (let [key, value] of formData.entries()) {
            if (value.trim()) {
                hasData = true;
                break;
            }
        }
        
        if (hasData) {
            // Salva automaticamente antes de sair
            if (StorageService) {
                const dados = StorageService.coletarDadosFormulario();
                StorageService.salvarDados(dados);
            }
        }
    }
});

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DeclaracaoApp;
}