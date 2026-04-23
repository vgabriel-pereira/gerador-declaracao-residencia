# 📋 Gerador de Autodeclaração de Residência

Aplicação web moderna e totalmente gratuita para geração de declarações de residência em formato PDF. Funciona 100% no navegador, sem necessidade de backend ou cadastro.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/javascript-ES6+-yellow.svg)
![HTML5](https://img.shields.io/badge/html-5-orange.svg)
![CSS3](https://img.shields.io/badge/css-3-blue.svg)

## ✨ Características

- 🔒 **100% Privado** - Todos os dados são processados localmente no navegador
- 📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- 🎨 **Interface Moderna** - Design limpo e profissional
- ✅ **Validações Robustas** - CPF, CEP, datas e campos obrigatórios
- 🗺️ **Busca de CEP** - Preenchimento automático via API ViaCEP
- ✍️ **Assinatura Digital** - Assine com mouse ou touch (mobile)
- 💾 **Auto-Save** - Salva dados automaticamente no navegador
- 👁️ **Prévia** - Visualize antes de gerar o PDF
- 📄 **PDF Profissional** - Documento formatado e pronto para uso
- ⚡ **Sem Backend** - Hospedagem gratuita via GitHub Pages

## 🚀 Demo Online

🔗 **[Acesse a aplicação](https://seu-usuario.github.io/declaracao-residencia)**


## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Design responsivo com CSS Grid e Flexbox
- **JavaScript (ES6+)** - Lógica da aplicação
- **html2pdf.js** - Geração de PDFs
- **ViaCEP API** - Busca de endereços por CEP

## 📦 Estrutura do Projeto

```
declaracao-residencia/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos responsivos
├── js/
│   ├── app.js            # Aplicação principal
│   ├── validators.js     # Validações (CPF, CEP, etc)
│   ├── cep.js            # Integração ViaCEP
│   ├── storage.js        # LocalStorage
│   ├── signature.js      # Assinatura digital
│   └── pdf.js            # Geração de PDF
└── README.md             # Documentação
```

## 🎯 Funcionalidades Detalhadas

### Validações em Tempo Real

- **CPF**: Validação com algoritmo oficial dos dígitos verificadores
- **Nome**: Mínimo 2 palavras, apenas letras
- **CEP**: Formato 00000-000
- **Data**: Não pode ser futura
- **Campos obrigatórios**: Feedback visual imediato

### Busca Automática de CEP

- Integração com API pública ViaCEP
- Preenchimento automático de:
  - Logradouro
  - Bairro
  - Cidade
  - Estado
- Indicador de carregamento
- Tratamento de erros

### Assinatura Digital

- Canvas responsivo para desenho
- Suporte a mouse e touch
- Botão para limpar assinatura
- Conversão para imagem PNG
- Inserção automática no PDF

### Armazenamento Local

- **Auto-save**: Salva dados automaticamente
- **Recuperação**: Restaura dados ao recarregar página
- **Limpeza**: Botão para limpar todos os dados
- **Notificações**: Feedback visual das operações

### Geração de PDF

- Template profissional baseado no modelo oficial
- Formatação em Times New Roman
- Texto justificado
- Espaço para assinatura
- Nome do arquivo personalizado
- Download automático

## 🎨 Design Responsivo

A aplicação foi desenvolvida com mobile-first e se adapta perfeitamente a:

- 📱 **Mobile**: 320px - 768px
- 💻 **Tablet**: 768px - 1024px
- 🖥️ **Desktop**: 1024px+

## 🔧 Como Usar

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/declaracao-residencia.git
```

2. Navegue até a pasta:
```bash
cd declaracao-residencia
```

3. Abra o arquivo `index.html` no navegador ou use um servidor local:
```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (http-server)
npx http-server
```

4. Acesse no navegador:
```
http://localhost:8000
```

### Publicação no GitHub Pages

1. Faça upload dos arquivos para um repositório GitHub

2. Vá em **Settings** → **Pages**

3. Selecione a branch `main` e pasta `/ (root)`

4. Clique em **Save**

5. Aguarde alguns minutos e acesse:
```
https://seu-usuario.github.io/nome-do-repositorio
```

## 💡 Como Usar a Aplicação

1. **Preencha seus dados pessoais**
   - Nome completo
   - CPF (validado automaticamente)
   - RG e órgão expedidor
   - Nacionalidade, profissão e estado civil
   - Registro profissional (opcional)

2. **Informe seu endereço**
   - Digite o CEP e clique em "Buscar"
   - Os campos serão preenchidos automaticamente
   - Complete com número e complemento se necessário

3. **Defina data e local**
   - Selecione a data da declaração
   - Confirme o local (preenchido automaticamente)

4. **Assine digitalmente (opcional)**
   - Use o mouse ou toque na tela
   - Limpe e refaça se necessário

5. **Gere o PDF**
   - Clique em "Visualizar Prévia" para conferir
   - Clique em "Gerar PDF" para baixar

## ⚠️ Informações Importantes

### Validade Legal

- Esta declaração possui **valor declaratório**
- Não substitui documentos oficiais
- Lei nº 7.115/1983 e art. 299 do CP aplicam-se a declarações falsas

### Limitações

- ✅ Validação de CPF verifica apenas o formato (não autenticidade)
- ✅ Assinatura digital não possui certificação ICP-Brasil
- ✅ Busca de CEP requer conexão com internet
- ✅ Dados são processados localmente (não enviados a servidores)

### Privacidade

- 🔒 Nenhum dado é enviado para servidores
- 🔒 Tudo funciona no seu navegador
- 🔒 Dados salvos apenas no localStorage do navegador
- 🔒 Você pode limpar os dados a qualquer momento

## 🔐 Segurança

- Código 100% open source
- Sem dependências externas não confiáveis
- Sem rastreamento ou analytics
- Sem cookies ou tracking

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 🐛 Reportar Bugs

Encontrou um bug? Por favor, abra uma [issue](https://github.com/seu-usuario/declaracao-residencia/issues) com:

- Descrição do problema
- Passos para reproduzir
- Comportamento esperado
- Screenshots (se aplicável)
- Navegador e versão

## 📝 Roadmap

Funcionalidades planejadas para futuras versões:

- [ ] Múltiplos modelos de declaração
- [ ] Exportação para DOCX
- [ ] Modo offline (PWA)
- [ ] Suporte a múltiplos idiomas
- [ ] Temas (claro/escuro)
- [ ] Histórico de declarações
- [ ] Impressão direta (sem gerar PDF)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para ajudar pessoas a gerar declarações de forma rápida e segura.

## 🙏 Agradecimentos

- [ViaCEP](https://viacep.com.br/) - API gratuita de consulta de CEP
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) - Biblioteca de geração de PDF
- Comunidade open source

## 📞 Suporte

Precisa de ajuda? 

- 📧 Email: seu-email@exemplo.com
- 🐦 Twitter: @seu-usuario
- 💬 Issues: [GitHub Issues](https://github.com/seu-usuario/declaracao-residencia/issues)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!