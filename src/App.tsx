
import React, { useState } from 'react';
import { View, Player, Round } from './types.ts';
import SetupScreen from './components/SetupScreen.tsx';
import GameScreen from './components/GameScreen.tsx';
import WinnerModal from './components/WinnerModal.tsx';

const App: React.FC = () => {
  const [view, setView] = useState<View>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [winner, setWinner] = useState<Player | null>(null);

  const startGame = (playerNames: string[]) => {
    const initialPlayers: Player[] = playerNames.map((name, index) => ({
      id: index,
      name: name || `Jogador ${index + 1}`,
      totalPoints: 0,
      lastExploded: false,
      explosionCount: 0,
    }));
    setPlayers(initialPlayers);
    setRounds([]);
    setWinner(null);
    setView('game');
  };

  const handleCalculateRound = (newScores: number[]) => {
    if (winner) return;

    const rawTotals = players.map((p, idx) => p.totalPoints + newScores[idx]);
    const explodedIndices = rawTotals
      .map((score, i) => (score > 100 ? i : -1))
      .filter(i => i !== -1);

    let updatedPlayers = players.map((player, idx) => {
      const isExploding = explodedIndices.includes(idx);
      return {
        ...player,
        totalPoints: rawTotals[idx],
        lastExploded: isExploding,
        explosionCount: isExploding ? player.explosionCount + 1 : player.explosionCount
      };
    });

    const remainingBelowLimit = rawTotals.filter(score => score <= 100).length;
    if (remainingBelowLimit === 1 && players.length > 1) {
      const winnerIndex = rawTotals.findIndex(score => score <= 100);
      setWinner(updatedPlayers[winnerIndex]);
      setPlayers(updatedPlayers);
      setRounds([...rounds, { id: rounds.length + 1, scores: newScores }]);
      return;
    }

    if (explodedIndices.length > 0) {
      const validScores = updatedPlayers
        .filter((_, i) => !explodedIndices.includes(i))
        .map(p => p.totalPoints);
      
      const maxValidScore = validScores.length > 0 ? Math.max(...validScores) : 0;

      updatedPlayers = updatedPlayers.map((player, idx) => {
        if (explodedIndices.includes(idx)) {
          return { ...player, totalPoints: maxValidScore };
        }
        return player;
      });
    }

    setPlayers(updatedPlayers);
    setRounds([...rounds, { id: rounds.length + 1, scores: newScores }]);
  };

  const restartMatch = () => {
    const resetPlayers = players.map(p => ({
      ...p,
      totalPoints: 0,
      lastExploded: false,
      explosionCount: 0
    }));
    setPlayers(resetPlayers);
    setRounds([]);
    setWinner(null);
    setView('game');
  };

  const goToSetup = () => {
    setView('setup');
    setPlayers([]);
    setRounds([]);
    setWinner(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 max-w-md mx-auto w-full">
      {view === 'setup' ? (
        <SetupScreen onStart={startGame} />
      ) : (
        <GameScreen 
          players={players} 
          rounds={rounds} 
          onCalculate={handleCalculateRound} 
          onBack={goToSetup}
        />
      )}
      
      {winner && (
        <WinnerModal 
          winner={winner} 
          onRestart={restartMatch} 
          onNewPlayers={goToSetup}
        />
      )}
    </div>
  );
};

export default App;
