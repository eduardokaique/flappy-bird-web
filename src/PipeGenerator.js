/**
 * =============================================================================
 * CLASSE PIPEGENERATOR - Gerencia a criação e movimento dos canos
 * Módulo responsável pelo sistema de spawn e gerenciamento de obstáculos
 * =============================================================================
 */

import { GAME_CONFIG } from './config.js';
import { Pipe } from './Pipe.js';

export class PipeGenerator {
    constructor(container) {
        this.container = container;
        this.pipes = [];
        this.spawnTimer = null;
        this.onScoreCallback = null;
    }

    /**
     * Define callback para quando pontuação aumenta
     */
    setScoreCallback(callback) {
        this.onScoreCallback = callback;
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
                if (this.onScoreCallback) {
                    this.onScoreCallback();
                }
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

    /**
     * Obtém número atual de canos
     */
    getPipeCount() {
        return this.pipes.length;
    }

    /**
     * Obtém informações de todos os canos (para debug)
     */
    getAllPipesInfo() {
        return this.pipes.map(pipe => pipe.getInfo());
    }

    /**
     * Verifica se há canos na tela
     */
    hasPipes() {
        return this.pipes.length > 0;
    }
}