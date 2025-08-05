/**
 * =============================================================================
 * MÓDULO PRINCIPAL - Inicialização do jogo
 * Ponto de entrada da aplicação - coordena a inicialização de todos os módulos
 * =============================================================================
 */

import { GameManager } from './GameManager.js';

/**
 * Instância global do gerenciador de jogo
 */
let gameManager;

/**
 * Inicializa o jogo quando a página carrega
 */
function initGame() {
    try {
        gameManager = new GameManager();
        console.log('🎮 Flappy Bird inicializado com sucesso!');
        console.log('📊 Para debug: window.gameManager contém o estado do jogo');
        
        // Expõe o gameManager globalmente para debug
        window.gameManager = gameManager;
        
    } catch (error) {
        console.error('❌ Erro ao inicializar o jogo:', error);
        showErrorMessage('Erro ao carregar o jogo. Recarregue a página.');
    }
}

/**
 * Funções globais para os botões (compatibilidade com HTML)
 * Estas funções são chamadas diretamente pelos botões no HTML
 */
window.startGame = function() {
    if (gameManager) {
        gameManager.start();
    }
};

window.restartGame = function() {
    if (gameManager) {
        gameManager.restart();
    }
};

/**
 * Função auxiliar para mostrar mensagens de erro
 */
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 0, 0, 0.9);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 9999;
        text-align: center;
        font-family: Arial, sans-serif;
    `;
    errorDiv.innerHTML = `
        <h3>⚠️ Erro</h3>
        <p>${message}</p>
        <button onclick="location.reload()" style="
            background: white;
            color: red;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
        ">Recarregar Página</button>
    `;
    document.body.appendChild(errorDiv);
}

/**
 * Funções de debug para desenvolvimento
 */
window.debugGame = {
    /**
     * Obtém estado atual do jogo
     */
    getState: () => gameManager ? gameManager.getGameState() : null,
    
    /**
     * Pausa/despausa o jogo
     */
    togglePause: () => gameManager ? gameManager.togglePause() : null,
    
    /**
     * Força game over
     */
    forceGameOver: () => gameManager ? gameManager.gameOver() : null,
    
    /**
     * Adiciona pontos
     */
    addScore: (points = 1) => {
        if (gameManager) {
            for (let i = 0; i < points; i++) {
                gameManager.addScore();
            }
        }
    },
    
    /**
     * Muda nível diretamente
     */
    setLevel: (level) => {
        if (gameManager && level >= 1 && level <= 10) {
            gameManager.level = level;
            gameManager.score = (level - 1) * 5;
            gameManager.currentDifficulty = gameManager.constructor.DIFFICULTY_LEVELS[level];
            gameManager.updateUI();
        }
    }
};

/**
 * Event Listeners
 */

// Inicializa quando a página carregar
window.addEventListener('load', initGame);

// Previne zoom em dispositivos móveis
document.addEventListener('touchstart', function(e) {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
});

// Previne zoom duplo em dispositivos móveis
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Log de inicialização
console.log('🚀 Flappy Bird - Módulos ES6 carregados');
console.log('🔧 Debug disponível em: window.debugGame');

export { gameManager };