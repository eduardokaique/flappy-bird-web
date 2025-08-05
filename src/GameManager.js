/**
 * =============================================================================
 * CLASSE GAMEMANAGER - Controla o estado geral do jogo
 * Módulo principal que coordena todos os outros componentes
 * =============================================================================
 */

import { GAME_CONFIG, DIFFICULTY_LEVELS, UI_CONFIG } from './config.js';
import { Bird } from './Bird.js';
import { PipeGenerator } from './PipeGenerator.js';

export class GameManager {
    constructor() {
        this.isRunning = false;
        this.score = 0;
        this.level = 1;
        this.currentDifficulty = DIFFICULTY_LEVELS[1];
        this.gameLoop = null;
        
        this.initializeElements();
        this.setupEventListeners();
        this.setupCallbacks();
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
     * Configura callbacks entre módulos
     */
    setupCallbacks() {
        // Define callback para verificar se o jogo está rodando
        this.bird.setGameRunningChecker(() => this.isRunning);
        
        // Define callback para pontuação
        this.pipeGenerator.setScoreCallback(() => this.addScore());
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
        }, UI_CONFIG.LEVEL_UP_FLASH_DURATION);
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

    /**
     * Obtém estado atual do jogo (para debug)
     */
    getGameState() {
        return {
            isRunning: this.isRunning,
            score: this.score,
            level: this.level,
            difficulty: this.currentDifficulty.name,
            pipeCount: this.pipeGenerator.getPipeCount(),
            birdY: this.bird.y,
            birdVelocity: this.bird.velocity
        };
    }

    /**
     * Pausa/despausa o jogo
     */
    togglePause() {
        if (this.isRunning) {
            this.isRunning = false;
            if (this.gameLoop) {
                clearInterval(this.gameLoop);
                this.gameLoop = null;
            }
            this.pipeGenerator.stop();
        } else {
            this.isRunning = true;
            this.gameLoop = setInterval(() => this.update(), GAME_CONFIG.FPS);
            this.pipeGenerator.start(this.currentDifficulty);
        }
    }
}