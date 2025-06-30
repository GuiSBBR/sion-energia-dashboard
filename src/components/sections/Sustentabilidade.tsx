
import React, { useState } from 'react';

interface SustentabilidadeProps {
  selectedMonth: string;
  dadosCooperado: any;
}

export const Sustentabilidade: React.FC<SustentabilidadeProps> = ({
  selectedMonth,
  dadosCooperado
}) => {
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

  // Calcular dados de sustentabilidade
  const dadosSustentabilidade = Object.entries(dadosCooperado.unidadesConsumidoras).reduce(
    (totais: any, [ucId, ucData]: [string, any]) => {
      const dadosMes = ucData.historico[selectedMonth];
      if (dadosMes) {
        const consumoValue = Number(dadosMes.consumo) || 0;
        totais.consumoTotal += consumoValue;
        totais.co2Evitado += consumoValue * 0.0817; // kg CO2 por kWh
        totais.arvoresEquivalentes += Math.floor(consumoValue * 0.0003); // árvores equivalentes
      }
      return totais;
    },
    {
      consumoTotal: 0,
      co2Evitado: 0,
      arvoresEquivalentes: 0
    }
  );

  const handleNpsSubmit = () => {
    if (npsScore !== null) {
      alert(`Obrigado pelo seu feedback! Sua nota: ${npsScore}`);
      // Aqui você enviaria os dados para o backend
    }
  };

  return (
    <div className="space-y-6">
      <div className="dashboard-card p-6">
        <h1 className="text-2xl font-bold text-sion-text mb-6">Sustentabilidade</h1>
        <p className="text-sion-text-secondary">
          Veja o impacto positivo que você está gerando no meio ambiente ao escolher energia limpa
        </p>
      </div>

      {/* Cards de Impacto */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="metric-card bg-gradient-to-br from-sion-green to-sion-green/80 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">Consumo Total no Mês</h3>
          <p className="text-3xl font-bold mb-2">
            {dadosSustentabilidade.consumoTotal.toFixed(0)} kWh
          </p>
          <p className="text-sm opacity-90">
            Energia 100% limpa e renovável
          </p>
        </div>

        <div className="metric-card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">CO₂ Evitado</h3>
          <p className="text-3xl font-bold mb-2">
            {dadosSustentabilidade.co2Evitado.toFixed(1)} kg
          </p>
          <p className="text-sm opacity-90">
            Redução na pegada de carbono
          </p>
        </div>

        <div className="metric-card bg-gradient-to-br from-green-600 to-green-700 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">Equivalente em Árvores</h3>
          <p className="text-3xl font-bold mb-2">
            {dadosSustentabilidade.arvoresEquivalentes}
          </p>
          <p className="text-sm opacity-90">
            Árvores plantadas equivalentes
          </p>
        </div>
      </div>

      {/* Banner de Engajamento */}
      <div className="dashboard-card p-8 bg-gradient-to-r from-sion-green/10 to-sion-blue/10 border-l-4 border-sion-green">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">🌱</div>
          <div>
            <h3 className="text-xl font-bold text-sion-text mb-2">
              Parabéns! Você está fazendo a diferença!
            </h3>
            <p className="text-sion-text-secondary">
              Ao escolher energia renovável, você contribui para um futuro mais sustentável e 
              ainda economiza na sua conta de luz. Continue nessa jornada verde conosco!
            </p>
          </div>
        </div>
      </div>

      {/* Selo de Energia Renovável */}
      <div className="dashboard-card p-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-sion-green/20 rounded-full flex items-center justify-center">
              <span className="text-3xl">🏆</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-sion-text mb-2">
              Certificado de Energia Renovável
            </h3>
            <p className="text-sion-text-secondary mb-4">
              Baixe seu certificado e comprove que você utiliza energia 100% limpa e renovável.
              Compartilhe com seus amigos e inspire outros a fazer parte dessa mudança!
            </p>
            <button className="btn-primary">
              Baixar Certificado
            </button>
          </div>
        </div>
      </div>

      {/* NPS - Net Promoter Score */}
      <div className="dashboard-card p-6">
        <h3 className="text-xl font-bold text-sion-text mb-4">
          Como você avalia a SION Energia?
        </h3>
        <p className="text-sion-text-secondary mb-6">
          Em uma escala de 0 a 10, o quanto você recomendaria a SION para um amigo ou familiar?
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {Array.from({ length: 11 }, (_, i) => (
            <button
              key={i}
              onClick={() => setNpsScore(i)}
              className={`w-12 h-12 rounded-lg border-2 font-bold transition-all ${
                npsScore === i
                  ? 'bg-sion-blue text-white border-sion-blue'
                  : 'border-gray-300 text-sion-text hover:border-sion-blue'
              }`}
            >
              {i}
            </button>
          ))}
        </div>

        <div className="flex justify-between text-sm text-sion-text-secondary mb-6">
          <span>Não recomendaria</span>
          <span>Recomendaria totalmente</span>
        </div>

        {npsScore !== null && (
          <div className="space-y-4">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Conte-nos o motivo da sua avaliação (opcional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              rows={3}
            />
            <button 
              onClick={handleNpsSubmit}
              className="btn-primary"
            >
              Enviar Avaliação
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
