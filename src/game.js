/**
 * =============================================================================
 * FLAPPY BIRD - LÓGICA DO JOGO
 * Sistema de jogo modularizado e organizado em classes
 * =============================================================================
 */

/**
 * Configurações globais do jogo
 */
const GAME_CONFIG = {
    CONTAINER_WIDTH: 400,
    CONTAINER_HEIGHT: 600,
    BIRD_SIZE: 30,
    PIPE_WIDTH: 60,
    JUMP_FORCE: -8,
    FPS: 16, // ~60fps
    FIRST_PIPE_DELAY: 1000
};

/**
 * Configurações de dificuldade por nível
 * Cada nível aumenta a dificuldade progressivamente
 */
const DIFFICULTY_LEVELS = {
    1: { name: 'Iniciante', gap: 250, speed: 1.5, spawnRate: 2000, gravity: 0.35 },
    2: { name: 'Fácil', gap: 230, speed: 2, spawnRate: 1800, gravity: 0.4 },
    3: { name: 'Normal', gap: 210, speed: 2.5, spawnRate: 1600, gravity: 0.45 },
    4: { name: 'Intermediário', gap: 190, speed: 3, spawnRate: 1400, gravity: 0.5 },
    5: { name: 'Difícil', gap: 170, speed: 3.5, spawnRate: 1200, gravity: 0.55 },
    6: { name: 'Expert', gap: 150, speed: 4, spawnRate: 1000, gravity: 0.6 },
    7: { name: 'Mestre', gap: 140, speed: 4.5, spawnRate: 900, gravity: 0.65 },
    8: { name: 'Lenda', gap: 130, speed: 5, spawnRate: 800, gravity: 0.7 },
    9: { name: 'Impossível', gap: 120, speed: 5.5, spawnRate: 700, gravity: 0.75 },
    10: { name: 'INSANO!', gap: 110, speed: 6, spawnRate: 600, gravity: 0.8 }
};

/**
 * =============================================================================
 * CLASSE BIRD - Gerencia o pássaro do jogo
 * =============================================================================
 */
class Bird {
    constructor(element) {
        this.element = element;
        this.reset();
    }

    /**
     * Reseta a posição e estado do pássaro
     */
    reset() {
        this.y = 250;
        this.velocity = 0;
        this.element.style.left = '50px';
        this.updatePosition();
        this.element.style.transform = 'rotate(0deg)';
    }

    /**
     * Faz o pássaro pular
     */
    jump() {
        this.velocity = GAME_CONFIG.JUMP_FORCE;
        this.element.style.transform = 'rotate(-20deg)';
        
        // Retorna à rotação normal após um tempo
        setTimeout(() => {
            if (game.isRunning) {
                this.element.style.transform = 'rotate(0deg)';
            }
        }, 100);
    }

    /**
     * Atualiza a física do pássaro
     */
    update(gravity) {
        // Aplica gravidade
        this.velocity += gravity;
        this.y += this.velocity;
        
        // Rotaciona o pássaro baseado na velocidade
        const rotation = Math.min(Math.max(this.velocity * 3, -30), 60);
        this.element.style.transform = `rotate(${rotation}deg)`;
        
        this.updatePosition();
    }

    /**
     * Atualiza a posição visual do pássaro
     */
    updatePosition() {
        this.element.style.top = this.y + 'px';
    }

    /**
     * Verifica se o pássaro saiu dos limites
     */
    isOutOfBounds() {
        return this.y < 0 || this.y > (GAME_CONFIG.CONTAINER_HEIGHT - GAME_CONFIG.BIRD_SIZE);
    }

    /**
     * Retorna o retângulo de colisão do pássaro
     */
    getCollisionRect() {
        return {
            left: 55,
            right: 75,
            top: this.y + 3,
            bottom: this.y + 27
        };
    }

    /**
     * Aplica animação de morte
     */
    die() {
        this.element.style.transform = 'rotate(90deg)';
    }
}

/**
 * =============================================================================
 * CLASSE PIPE - Gerencia um par de canos (superior e inferior)
 * =============================================================================
 */
class Pipe {
    constructor(container, gapTop, gapSize) {
        this.container = container;
        this.x = GAME_CONFIG.CONTAINER_WIDTH;
        this.scored = false;
        this.gapTop = gapTop;
        this.gapBottom = gapTop + gapSize;
        
        this.createElement();
    }

