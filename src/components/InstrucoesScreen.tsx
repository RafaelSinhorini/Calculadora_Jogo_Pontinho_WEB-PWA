import React from 'react';

interface InstrucoesScreenProps {
  onBack: () => void;
}

const InstrucoesScreen: React.FC<InstrucoesScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#1a472a] p-6 text-center">
      
      <h1 className="text-3xl font-black text-yellow-400 uppercase tracking-widest mb-6">
        Instruções de Uso
      </h1>

      <div className="flex-1 flex flex-col gap-3 text-yellow-200 text-sm font-medium text-left">
        <p>• Defina a quantidade de jogadores.</p>
        <p>• Informe o nome de cada jogador.</p>
        <p>• A cada rodada, conte a pontuação de cada jogador conforme as cartas que ele ficou nas mãos, e lance os pontos de todos.</p>
        <p>• Apenas um jogador pode fazer 0 pontos por rodada.</p>
        <p>• Quem ultrapassar 101 pontos sofre explosão.</p>
	<p>• Se estiver jogando em apenas 2 jogadores, se um jogador explode o outro já é Campeão.</p>
	<p>• Se estiver jogando com mais de 2 jogadores, quem explodiu voltará com o número de pontos do penúltimo colocado.</p>
        <p>• Quando todos explodem simultaneamente e apenas 1 jogador está vivo, ele é Campeão, e o aplicativo já irá demonstrar isso.</p>
      </div>

      <button
        onClick={onBack}
        className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-black text-lg uppercase tracking-widest py-4 rounded-2xl shadow-lg"
      >
        Vamos começar
      </button>

    </div>
  );
};

export default InstrucoesScreen;