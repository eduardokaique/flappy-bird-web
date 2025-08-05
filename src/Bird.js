/**
 * =============================================================================
 * CLASSE BIRD - Gerencia o pássaro do jogo
 * Módulo responsável por toda a lógica relacionada ao pássaro
 * =============================================================================
 */

import { GAME_CONFIG, PHYSICS_CONFIG } from './config.js';

export class Bird {
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
            if (this.isGameRunning()) {
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
        const rotation = Math.min(
            Math.max(this.velocity * PHYSICS_CONFIG.ROTATION_MULTIPLIER, PHYSICS_CONFIG.MAX_ROTATION_UP), 
            PHYSICS_CONFIG.MAX_ROTATION_DOWN
        );
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
        const margin = PHYSICS_CONFIG.BIRD_COLLISION_MARGIN;
        return {
            left: 55,
            right: 75,
            top: this.y + margin,
            bottom: this.y + GAME_CONFIG.BIRD_SIZE - margin
        };
    }

    /**
     * Aplica animação de morte
     */
    die() {
        this.element.style.transform = 'rotate(90deg)';
    }

    /**
     * Verifica se o jogo está rodando
     * (Método auxiliar para evitar dependência circular)
     */
    isGameRunning() {
        // Esta função será sobrescrita pelo GameManager
        return true;
    }

    /**
     * Define a função de verificação do estado do jogo
     */
    setGameRunningChecker(checker) {
        this.isGameRunning = checker;
    }
}