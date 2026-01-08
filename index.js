
// ESTADO DO APLICATIVO
let state = {
    view: 'setup',
    numPlayers: 2,
    players: [],
    rounds: [],
    winner: null
};

// ELEMENTOS DO DOM
const views = {
    setup: document.getElementById('view-setup'),
    game: document.getElementById('view-game')
};

const setupUI = {
    numDisplay: document.getElementById('display-num-players'),
    namesContainer: document.getElementById('container-names'),
    btnInc: document.getElementById('btn-inc'),
    btnDec: document.getElementById('btn-dec'),
    btnPlay: document.getElementById('btn-play')
};

const gameUI = {
    tableContent: document.getElementById('game-table-content'),
    btnCalculate: document.getElementById('btn-calculate'),
    btnBack: document.getElementById('btn-back')
};

const winnerUI = {
    modal: document.getElementById('modal-winner'),
    name: document.getElementById('winner-name'),
    btnRestart: document.getElementById('btn-restart'),
    btnNewPlayers: document.getElementById('btn-new-players')
};

// INICIALIZAÇÃO
function init() {
    renderNameInputs();
    setupEventListeners();
}

function setupEventListeners() {
    setupUI.btnInc.onclick = () => { if(state.numPlayers < 12) { state.numPlayers++; updateSetup(); } };
    setupUI.btnDec.onclick = () => { if(state.numPlayers > 2) { state.numPlayers--; updateSetup(); } };
    setupUI.btnPlay.onclick = startGame;
    gameUI.btnCalculate.onclick = handleCalculate;
    gameUI.btnBack.onclick = () => switchView('setup');
    winnerUI.btnRestart.onclick = restartMatch;
    winnerUI.btnNewPlayers.onclick = () => { winnerUI.modal.classList.add('hidden'); switchView('setup'); };
}

// LOGICA DE SETUP
function updateSetup() {
    setupUI.numDisplay.innerText = state.numPlayers;
    renderNameInputs();
}

function renderNameInputs() {
    const currentValues = Array.from(setupUI.namesContainer.querySelectorAll('input')).map(i => i.value);
    setupUI.namesContainer.innerHTML = '';
    for(let i=0; i<state.numPlayers; i++) {
        const div = document.createElement('div');
        div.className = 'relative';
        div.innerHTML = `
            <input type="text" placeholder="Jogador ${i+1}" maxlength="9" value="${currentValues[i] || ''}" 
                   class="w-full bg-white/20 border-2 border-transparent focus:border-yellow-400 outline-none rounded-xl px-4 py-3 text-white placeholder-white/40 font-bold transition-all">
        `;
        setupUI.namesContainer.appendChild(div);
    }
}

function switchView(viewName) {
    state.view = viewName;
    views.setup.classList.toggle('hidden', viewName !== 'setup');
    views.game.classList.toggle('hidden', viewName !== 'game');
    if(viewName === 'setup') {
        state.players = [];
        state.rounds = [];
        state.winner = null;
    }
}

// LOGICA DE JOGO
function startGame() {
    const inputs = setupUI.namesContainer.querySelectorAll('input');
    state.players = Array.from(inputs).map((input, i) => ({
        id: i,
        name: input.value || `Jogador ${i+1}`,
        totalPoints: 0,
        lastExploded: false,
        explosionCount: 0
    }));
    state.rounds = [];
    state.winner = null;
    switchView('game');
    renderGameTable();
}

