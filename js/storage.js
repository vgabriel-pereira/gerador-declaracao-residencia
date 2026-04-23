// storage.js - Gerenciamento de armazenamento local

const StorageService = {
    STORAGE_KEY: 'declaracao_residencia_dados',
    
    // Salva dados no localStorage
    salvarDados(dados) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dados));
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    },

    // Carrega dados do localStorage
    carregarDados() {
        try {
            const dados = localStorage.getItem(this.STORAGE_KEY);
            return dados ? JSON.parse(dados) : null;
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            return null;
        }
    },

    // Limpa dados do localStorage
    limparDados() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Erro ao limpar dados:', error);
            return false;
        }
    },

    // Coleta dados do formulário
    coletarDadosFormulario() {
        const form = document.getElementById('declaracaoForm');
        if (!form) return null;

        const formData = new FormData(form);
        const dados = {};

        for (let [key, value] of formData.entries()) {
            dados[key] = value;
        }

        return dados;
    },

    // Preenche formulário com dados salvos
    preencherFormulario(dados) {
        if (!dados) return;

        Object.keys(dados).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = dados[key];
                
                // Dispara evento de input para validações
                element.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    },

    // Salva dados automaticamente (debounced)
    autoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            const dados = this.coletarDadosFormulario();
            if (dados) {
                this.salvarDados(dados);
            }
        }, 1000); // Salva após 1 segundo de inatividade
    },

    // Inicializa o serviço de armazenamento
    init() {
        // Carrega dados salvos ao carregar a página
        const dadosSalvos = this.carregarDados();
        if (dadosSalvos) {
            this.preencherFormulario(dadosSalvos);
            this.mostrarNotificacao('Dados anteriores foram restaurados');
        }

        // Configura auto-save
        const form = document.getElementById('declaracaoForm');
        if (form) {
            form.addEventListener('input', () => {
                this.autoSave();
            });
        }

        // Botão de salvar
        const saveBtn = document.getElementById('saveDataBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                const dados = this.coletarDadosFormulario();
                if (dados) {
                    const sucesso = this.salvarDados(dados);
                    if (sucesso) {
                        this.mostrarNotificacao('Dados salvos com sucesso!', 'success');
                    } else {
                        this.mostrarNotificacao('Erro ao salvar dados', 'error');
                    }
                }
            });
        }

        // Botão de limpar
        const clearBtn = document.getElementById('clearDataBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('Tem certeza que deseja limpar todos os dados salvos?')) {
                    const sucesso = this.limparDados();
                    if (sucesso) {
                        form.reset();
                        
                        // Limpa a assinatura se existir
                        if (window.SignatureService) {
                            SignatureService.clear();
                        }
                        
                        this.mostrarNotificacao('Dados limpos com sucesso!', 'success');
                    } else {
                        this.mostrarNotificacao('Erro ao limpar dados', 'error');
                    }
                }
            });
        }
    },

    // Mostra notificação temporária
    mostrarNotificacao(mensagem, tipo = 'info') {
        // Remove notificação anterior se existir
        const notificacaoAnterior = document.querySelector('.notification');
        if (notificacaoAnterior) {
            notificacaoAnterior.remove();
        }

        // Cria nova notificação
        const notificacao = document.createElement('div');
        notificacao.className = `notification notification-${tipo}`;
        notificacao.textContent = mensagem;
        
        // Estilos inline para a notificação
        Object.assign(notificacao.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: tipo === 'success' ? '#10b981' : tipo === 'error' ? '#ef4444' : '#3b82f6',
            color: 'white',
            fontWeight: '500',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            zIndex: '9999',
            animation: 'slideInRight 0.3s ease',
            maxWidth: '300px'
        });

        document.body.appendChild(notificacao);

        // Remove após 3 segundos
        setTimeout(() => {
            notificacao.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notificacao.remove(), 300);
        }, 3000);
    }
};

// Adiciona animações CSS dinamicamente
if (!document.getElementById('storage-animations')) {
    const style = document.createElement('style');
    style.id = 'storage-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageService;
}