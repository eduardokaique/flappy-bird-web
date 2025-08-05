/**
 * =============================================================================
 * CLASSE PIPE - Gerencia um par de canos (superior e inferior)
 * Módulo responsável por criar e gerenciar obstáculos individuais
 * =============================================================================
 */

import { GAME_CONFIG } from './config.js';

export class Pipe {
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
        if (this.topElement && this.topElement.parentNode) {
            this.topElement.remove();
        }
        if (this.bottomElement && this.bottomElement.parentNode) {
            this.bottomElement.remove();
        }
    }

    /**
     * Obtém informações do cano para debug
     */
    getInfo() {
        return {
            x: this.x,
            gapTop: this.gapTop,
            gapBottom: this.gapBottom,
            scored: this.scored,
            isOffScreen: this.isOffScreen()
        };
    }
}