function renderGameTable() {
    let html = `
        <!-- STICKY HEADER -->
        <div class="flex border-b border-white/10 sticky top-0 z-20 bg-[#1a472a]">
            <div class="index-col flex items-center justify-center font-bold text-xs text-white/50 border-r border-white/5 bg-black/20">#</div>
            ${state.players.map(p => `
                <div class="player-col p-2 flex flex-col items-center justify-center border-r border-white/5 last:border-r-0">
                    <span class="text-[10px] font-black text-white uppercase truncate w-full text-center px-1 mb-1">${p.name}</span>
                    <div class="flex items-center gap-1 min-h-[32px]">
                        ${p.explosionCount > 0 ? `
                            <div class="flex items-center bg-red-600/40 px-2 py-1 rounded-xl border border-white/20 shadow-lg ${p.lastExploded ? 'animate-bounce' : ''}">
                                <span class="text-lg">💣</span>
                                <span class="text-xs font-black text-white ml-1">x${p.explosionCount}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        </div>

        <!-- SCROLLABLE BODY -->
        <div id="rounds-body" class="flex-grow overflow-y-auto custom-scrollbar">
            ${state.rounds.length === 0 ? `
                <div class="p-10 text-center text-white/20 font-fun italic min-w-full">Nenhuma rodada lançada ainda...</div>
            ` : state.rounds.map(r => `
                <div class="flex border-b border-white/5 hover:bg-white/5">
                    <div class="index-col flex items-center justify-center text-xs font-bold text-white/30 border-r border-white/5 bg-black/10">${r.id}</div>
                    ${r.scores.map(s => `<div class="player-col p-3 text-center font-medium text-green-200 border-r border-white/5 last:border-r-0">${s}</div>`).join('')}
                </div>
            `).join('')}
        </div>

        <!-- INPUTS SECTION -->
        <div class="bg-white/5 border-t border-white/10 p-2 shrink-0">
            <div class="flex">
                <div class="index-col flex items-center justify-center font-bold text-xs text-yellow-400">${state.rounds.length + 1}</div>
                ${state.players.map((_, i) => `
                    <div class="player-col px-1">
                        <input type="number" inputmode="numeric" placeholder="pts" data-idx="${i}" 
                               class="score-input w-full bg-white/20 border border-white/10 rounded-lg p-2 text-center text-white font-bold focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder-white/20">
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- TOTALS SECTION -->
        <div class="bg-white/10 border-t border-white/10 p-3 shrink-0">
            <div class="flex items-center">
                <div class="index-col font-bold text-[9px] text-white/40 uppercase text-center leading-tight">Soma</div>
                ${state.players.map(p => `
                    <div class="player-col text-center">
                        <span class="text-xl font-black ${p.totalPoints > 100 ? 'text-red-400' : 'text-yellow-400'}">${p.totalPoints}</span>
                        <div class="text-[8px] font-bold text-white/40 uppercase -mt-1 text-center truncate">PONTOS</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    gameUI.tableContent.innerHTML = html;
    
    // Auto-scroll para o final
    const body = document.getElementById('rounds-body');
    if(body) body.scrollTop = body.scrollHeight;
}

function handleCalculate() {
    if(state.winner) return;
    const inputs = document.querySelectorAll('.score-input');
    const newScores = Array.from(inputs).map(i => parseInt(i.value) || 0);

    const rawTotals = state.players.map((p, idx) => p.totalPoints + newScores[idx]);
    const explodedIndices = rawTotals.map((score, i) => (score > 100 ? i : -1)).filter(i => i !== -1);

    // Atualiza base inicial
    state.players = state.players.map((player, idx) => {
        const isExploding = explodedIndices.includes(idx);
        return {
            ...player,
            totalPoints: rawTotals[idx],
            lastExploded: isExploding,
            explosionCount: isExploding ? player.explosionCount + 1 : player.explosionCount
        };
    });

    // Condição de Vitória
    const remainingBelowLimit = rawTotals.filter(score => score <= 100).length;
    if (remainingBelowLimit === 1 && state.players.length > 1) {
        const winnerIndex = rawTotals.findIndex(score => score <= 100);
        state.winner = state.players[winnerIndex];
        state.rounds.push({ id: state.rounds.length + 1, scores: newScores });
        showWinner(state.winner);
        renderGameTable();
        return;
    }

    // Regra da Explosão
    if (explodedIndices.length > 0) {
        const validScores = state.players.filter((_, i) => !explodedIndices.includes(i)).map(p => p.totalPoints);
        const maxValidScore = validScores.length > 0 ? Math.max(...validScores) : 0;

        state.players = state.players.map((player, idx) => {
            if (explodedIndices.includes(idx)) {
                return { ...player, totalPoints: maxValidScore };
            }
            return player;
        });
    }

    state.rounds.push({ id: state.rounds.length + 1, scores: newScores });
    renderGameTable();
}

function showWinner(player) {
    winnerUI.name.innerText = player.name;
    winnerUI.modal.classList.remove('hidden');
}

function restartMatch() {
    state.players = state.players.map(p => ({ ...p, totalPoints: 0, lastExploded: false, explosionCount: 0 }));
    state.rounds = [];
    state.winner = null;
    winnerUI.modal.classList.add('hidden');
    renderGameTable();
}

// Start app
init();
