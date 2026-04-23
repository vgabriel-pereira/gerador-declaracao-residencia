# 🚀 Guia de Início Rápido

## Como Executar Localmente

### Opção 1: Abrir diretamente no navegador

1. Navegue até a pasta do projeto
2. Dê um duplo clique no arquivo `index.html`
3. A aplicação abrirá no seu navegador padrão

### Opção 2: Usar servidor local (recomendado)

**Com Python 3:**
```bash
cd declaracao-residencia
python -m http.server 8000
```
Acesse: http://localhost:8000

**Com Node.js:**
```bash
cd declaracao-residencia
npx http-server
```
Acesse: http://localhost:8080

**Com PHP:**
```bash
cd declaracao-residencia
php -S localhost:8000
```
Acesse: http://localhost:8000

## Como Publicar no GitHub Pages

### Passo a Passo

1. **Crie um repositório no GitHub**
   - Vá para https://github.com/new
   - Nome: `declaracao-residencia`
   - Público ou Privado
   - Não inicialize com README

2. **Suba os arquivos**
   ```bash
   cd declaracao-residencia
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/declaracao-residencia.git
   git push -u origin main
   ```

3. **Ative o GitHub Pages**
   - Vá em Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Clique em Save

4. **Acesse sua aplicação**
   - Aguarde 2-5 minutos
   - Acesse: https://SEU-USUARIO.github.io/declaracao-residencia

## Estrutura de Arquivos

```
declaracao-residencia/
│
├── index.html              # Página principal
│
├── css/
│   └── styles.css         # Todos os estilos
│
├── js/
│   ├── app.js            # Coordenador principal
│   ├── validators.js     # Validações (CPF, CEP, etc)
│   ├── cep.js            # Busca automática de endereço
│   ├── storage.js        # Salvar/carregar dados
│   ├── signature.js      # Assinatura digital
│   └── pdf.js            # Geração de PDF
│
├── README.md              # Documentação completa
├── LICENSE                # Licença MIT
└── .gitignore            # Arquivos ignorados pelo Git
```

## Testando a Aplicação

### 1. Dados de Teste

Use estes dados para testar:

**Dados Pessoais:**
- Nome: João da Silva Santos
- CPF: 123.456.789-09 (formato válido para teste)
- RG: 123.456
- Órgão: SSP/DF
- Nacionalidade: brasileiro
- Profissão: Desenvolvedor
- Estado Civil: Solteiro

**Endereço:**
- CEP: 70040-020 (Brasília/DF)
- Clique em "Buscar" para preencher automaticamente
- Número: 100
- Complemento: Apt 101

**Data:**
- Use a data de hoje (já preenchida)

### 2. Funcionalidades para Testar

✅ Validação de CPF (tente um CPF inválido)
✅ Busca automática de CEP
✅ Máscaras nos campos (CPF, CEP)
✅ Validação em tempo real
✅ Assinatura com mouse/touch
✅ Prévia da declaração
✅ Geração de PDF
✅ Salvar/Carregar dados
✅ Responsividade (teste em mobile)

### 3. CPFs Válidos para Teste

Estes CPFs têm formato válido (apenas para teste):
- 123.456.789-09
- 111.444.777-35
- 111.222.333-96

⚠️ Não use CPFs reais de outras pessoas!

## Personalização

### Alterar Cores

Edite as variáveis CSS em `css/styles.css`:

```css
:root {
    --primary-color: #2563eb;     /* Cor principal */
    --primary-hover: #1d4ed8;     /* Hover */
    --error-color: #ef4444;       /* Erros */
    --success-color: #10b981;     /* Sucesso */
}
```

### Alterar Texto do Rodapé

Edite em `index.html` na seção `<footer>`.

### Adicionar Logo

1. Adicione sua logo em `assets/logo.png`
2. No `index.html`, adicione antes do `<h1>`:
   ```html
   <img src="assets/logo.png" alt="Logo" style="max-width: 150px;">
   ```

## Solução de Problemas

### PDF não está gerando

- Verifique se está usando um servidor local (não file://)
- Verifique o console do navegador (F12)
- Certifique-se que todos os campos obrigatórios estão preenchidos

### CEP não está buscando

- Verifique sua conexão com internet
- API ViaCEP pode estar temporariamente indisponível
- Preencha manualmente se necessário

### Assinatura não funciona em mobile

- Certifique-se que está tocando dentro do canvas
- Limpe e tente novamente
- Alguns navegadores podem ter restrições

### Dados não estão sendo salvos

- Verifique se o localStorage está habilitado no navegador
- Modo anônimo/privado pode desabilitar localStorage
- Limpe o cache e tente novamente

## Próximos Passos

1. ⭐ Personalize as cores e textos
2. 📸 Adicione screenshots ao README
3. 🚀 Publique no GitHub Pages
4. 📱 Teste em diferentes dispositivos
5. 🎨 Adicione sua logo
6. 📧 Configure informações de contato

## Recursos Úteis

- 📚 [Documentação completa](README.md)
- 🐛 [Reportar bugs](https://github.com/SEU-USUARIO/declaracao-residencia/issues)
- 💬 [Comunidade](https://github.com/SEU-USUARIO/declaracao-residencia/discussions)

---

💡 **Dica:** Mantenha uma cópia local do projeto como backup!