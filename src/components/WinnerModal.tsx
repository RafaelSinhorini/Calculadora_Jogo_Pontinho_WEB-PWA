
import React from 'react';
import { Player } from '../types.ts';

interface WinnerModalProps {
  winner: Player;
  onRestart: () => void;
  onNewPlayers: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onRestart, onNewPlayers }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 animate-ping text-4xl opacity-50">✨</div>
        <div className="absolute top-1/3 right-1/4 animate-bounce text-4xl opacity-50">🎉</div>
        <div className="absolute bottom-1/4 left-1/3 animate-pulse text-4xl opacity-50">⭐</div>
        <div className="absolute bottom-1/3 right-1/3 animate-ping text-4xl opacity-50">✨</div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 w-full max-w-sm text-center shadow-[0_0_80px_rgba(253,224,71,0.4)] border-8 border-yellow-400 relative animate-in zoom-in-90 duration-500">
        <div className="relative mb-10 flex justify-center">
          <div className="text-8xl drop-shadow-2xl animate-bounce">🏆</div>
          <div className="absolute -top-4 -right-2 text-4xl animate-pulse">🎊</div>
          <div className="absolute -top-4 -left-2 text-4xl animate-pulse delay-75">🎊</div>
        </div>
        
        <h3 className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm mb-2">
          Grande Vencedor
        </h3>
        <h2 className="text-4xl font-black text-green-900 font-fun uppercase tracking-tight mb-4 break-words">
          {winner.name}
        </h2>
        
        <div className="bg-green-100 text-green-700 font-black py-3 px-8 rounded-2xl inline-block text-2xl uppercase tracking-widest mb-8 border-b-4 border-green-200">
          Campeão!
        </div>
        
        <p className="text-gray-500 font-semibold mb-8 px-4 leading-tight">
          Todos os outros jogadores estouraram o limite!
        </p>
        
        <div className="space-y-3">
          <button
            onClick={onRestart}
            className="w-full bg-green-600 hover:bg-green-700 active:scale-95 py-4 rounded-2xl text-white font-black text-xl uppercase tracking-widest shadow-[0_4px_0_rgb(21,71,52)] transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Nova Partida
          </button>
          
          <button
            onClick={onNewPlayers}
            className="w-full bg-gray-100 hover:bg-gray-200 active:scale-95 py-3 rounded-2xl text-gray-600 font-bold text-sm uppercase tracking-wider transition-all"
          >
            Trocar Jogadores
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;