    /**
     * Cria os elementos HTML dos canos
     */
    createElement() {
        // Cano superior
        this.topElement = document.createElement('div');
        this.topElement.className = 'pipe pipe-top';
        this.topElement.style.left = this.x + 'px';
        this.topElement.style.height = this.gapTop + 'px';
        this.topElement.style.width = GAME_CONFIG.PIPE_WIDTH + 'px';
        
        // Cano inferior
        this.bottomElement = document.createElement('div');
        this.bottomElement.className = 'pipe pipe-bottom';
        this.bottomElement.style.left = this.x + 'px';
        this.bottomElement.style.height = (GAME_CONFIG.CONTAINER_HEIGHT - this.gapBottom) + 'px';
        this.bottomElement.style.width = GAME_CONFIG.PIPE_WIDTH + 'px';
        
        this.container.appendChild(this.topElement);
        this.container.appendChild(this.bottomElement);
    }

    /**
     * Atualiza a posição do cano
     */
    update(speed) {
        this.x -= speed;
        this.topElement.style.left = this.x + 'px';
        this.bottomElement.style.left = this.x + 'px';
    }

    /**
     * Verifica se o cano saiu da tela
     */
    isOffScreen() {
        return this.x + GAME_CONFIG.PIPE_WIDTH < 0;
    }

    /**
     * Verifica se o pássaro passou pelo cano (para pontuação)
     */
    hasBirdPassed() {
        return !this.scored && this.x + GAME_CONFIG.PIPE_WIDTH < 50;
    }

    /**
     * Marca como pontuado
     */
    markAsScored() {
        this.scored = true;
    }

