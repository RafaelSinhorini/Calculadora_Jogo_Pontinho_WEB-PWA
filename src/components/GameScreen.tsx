
import React, { useState, useRef, useEffect } from 'react';
import { Player, Round } from '../types.ts';

interface GameScreenProps {
  players: Player[];
  rounds: Round[];
  onCalculate: (scores: number[]) => void;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ players, rounds, onCalculate, onBack }) => {
  const [currentScores, setCurrentScores] = useState<string[]>(Array(players.length).fill(''));
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const handleScoreChange = (index: number, value: string) => {
    const val = value.replace(/\D/g, '');
    const num = parseInt(val);
    if (isNaN(num)) {
      const newScores = [...currentScores];
      newScores[index] = '';
      setCurrentScores(newScores);
      return;
    }
    if (num >= 0 && num <= 999) {
      const newScores = [...currentScores];
      newScores[index] = num.toString();
      setCurrentScores(newScores);
    }
  };

  const handleCalculate = () => {
    const scores = currentScores.map(s => parseInt(s) || 0);
    onCalculate(scores);
    setCurrentScores(Array(players.length).fill(''));
  };

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
    }
  }, [rounds]);

  const colWidthClass = "min-w-[85px]";
  const indexColWidthClass = "min-w-[40px]";

  return (
    <div className="w-full h-screen flex flex-col pb-4 animate-in fade-in duration-500 overflow-hidden">
      <div className="flex justify-between items-center py-4 px-2 shrink-0">
        <button 
          onClick={onBack}
          className="bg-white/10 p-2 rounded-lg text-white hover:bg-white/20 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="text-sm font-black text-white/70 uppercase tracking-widest">
          Partida de Pontinho
        </h2>
        <div className="w-10"></div>
      </div>

      <div className="flex-grow flex flex-col bg-black/20 rounded-t-3xl border-x border-t border-white/10 overflow-x-auto custom-scrollbar shadow-inner">
        <div className="min-w-fit flex flex-col h-full">
          <div className="flex border-b border-white/10 sticky top-0 z-20 bg-[#1a472a]">
            <div className={`${indexColWidthClass} flex items-center justify-center font-bold text-xs text-white/50 border-r border-white/5 bg-black/20`}>
              #
            </div>
            {players.map((p, i) => (
              <div 
                key={i} 
                className={`flex-1 ${colWidthClass} p-2 flex flex-col items-center justify-center border-r border-white/5 last:border-r-0`}
              >
                <span className="text-[10px] font-black text-white uppercase truncate w-full text-center px-1 mb-1">
                  {p.name}
                </span>
                <div className="flex items-center gap-1 min-h-[32px]">
                  {p.explosionCount > 0 && (
                    <div className={`flex items-center bg-red-600/40 px-2 py-1 rounded-xl border border-white/20 shadow-lg ${p.lastExploded ? 'animate-bounce' : ''}`}>
                      <span className="text-lg">💣</span>
                      <span className="text-xs font-black text-white ml-1">x{p.explosionCount}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div ref={tableContainerRef} className="flex-grow overflow-y-auto custom-scrollbar">
            {rounds.map((round, rIdx) => (
              <div key={rIdx} className="flex border-b border-white/5 hover:bg-white/5 transition-colors">
                <div className={`${indexColWidthClass} flex items-center justify-center text-xs font-bold text-white/30 border-r border-white/5 bg-black/10`}>
                  {round.id}
                </div>
                {round.scores.map((score, sIdx) => (
                  <div 
                    key={sIdx} 
                    className={`flex-1 ${colWidthClass} p-3 text-center font-medium text-green-200 border-r border-white/5 last:border-r-0`}
                  >
                    {score}
                  </div>
                ))}
              </div>
            ))}
            {rounds.length === 0 && (
               <div className="p-10 text-center text-white/20 font-fun italic min-w-full">
                 Nenhuma rodada lançada ainda...
               </div>
            )}
          </div>

          <div className="bg-white/5 border-t border-white/10 p-2 shrink-0">
            <div className="flex">
              <div className={`${indexColWidthClass} flex items-center justify-center font-bold text-xs text-yellow-400`}>
                {rounds.length + 1}
              </div>
              {players.map((_, i) => (
                <div key={i} className={`flex-1 ${colWidthClass} px-1`}>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="pts"
                    value={currentScores[i]}
                    onChange={(e) => handleScoreChange(i, e.target.value)}
                    className="w-full bg-white/20 border border-white/10 rounded-lg p-2 text-center text-white font-bold focus:ring-2 focus:ring-yellow-400 outline-none transition-all placeholder-white/20"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 border-t border-white/10 p-3 shrink-0">
            <div className="flex items-center">
              <div className={`${indexColWidthClass} font-bold text-[9px] text-white/40 uppercase text-center leading-tight`}>Soma</div>
              {players.map((p, i) => (
                <div key={i} className={`flex-1 ${colWidthClass} text-center`}>
                  <span className={`text-xl font-black ${p.totalPoints > 100 ? 'text-red-400' : 'text-yellow-400'}`}>
                    {p.totalPoints}
                  </span>
                  <div className="text-[8px] font-bold text-white/40 uppercase -mt-1 text-center truncate">PONTOS</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 shrink-0 rounded-b-3xl shadow-2xl mt-[-1px]">
        <button
          onClick={handleCalculate}
          className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] py-4 rounded-2xl text-white font-black text-xl uppercase tracking-widest shadow-[0_4px_0_rgb(21,71,52)] transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
          </svg>
          Calcular Rodada
        </button>
      </div>
    </div>
  );
};

export default GameScreen;
