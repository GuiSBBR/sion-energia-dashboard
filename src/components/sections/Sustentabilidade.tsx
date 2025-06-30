
import React, { useState } from 'react';
import { Shield, Leaf, Users, Download, Check } from 'lucide-react';

interface SustentabilidadeProps {
  selectedMonth: string;
  dadosCooperado: any;
}

export const Sustentabilidade: React.FC<SustentabilidadeProps> = ({
  selectedMonth,
  dadosCooperado
}) => {
  const [npsScore, setNpsScore] = useState<number | null>(null);
  const [npsSubmitted, setNpsSubmitted] = useState(false);

  // Calcular totais de impacto
  const impactoTotal = Object.entries(dadosCooperado.unidadesConsumidoras).reduce(
    (totais: any, [ucId, ucData]: [string, any]) => {
      const dadosMes = ucData.historico[selectedMonth];
      if (dadosMes) {
        totais.consumoTotal += dadosMes.consumo;
        totais.co2EvitadoTotal += dadosMes.co2Evitado;
        totais.arvoresEquivalentesTotal += dadosMes.arvoresEquivalentes;
      }
      return totais;
    },
    {
      consumoTotal: 0,
      co2EvitadoTotal: 0,
      arvoresEquivalentesTotal: 0
    }
  );

  const handleNpsSubmit = (score: number) => {
    setNpsScore(score);
    setNpsSubmitted(true);
    // Aqui você enviaria o score para o backend
    console.log('NPS Score:', score);
  };

  return (
    <div className="space-y-6">
      <div className="dashboard-card p-6">
        <h1 className="text-2xl font-bold text-sion-text mb-4">Sustentabilidade</h1>
        <p className="text-sion-text-secondary">
          Veja o impacto positivo que você está causando no meio ambiente
        </p>
      </div>

      {/* Cards de Impacto Total */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="metric-card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium opacity-90">Consumo Total no Mês</h3>
            <Shield className="h-6 w-6 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-2">
            {impactoTotal.consumoTotal} kWh
          </p>
          <p className="text-sm opacity-90">
            100% energia renovável
          </p>
        </div>

        <div className="metric-card bg-gradient-to-br from-sion-green to-green-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium opacity-90">CO₂ Evitado</h3>
            <Leaf className="h-6 w-6 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-2">
            {impactoTotal.co2EvitadoTotal.toFixed(1)} kg
          </p>
          <p className="text-sm opacity-90">
            de emissões evitadas
          </p>
        </div>

        <div className="metric-card bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium opacity-90">Equivalente em Árvores</h3>
            <Users className="h-6 w-6 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-2">
            {impactoTotal.arvoresEquivalentesTotal.toFixed(1)}
          </p>
          <p className="text-sm opacity-90">
            árvores plantadas
          </p>
        </div>
      </div>

      {/* Banner de Engajamento */}
      <div className="dashboard-card p-8 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sion-green rounded-full mb-4">
              <Leaf className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-sion-text mb-2">
              Parabéns pelo seu impacto positivo! 🌱
            </h2>
            <p className="text-lg text-sion-text-secondary">
              Ao escolher energia renovável, você está contribuindo para um planeta mais sustentável
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-sion-green mb-1">100%</p>
              <p className="text-sm text-sion-text-secondary">Energia Limpa</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-sion-blue mb-1">0</p>
              <p className="text-sm text-sion-text-secondary">Emissões de CO₂</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-sion-green mb-1">♻️</p>
              <p className="text-sm text-sion-text-secondary">Renovável</p>
            </div>
          </div>
        </div>
      </div>

      {/* Selo de Energia Renovável */}
      <div className="dashboard-card p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-sion-green to-green-600 rounded-full flex items-center justify-center">
              <div className="text-center text-white">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <p className="text-xs font-bold">ENERGIA</p>
                <p className="text-xs font-bold">RENOVÁVEL</p>
                <p className="text-xs">SION</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-sion-text mb-3">Selo de Energia Renovável</h3>
            <p className="text-sion-text-secondary mb-4">
              Certificamos que sua energia é 100% proveniente de fontes renováveis, 
              contribuindo para a redução das emissões de gases de efeito estufa e 
              para um futuro mais sustentável.
            </p>
            <button className="btn-primary flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Baixar Selo
            </button>
          </div>
        </div>
      </div>

      {/* Sistema NPS */}
      <div className="dashboard-card p-6">
        <h3 className="text-xl font-bold text-sion-text mb-4">Avalie sua Experiência</h3>
        
        {!npsSubmitted ? (
          <div>
            <p className="text-sion-text-secondary mb-6">
              Em uma escala de 0 a 10, o quanto você recomendaria a SION para um amigo ou colega?
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {[...Array(11)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleNpsSubmit(index)}
                  className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-sion-blue hover:bg-sion-blue hover:text-white transition-all duration-200 font-medium"
                >
                  {index}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between text-sm text-sion-text-secondary">
              <span>Não recomendaria</span>
              <span>Recomendaria totalmente</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-sion-green rounded-full mb-4">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h4 className="text-lg font-bold text-sion-text mb-2">Obrigado pelo seu feedback!</h4>
            <p className="text-sion-text-secondary">
              Sua avaliação ({npsScore}/10) é muito importante para continuarmos melhorando nossos serviços.
            </p>
          </div>
        )}
      </div>

      {/* Comparativo Ambiental */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dashboard-card p-6">
          <h4 className="font-bold text-sion-text mb-4">🌍 Seu Impacto Acumulado</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sion-text-secondary">CO₂ evitado este ano:</span>
              <span className="font-medium text-sion-green">
                {Object.values(dadosCooperado.unidadesConsumidoras).reduce((total: number, uc: any) => {
                  return total + Object.values(uc.historico).reduce((sum: number, mes: any) => sum + mes.co2Evitado, 0);
                }, 0).toFixed(1)} kg
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sion-text-secondary">Árvores equivalentes:</span>
              <span className="font-medium text-sion-green">
                {Object.values(dadosCooperado.unidadesConsumidoras).reduce((total: number, uc: any) => {
                  return total + Object.values(uc.historico).reduce((sum: number, mes: any) => sum + mes.arvoresEquivalentes, 0);
                }, 0).toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-card p-6">
          <h4 className="font-bold text-sion-text mb-4">📊 Comparativo</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-sion-text-secondary">Energia renovável</span>
                <span className="text-sm font-medium">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-sion-green h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-sion-text-secondary">Média nacional</span>
                <span className="text-sm font-medium">83%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-sion-yellow h-2 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