    /**
     * Verifica colisão com o pássaro
     */
    checkCollision(birdRect) {
        const pipeLeft = this.x;
        const pipeRight = this.x + GAME_CONFIG.PIPE_WIDTH;
        
        // Verifica se o pássaro está na mesma posição horizontal do cano
        if (birdRect.right > pipeLeft && birdRect.left < pipeRight) {
            // Verifica colisão com cano superior ou inferior
            if (birdRect.top < this.gapTop || birdRect.bottom > this.gapBottom) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Remove os elementos do DOM
     */
    destroy() {
        if (this.topElement) {
            this.topElement.remove();
        }
        if (this.bottomElement) {
            this.bottomElement.remove();
        }
    }
}

/**
 * =============================================================================
 * CLASSE PIPEGENERATOR - Gerencia a criação e movimento dos canos
 * =============================================================================
 */
class PipeGenerator {
    constructor(container) {
        this.container = container;
        this.pipes = [];
        this.spawnTimer = null;
    }

    /**
     * Inicia a geração de canos
     */
    start(difficulty) {
        this.stop();
        this.spawnTimer = setInterval(() => {
            this.spawnPipe(difficulty);
        }, difficulty.spawnRate);
        
        // Gera primeiro cano com delay
        setTimeout(() => {
            this.spawnPipe(difficulty);
        }, GAME_CONFIG.FIRST_PIPE_DELAY);
    }

    /**
     * Para a geração de canos
     */
    stop() {
        if (this.spawnTimer) {
            clearInterval(this.spawnTimer);
            this.spawnTimer = null;
        }
    }

    /**
     * Cria um novo cano
     */
    spawnPipe(difficulty) {
        const gapTop = Math.random() * (400 - difficulty.gap) + 100;
        const pipe = new Pipe(this.container, gapTop, difficulty.gap);
        this.pipes.push(pipe);
    }

    /**
     * Atualiza todos os canos
     */
    update(difficulty) {
        for (let i = this.pipes.length - 1; i >= 0; i--) {
            const pipe = this.pipes[i];
            pipe.update(difficulty.speed);
            
            // Verifica se o pássaro passou pelo cano (pontuação)
            if (pipe.hasBirdPassed()) {
                pipe.markAsScored();
                game.addScore();
            }
            
            // Remove canos que saíram da tela
            if (pipe.isOffScreen()) {
                pipe.destroy();
                this.pipes.splice(i, 1);
            }
        }
    }

    /**
     * Verifica colisão com todos os canos
     */
    checkCollisions(birdRect) {
        for (let pipe of this.pipes) {
            if (pipe.checkCollision(birdRect)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Remove todos os canos
     */
    clear() {
        this.pipes.forEach(pipe => pipe.destroy());
        this.pipes = [];
    }

    /**
     * Reinicia o gerador com nova dificuldade
     */
    restart(difficulty) {
        this.start(difficulty);
    }
}

/**
 * =============================================================================
 * CLASSE GAMEMANAGER - Controla o estado geral do jogo
 * =============================================================================
 */
class GameManager {
    constructor() {
        this.isRunning = false;
        this.score = 0;
        this.level = 1;
        this.currentDifficulty = DIFFICULTY_LEVELS[1];
        this.gameLoop = null;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    /**
     * Inicializa referências dos elementos HTML
     */
    initializeElements() {
        this.bird = new Bird(document.getElementById('bird'));
        this.gameContainer = document.getElementById('gameContainer');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.difficultyElement = document.getElementById('difficulty');
        this.startScreen = document.getElementById('startScreen');
        this.gameOverScreen = document.getElementById('gameOver');
        
        this.pipeGenerator = new PipeGenerator(this.gameContainer);
    }

    /**
     * Configura os event listeners
     */
    setupEventListeners() {
        // Clique para pular
        this.gameContainer.addEventListener('click', () => this.handleJump());
        
        // Tecla espaço para pular
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleJump();
            }
        });
    }

    /**
     * Lida com o comando de pulo
     */
    handleJump() {
        if (this.isRunning) {
            this.bird.jump();
        }
    }

    /**
     * Inicia o jogo
     */
    start() {
        this.hideScreens();
        this.resetGameState();
        this.isRunning = true;
        
        // Inicia loops de jogo
        this.gameLoop = setInterval(() => this.update(), GAME_CONFIG.FPS);
        this.pipeGenerator.start(this.currentDifficulty);
        
        this.updateUI();
    }

    /**
     * Reseta o estado do jogo
     */
    resetGameState() {
        this.score = 0;
        this.level = 1;
        this.currentDifficulty = DIFFICULTY_LEVELS[1];
        this.bird.reset();
        this.pipeGenerator.clear();
    }

    /**
     * Loop principal de atualização do jogo
     */
    update() {
        if (!this.isRunning) return;
        
        // Atualiza física do pássaro
        this.bird.update(this.currentDifficulty.gravity);
        
        // Verifica limites da tela
        if (this.bird.isOutOfBounds()) {
            this.gameOver();
            return;
        }
        
        // Atualiza canos
        this.pipeGenerator.update(this.currentDifficulty);
        
        // Verifica colisões
        if (this.pipeGenerator.checkCollisions(this.bird.getCollisionRect())) {
            this.gameOver();
            return;
        }
    }

    /**
     * Adiciona pontuação
     */
    addScore() {
        this.score++;
        this.updateUI();
        this.checkLevelUp();
    }

    /**
     * Verifica se deve subir de nível
     */
    checkLevelUp() {
        const newLevel = Math.floor(this.score / 5) + 1;
        
        if (newLevel !== this.level && newLevel <= 10) {
            this.level = newLevel;
            this.currentDifficulty = DIFFICULTY_LEVELS[this.level];
            this.updateUI();
            
            // Reinicia geração de canos com nova dificuldade
            this.pipeGenerator.restart(this.currentDifficulty);
            
            // Feedback visual para level up
            this.showLevelUpEffect();
        }
    }

    /**
     * Mostra efeito visual de level up
     */
    showLevelUpEffect() {
        this.levelElement.style.color = '#ff4444';
        setTimeout(() => {
            this.levelElement.style.color = '#ffeb3b';
        }, 500);
    }

    /**
     * Atualiza a interface do usuário
     */
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = `Nível ${this.level}`;
        this.difficultyElement.textContent = this.currentDifficulty.name;
    }

    /**
     * Termina o jogo
     */
    gameOver() {
        this.isRunning = false;
        
        // Para todos os loops
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
        this.pipeGenerator.stop();
        
        // Aplica animação de morte no pássaro
        this.bird.die();
        
        // Mostra tela de game over
        this.showGameOverScreen();
    }

    /**
     * Mostra a tela de game over
     */
    showGameOverScreen() {
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        document.getElementById('finalDifficulty').textContent = this.currentDifficulty.name;
        this.gameOverScreen.style.display = 'block';
    }

    /**
     * Esconde todas as telas de menu
     */
    hideScreens() {
        this.startScreen.style.display = 'none';
        this.gameOverScreen.style.display = 'none';
    }

    /**
     * Reinicia o jogo
     */
    restart() {
        this.pipeGenerator.clear();
        this.start();
    }
}

/**
 * =============================================================================
 * INICIALIZAÇÃO DO JOGO
 * =============================================================================
 */

// Instância global do gerenciador de jogo
let game;

/**
 * Inicializa o jogo quando a página carrega
 */
function initGame() {
    game = new GameManager();
}

/**
 * Funções globais para os botões (compatibilidade com HTML)
 */
function startGame() {
    game.start();
}

function restartGame() {
    game.restart();
}

// Inicializa quando a página carregar
window.addEventListener('load', initGame);