# 🐦 Flappy Bird Web

Uma versão web do clássico jogo Flappy Bird com sistema de níveis e dificuldade progressiva.

![Flappy Bird](https://img.shields.io/badge/Game-Flappy%20Bird-yellow) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🎮 Como Jogar

- **Clique na tela** ou pressione **ESPAÇO** para fazer o pássaro voar
- **Evite os canos verdes** - qualquer toque resulta em game over
- **A cada 5 pontos** você avança de nível automaticamente
- **10 níveis de dificuldade** progressiva: do Iniciante ao INSANO!

## 🚀 Características

- ✅ **Física realista** do pássaro com gravidade
- ✅ **Sistema de 10 níveis** progressivos
- ✅ **Dificuldade adaptativa** que aumenta gradualmente
- ✅ **Interface responsiva** e intuitiva
- ✅ **Controles simples** (clique ou espaço)
- ✅ **Feito em HTML5, CSS3 e JavaScript** puro (sem dependências)
- ✅ **Visual retrô** inspirado no jogo original
- ✅ **Animações suaves** e efeitos visuais

## 🎯 Níveis de Dificuldade

| Nível | Dificuldade | Vão entre Canos | Velocidade | Frequência |
|-------|-------------|-----------------|------------|------------|
| 1 | **Iniciante** | 250px | 1.5x | 2000ms |
| 2 | **Fácil** | 230px | 2.0x | 1800ms |
| 3 | **Normal** | 210px | 2.5x | 1600ms |
| 4 | **Intermediário** | 190px | 3.0x | 1400ms |
| 5 | **Difícil** | 170px | 3.5x | 1200ms |
| 6 | **Expert** | 150px | 4.0x | 1000ms |
| 7 | **Mestre** | 140px | 4.5x | 900ms |
| 8 | **Lenda** | 130px | 5.0x | 800ms |
| 9 | **Impossível** | 120px | 5.5x | 700ms |
| 10 | **INSANO!** | 110px | 6.0x | 600ms |

### 📈 Progressão
- **Pontuação:** A cada cano passado = +1 ponto
- **Level Up:** A cada 5 pontos avança um nível
- **Mudanças por nível:**
  - Vão entre canos diminui
  - Velocidade dos canos aumenta
  - Frequência de spawn aumenta
  - Gravidade fica mais intensa

## 🌐 Jogar Online

**🎮 [CLIQUE AQUI PARA JOGAR](https://eduardokaique.github.io/flappy-bird-web)**

## 💻 Executar Localmente

### Opção 1: Download direto
1. Baixe o arquivo `index.html`
2. Abra no seu navegador
3. Pronto para jogar!

### Opção 2: Clonar repositório
```bash
# Clone o repositório
git clone https://github.com/eduardokaique/flappy-bird-web.git

# Entre na pasta
cd flappy-bird-web

# Abra o index.html no navegador
# Ou use um servidor local (opcional)
python -m http.server 8000
# Acesse: http://localhost:8000
```

## 📱 Compatibilidade

- ✅ **Desktop:** Chrome, Firefox, Safari, Edge
- ✅ **Mobile:** Funciona em smartphones e tablets
- ✅ **Sem instalação** necessária
- ✅ **Offline:** Funciona sem internet após o primeiro carregamento

## 📁 Estrutura do Projeto

```
flappy-bird-web/
├── index.html              # Página principal (HTML semântico)
├── src/
│   ├── styles.css          # Estilos CSS organizados e comentados
│   ├── config.js           # Configurações e constantes do jogo
│   ├── Bird.js             # Classe do pássaro (física e movimento)
│   ├── Pipe.js             # Classe dos canos (obstáculos individuais)
│   ├── PipeGenerator.js    # Gerador e gerenciador de canos
│   ├── GameManager.js      # Controlador principal do jogo
│   ├── main.js             # Inicialização e ponto de entrada
│   └── game.js             # [DEPRECATED] Versão monolítica anterior
└── README.md               # Documentação completa
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Estilização modular, animações e responsividade  
- **JavaScript ES6** - Código orientado a objetos com classes
- **Arquitetura modular** - Separação clara de responsabilidades
- **Nenhuma dependência externa** - Código 100% nativo

## 🎨 Características Técnicas

### 🎮 Arquitetura do Código
- **Módulos ES6** - Separação completa em arquivos individuais
- **Classes especializadas** - `Bird`, `Pipe`, `PipeGenerator`, `GameManager`
- **Configurações centralizadas** - `config.js` com todas as constantes
- **Separação de responsabilidades** - Cada módulo tem uma função específica
- **Sistema de imports/exports** - Dependências explícitas entre módulos
- **Código documentado** - Comentários JSDoc em português
- **Debug integrado** - Ferramentas de desenvolvimento inclusas

### 🎯 Game Engine
- **60 FPS** - Loop de jogo otimizado
- **Física realista** - Gravidade, velocidade e colisões precisas
- **Detecção de colisão** por bounding box otimizada
- **Spawn procedural** de obstáculos
- **Sistema de pontuação** e progressão automática
- **Gerenciamento de estado** robusto

### 🎨 Interface e UX
- **Cores vibrantes** inspiradas no jogo original
- **Animações CSS** suaves para transições
- **Efeitos visuais** de feedback para interações
- **Design responsivo** adaptável a diferentes telas
- **Acessibilidade** com meta tags e estrutura semântica

## 🔧 Comandos de Debug

O jogo inclui ferramentas de debug acessíveis no console:

```javascript
// Estado atual do jogo
window.debugGame.getState()

// Pausar/despausar
window.debugGame.togglePause()

// Adicionar pontos
window.debugGame.addScore(10)

// Mudar nível diretamente
window.debugGame.setLevel(5)

// Forçar game over
window.debugGame.forceGameOver()

// Acessar o gerenciador principal
window.gameManager
```

## 🚀 Possíveis Melhorias Futuras

- [ ] 🎵 Efeitos sonoros e música de fundo
- [ ] 🏆 Sistema de high scores (leaderboard)
- [ ] 🎨 Skins diferentes para o pássaro
- [ ] 🌍 Temas visuais alternativos
- [ ] 📊 Estatísticas detalhadas de jogo
- [ ] 🎮 Controles alternativos (touch gestures)
- [ ] 💫 Power-ups e bonus especiais
- [ ] 🌐 Service Worker para funcionalidade offline
- [ ] 📱 Progressive Web App (PWA)

## 📄 Licença

Este projeto está sob a licença **MIT**. Sinta-se livre para usar, modificar e distribuir!

## 👨‍💻 Desenvolvedor

**Eduardo Kaique de Freitas**
- 🌐 GitHub: [@eduardokaique](https://github.com/eduardokaique)
- 📧 Email: eduardokaique.dev@gmail.com

---

### 🎮 Divirta-se jogando e tente chegar ao nível INSANO! 

**⭐ Se gostou do projeto, deixe uma estrela no repositório!**