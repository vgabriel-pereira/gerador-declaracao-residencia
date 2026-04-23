// pdf.js - Geração de PDF usando jsPDF diretamente (sem html2canvas)

const PDFService = {

    gerarConteudoDeclaracao(dados, assinatura = null) {
        const registroProfissional = dados.registroProfissional
            ? `, com registro ${dados.registroProfissional}`
            : '';
        const numero = dados.numero ? `, nº ${dados.numero}` : '';
        const complemento = dados.complemento ? `, ${dados.complemento}` : '';
        const enderecoCompleto = `${dados.logradouro}${numero}${complemento}, ${dados.bairro}, ${dados.cidade}/${dados.estado}, CEP: ${dados.cep}`;
        const dataObj = new Date(dados.dataDeclaracao + 'T00:00:00');
        const dataFormatada = dataObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

        let assinaturaHTML = '';
        if (assinatura) {
            assinaturaHTML = `<div style="margin-top: 10px;"><img src="${assinatura}" style="max-width: 300px; height: auto;" alt="Assinatura" /></div>`;
        }

        return `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><style>
            @page { margin: 2cm; }
            body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.8; color: #000; max-width: 21cm; margin: 0 auto; padding: 20px; }
            h1 { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin-bottom: 40px; margin-top: 20px; }
            p { text-align: justify; margin-bottom: 20px; text-indent: 2cm; }
            .signature-section { margin-top: 60px; text-align: center; }
            .signature-line { border-top: 1px solid #000; width: 300px; margin: 40px auto 10px; }
            .signature-name { font-weight: bold; text-transform: uppercase; margin-bottom: 5px; }
            .signature-cpf { font-size: 11pt; }
            .data-local { margin-top: 40px; margin-bottom: 40px; }
            strong { font-weight: bold; }
        </style></head><body>
            <h1>Autodeclaração de Residência</h1>
            <p>Eu, <strong>${dados.nomeCompleto.toUpperCase()}</strong>, ${dados.nacionalidade}, ${dados.profissao}, ${dados.estadoCivil}, inscrito no RG nº ${dados.rg}, ${dados.orgaoExpedidor} e CPF nº ${dados.cpf}${registroProfissional}, declaro ser residente e domiciliado em ${enderecoCompleto}.</p>
            <p>Declaro ainda que as informações ora prestadas são verdadeiras, estando ciente das sanções civis, administrativas e criminais previstas na legislação aplicável (Lei nº 7.115, de 29 de agosto de 1983 e art. 299 do Código Penal Brasileiro).</p>
            <div class="data-local"><p style="text-indent: 0;">${dados.localDeclaracao}, ${dataFormatada}.</p></div>
            <div class="signature-section">${assinaturaHTML}<div class="signature-line"></div><div class="signature-name">${dados.nomeCompleto.toUpperCase()}</div><div class="signature-cpf">CPF nº ${dados.cpf}</div></div>
        </body></html>`;
    },

    mostrarPrevia(dados, assinatura = null) {
        const modal = document.getElementById('previewModal');
        const previewContent = document.getElementById('previewContent');
        if (!modal || !previewContent) return;
        const conteudo = this.gerarConteudoDeclaracao(dados, assinatura);
        const parser = new DOMParser();
        const doc = parser.parseFromString(conteudo, 'text/html');
        previewContent.innerHTML = doc.body.innerHTML;
        modal.classList.remove('hidden');
    },

    async gerarPDF(dados, assinatura = null) {
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

            const margem = 25;
            const larguraPagina = 210;
            const larguraUtil = larguraPagina - margem * 2;
            let y = margem;

            const registroProfissional = dados.registroProfissional ? `, com registro ${dados.registroProfissional}` : '';
            const numero = dados.numero ? `, nº ${dados.numero}` : '';
            const complemento = dados.complemento ? `, ${dados.complemento}` : '';
            const enderecoCompleto = `${dados.logradouro}${numero}${complemento}, ${dados.bairro}, ${dados.cidade}/${dados.estado}, CEP: ${dados.cep}`;
            const dataObj = new Date(dados.dataDeclaracao + 'T00:00:00');
            const dataFormatada = dataObj.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

            // Título
            doc.setFont('times', 'bold');
            doc.setFontSize(14);
            const titulo = 'AUTODECLARAÇÃO DE RESIDÊNCIA';
            doc.text(titulo, larguraPagina / 2, y, { align: 'center' });
            y += 18;

            // Parágrafo 1
            doc.setFont('times', 'normal');
            doc.setFontSize(12);
            const p1 = `    Eu, ${dados.nomeCompleto.toUpperCase()}, ${dados.nacionalidade}, ${dados.profissao}, ${dados.estadoCivil}, inscrito no RG nº ${dados.rg}, ${dados.orgaoExpedidor} e CPF nº ${dados.cpf}${registroProfissional}, declaro ser residente e domiciliado em ${enderecoCompleto}.`;
            const linhas1 = doc.splitTextToSize(p1, larguraUtil);
            doc.text(linhas1, margem, y, { align: 'justify', maxWidth: larguraUtil });
            y += linhas1.length * 7 + 6;

            // Parágrafo 2
            const p2 = `    Declaro ainda que as informações ora prestadas são verdadeiras, estando ciente das sanções civis, administrativas e criminais previstas na legislação aplicável (Lei nº 7.115, de 29 de agosto de 1983 e art. 299 do Código Penal Brasileiro).`;
            const linhas2 = doc.splitTextToSize(p2, larguraUtil);
            doc.text(linhas2, margem, y, { align: 'justify', maxWidth: larguraUtil });
            y += linhas2.length * 7 + 14;

            // Local e data
            doc.text(`${dados.localDeclaracao}, ${dataFormatada}.`, margem, y);
            y += 30;

            // Assinatura (imagem)
            if (assinatura) {
                try {
                    doc.addImage(assinatura, 'PNG', (larguraPagina - 60) / 2, y, 60, 20);
                    y += 22;
                } catch (e) { /* ignora */ }
            }

            // Linha de assinatura
            doc.setLineWidth(0.3);
            doc.line((larguraPagina - 70) / 2, y, (larguraPagina + 70) / 2, y);
            y += 6;

            // Nome
            doc.setFont('times', 'bold');
            doc.setFontSize(12);
            doc.text(dados.nomeCompleto.toUpperCase(), larguraPagina / 2, y, { align: 'center' });
            y += 6;

            // CPF
            doc.setFont('times', 'normal');
            doc.setFontSize(11);
            doc.text(`CPF nº ${dados.cpf}`, larguraPagina / 2, y, { align: 'center' });

            doc.save(`Declaracao_Residencia_${dados.nomeCompleto.replace(/\s+/g, '_')}.pdf`);
            return true;
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            throw new Error('Erro ao gerar PDF. Tente novamente.');
        }
    },

    init() {
        const previewBtn = document.getElementById('previewBtn');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                const dados = this.coletarDados();
                if (!dados) return;
                const assinatura = SignatureService.hasData() ? SignatureService.getSignatureData() : null;
                this.mostrarPrevia(dados, assinatura);
            });
        }

        const generateBtn = document.getElementById('generatePdfBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', async () => { await this.handleGerarPDF(); });
        }

        const generateFromPreviewBtn = document.getElementById('generateFromPreviewBtn');
        if (generateFromPreviewBtn) {
            generateFromPreviewBtn.addEventListener('click', async () => {
                document.getElementById('previewModal').classList.add('hidden');
                await this.handleGerarPDF();
            });
        }

        const modal = document.getElementById('previewModal');
        const closePreviewBtn = document.getElementById('closePreviewBtn');
        const closePreviewFooterBtn = document.getElementById('closePreviewFooterBtn');
        if (closePreviewBtn) closePreviewBtn.addEventListener('click', () => modal.classList.add('hidden'));
        if (closePreviewFooterBtn) closePreviewFooterBtn.addEventListener('click', () => modal.classList.add('hidden'));
        if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
    },

    async handleGerarPDF() {
        const dados = this.coletarDados();
        if (!dados) return;
        const generateBtn = document.getElementById('generatePdfBtn');
        const originalText = generateBtn.textContent;
        try {
            generateBtn.disabled = true;
            generateBtn.textContent = '⏳ Gerando PDF...';
            const assinatura = SignatureService.hasData() ? SignatureService.getSignatureData() : null;
            await this.gerarPDF(dados, assinatura);
            if (StorageService) StorageService.mostrarNotificacao('PDF gerado com sucesso!', 'success');
        } catch (error) {
            console.error('Erro:', error);
            if (StorageService) StorageService.mostrarNotificacao(error.message, 'error');
            else alert(error.message);
        } finally {
            generateBtn.disabled = false;
            generateBtn.textContent = originalText;
        }
    },

    coletarDados() {
        const form = document.getElementById('declaracaoForm');
        if (!form) return null;
        const formData = new FormData(form);
        const dados = {};
        for (let [key, value] of formData.entries()) { dados[key] = value; }
        return dados;
    }
};

if (typeof module !== 'undefined' && module.exports) { module.exports = PDFService; }
