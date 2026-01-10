
import React, { useState } from 'react';

interface SetupScreenProps {
  onStart: (playerNames: string[]) => void;
  onInstructions: () => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onStart, onInstructions }) => {  
  const [numPlayers, setNumPlayers] = useState(2);
  const [names, setNames] = useState<string[]>(Array(12).fill(''));

  const handleIncrement = () => {
    if (numPlayers < 12) setNumPlayers(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (numPlayers > 2) setNumPlayers(prev => prev - 1);
  };

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value.slice(0, 9);
    setNames(newNames);
  };

  const handlePlay = () => {
    const selectedNames = names.slice(0, numPlayers).map((n, i) => n || `Jogador ${i + 1}`);
    onStart(selectedNames);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mt-8 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-12 h-12 text-yellow-400 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
             <path d="M19,2L17,4L19,6L21,4L19,2M17,10L15,12L17,14L19,12L17,10M11,2L9,4L11,6L13,4L11,2M11,10L9,12L11,14L13,12L11,10M5,2L3,4L5,6L7,4L5,2M5,10L3,12L5,14L7,12L5,10M19,18L17,20L19,22L21,20L19,18M11,18L9,20L11,22L13,20L11,18M5,18L3,20L5,22L7,20L5,18Z" />
          </svg>
          <h1 className="text-5xl  sm:text-5xl font-black text-white font-fun drop-shadow-md tracking-tight uppercase">
            Calculadora <span className="text-yellow-400 block -mt-2">Pontinho</span>
          </h1>
        </div>
        <p className="text-sm text-green-200 font-medium">Divirta-se jogando cartas!</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 w-full max-w-none shadow-2xl border border-white/20 mb-8">
        <label className="text-center block text-lg font-bold text-white mb-4 uppercase tracking-wide">
          Quantidade de Jogadores
        </label>
        
        <div className="flex items-center justify-center gap-6 mb-8">
          <button onClick={handleDecrement} className="w-14 h-14 rounded-2xl bg-red-500 hover:bg-red-600 active:scale-95 transition-all flex items-center justify-center text-3xl font-bold shadow-lg">-</button>
          <span className="text-5xl font-black font-fun w-16 text-center text-yellow-400">{numPlayers}</span>
          <button onClick={handleIncrement} className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center text-3xl font-bold shadow-lg">+</button>
        </div>

        <div className="grid grid-cols-1 gap-3 max-h-[40vh] overflow-y-auto px-2 custom-scrollbar">
          {Array.from({ length: numPlayers }).map((_, i) => (
            <div key={i} className="relative">
              <input
                type="text"
                placeholder={`Nome do Jogador ${i + 1}`}
                value={names[i]}
                onChange={(e) => handleNameChange(i, e.target.value)}
                maxLength={9}
                className="w-full bg-white/20 border-2 border-transparent focus:border-yellow-400 outline-none rounded-xl px-4 py-3 text-white placeholder-white/40 font-bold transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/30 font-bold">{names[i].length}/9</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handlePlay}
        className="w-[100%] max-w-[500px] mx-auto bg-yellow-400 hover:bg-yellow-500 active:scale-[0.98] py-4 rounded-2xl text-green-900 font-black text-xl uppercase tracking-widest shadow-[0_6px_0_rgb(202,138,4)] transition-all mb-10"
      >
        Jogar
      </button>

      <button
      onClick={onInstructions}
  className="mb-4 text-yellow-400 font-bold text-sm uppercase tracking-wider hover:text-yellow-300 transition-colors"
>
  Instruções de uso
</button>

      <footer className="pb-6 text-center opacity-40">
        <p className="text-[10px] text-white font-medium uppercase tracking-wider">
          Desenvolvido por Rafa Sinhorini
        </p>
        <p className="text-[10px] text-white">
          Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
};

export default SetupScreen;
