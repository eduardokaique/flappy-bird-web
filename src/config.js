/**
 * =============================================================================
 * CONFIGURAÇÕES DO JOGO FLAPPY BIRD
 * Constantes e configurações centralizadas
 * =============================================================================
 */

/**
 * Configurações globais do jogo
 */
export const GAME_CONFIG = {
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
export const DIFFICULTY_LEVELS = {
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
 * Configurações de UI
 */
export const UI_CONFIG = {
    SCORE_POSITION: { top: 20, left: 20 },
    LEVEL_POSITION: { top: 60, left: 20 },
    DIFFICULTY_POSITION: { top: 85, left: 20 },
    LEVEL_UP_FLASH_DURATION: 500
};

/**
 * Configurações de física
 */
export const PHYSICS_CONFIG = {
    BIRD_COLLISION_MARGIN: 3,
    MAX_ROTATION_UP: -30,
    MAX_ROTATION_DOWN: 60,
    ROTATION_MULTIPLIER: 3
};