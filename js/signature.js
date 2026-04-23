// signature.js - Assinatura digital com canvas

const SignatureService = {
    canvas: null,
    ctx: null,
    isDrawing: false,
    hasSignature: false,
    lastX: 0,
    lastY: 0,

    // Inicializa o canvas de assinatura
    init() {
        this.canvas = document.getElementById('signatureCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.setupEventListeners();
    },

    // Configura o canvas
    setupCanvas() {
        // Define o tamanho do canvas
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        // Ajusta o tamanho baseado no container
        this.canvas.width = rect.width - 32; // 32px de padding
        this.canvas.height = 200;

        // Configurações de desenho
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
    },

    // Configura event listeners
    setupEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());

        // Touch events para mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            this.canvas.dispatchEvent(mouseEvent);
        });

        // Botão de limpar
        const clearBtn = document.getElementById('clearSignatureBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clear());
        }

        // Redimensiona canvas ao redimensionar janela
        window.addEventListener('resize', () => {
            if (this.hasSignature) {
                // Salva a assinatura antes de redimensionar
                const imageData = this.canvas.toDataURL();
                this.setupCanvas();
                
                // Restaura a assinatura
                const img = new Image();
                img.onload = () => {
                    this.ctx.drawImage(img, 0, 0);
                };
                img.src = imageData;
            } else {
                this.setupCanvas();
            }
        });
    },

    // Obtém posição do mouse/touch relativa ao canvas
    getPosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    },

    // Inicia o desenho
    startDrawing(e) {
        this.isDrawing = true;
        const pos = this.getPosition(e);
        this.lastX = pos.x;
        this.lastY = pos.y;
    },

    // Desenha no canvas
    draw(e) {
        if (!this.isDrawing) return;

        const pos = this.getPosition(e);

        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();

        this.lastX = pos.x;
        this.lastY = pos.y;
        this.hasSignature = true;
    },

    // Para o desenho
    stopDrawing() {
        this.isDrawing = false;
    },

    // Limpa o canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.hasSignature = false;
    },

    // Verifica se há assinatura
    hasData() {
        return this.hasSignature;
    },

    // Obtém a assinatura como imagem base64
    getSignatureData() {
        if (!this.hasSignature) return null;
        
        // Cria um canvas temporário com fundo branco
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        // Preenche com branco
        tempCtx.fillStyle = '#ffffff';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        // Desenha a assinatura por cima
        tempCtx.drawImage(this.canvas, 0, 0);
        
        return tempCanvas.toDataURL('image/png');
    },

    // Carrega assinatura de dados base64
    loadSignatureData(dataUrl) {
        if (!dataUrl) return;

        const img = new Image();
        img.onload = () => {
            this.clear();
            this.ctx.drawImage(img, 0, 0);
            this.hasSignature = true;
        };
        img.src = dataUrl;
    }
};

// Exporta para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SignatureService;
}