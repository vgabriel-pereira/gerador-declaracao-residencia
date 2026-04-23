// cep.js - Integração com ViaCEP

const CEPService = {
    // Busca endereço pelo CEP
    async buscarCEP(cep) {
        const cleanCEP = cep.replace(/\D/g, '');
        
        if (cleanCEP.length !== 8) {
            throw new Error('CEP inválido');
        }
        
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
            
            if (!response.ok) {
                throw new Error('Erro ao buscar CEP');
            }
            
            const data = await response.json();
            
            if (data.erro) {
                throw new Error('CEP não encontrado');
            }
            
            return {
                logradouro: data.logradouro || '',
                bairro: data.bairro || '',
                cidade: data.localidade || '',
                estado: data.uf || '',
                complemento: data.complemento || ''
            };
        } catch (error) {
            if (error.message === 'CEP não encontrado') {
                throw error;
            }
            throw new Error('Erro ao buscar CEP. Verifique sua conexão.');
        }
    },

    // Preenche os campos do formulário com os dados do CEP
    preencherCampos(dados) {
        const campos = {
            logradouro: document.getElementById('logradouro'),
            bairro: document.getElementById('bairro'),
            cidade: document.getElementById('cidade'),
            estado: document.getElementById('estado'),
            complemento: document.getElementById('complemento')
        };
        
        // Preenche apenas campos vazios ou mantém o que o usuário já digitou
        if (dados.logradouro && !campos.logradouro.value) {
            campos.logradouro.value = dados.logradouro;
        }
        
        if (dados.bairro) {
            campos.bairro.value = dados.bairro;
        }
        
        if (dados.cidade) {
            campos.cidade.value = dados.cidade;
        }
        
        if (dados.estado) {
            campos.estado.value = dados.estado;
        }
        
        if (dados.complemento && !campos.complemento.value) {
            campos.complemento.value = dados.complemento;
        }
        
        // Atualiza o local da declaração automaticamente
        const localDeclaracao = document.getElementById('localDeclaracao');
        if (dados.cidade && dados.estado) {
            localDeclaracao.value = `${dados.cidade}/${dados.estado}`;
        }
        
        // Foca no campo de número se o logradouro foi preenchido
        if (dados.logradouro) {
            const numeroField = document.getElementById('numero');
            if (numeroField && !numeroField.value) {
                numeroField.focus();
            }
        }
    },

    // Inicializa os event listeners
    init() {
        const cepInput = document.getElementById('cep');
        const buscarBtn = document.getElementById('buscarCepBtn');
        const spinner = document.getElementById('cepSpinner');
        
        if (!cepInput || !buscarBtn) return;
        
        // Busca ao clicar no botão
        buscarBtn.addEventListener('click', async () => {
            await this.executarBusca(cepInput, buscarBtn, spinner);
        });
        
        // Busca ao pressionar Enter no campo de CEP
        cepInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                await this.executarBusca(cepInput, buscarBtn, spinner);
            }
        });
        
        // Busca automática quando o CEP estiver completo
        cepInput.addEventListener('input', async (e) => {
            const cep = e.target.value.replace(/\D/g, '');
            if (cep.length === 8) {
                // Aguarda um pequeno delay para o usuário terminar de digitar
                clearTimeout(this.autoSearchTimeout);
                this.autoSearchTimeout = setTimeout(async () => {
                    await this.executarBusca(cepInput, buscarBtn, spinner);
                }, 500);
            }
        });
    },

    // Executa a busca do CEP
    async executarBusca(cepInput, buscarBtn, spinner) {
        const cep = cepInput.value;
        const validation = Validators.validateCEP(cep);
        
        if (!validation.valid) {
            this.mostrarErro(validation.message);
            return;
        }
        
        // Desabilita campos durante a busca
        this.toggleCamposEndereco(true);
        buscarBtn.disabled = true;
        
        // Mostra spinner
        const btnText = buscarBtn.querySelector('.btn-text');
        if (btnText) btnText.style.display = 'none';
        if (spinner) spinner.classList.remove('hidden');
        
        try {
            const dados = await this.buscarCEP(cep);
            this.preencherCampos(dados);
            this.limparErro();
            
            // Feedback visual de sucesso
            cepInput.classList.remove('error');
            cepInput.classList.add('success');
            
            setTimeout(() => {
                cepInput.classList.remove('success');
            }, 2000);
        } catch (error) {
            this.mostrarErro(error.message);
            cepInput.classList.add('error');
        } finally {
            // Reabilita campos
            this.toggleCamposEndereco(false);
            buscarBtn.disabled = false;
            
            // Esconde spinner
            if (btnText) btnText.style.display = 'inline';
            if (spinner) spinner.classList.add('hidden');
        }
    },

    // Toggle dos campos de endereço
    toggleCamposEndereco(disabled) {
        const campos = ['logradouro', 'bairro', 'cidade', 'estado', 'complemento'];
        campos.forEach(id => {
            const campo = document.getElementById(id);
            if (campo) campo.disabled = disabled;
        });
    },

    // Mostra mensagem de erro
    mostrarErro(mensagem) {
        const errorElement = document.getElementById('cepError');
        if (errorElement) {
            errorElement.textContent = mensagem;
        }
    },

    // Limpa mensagem de erro
    limparErro() {
        const errorElement = document.getElementById('cepError');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }
};

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CEPService;
}