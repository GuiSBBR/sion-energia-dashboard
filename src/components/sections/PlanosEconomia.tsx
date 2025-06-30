
import React, { useState } from 'react';
import { Check, Star } from 'lucide-react';

interface PlanosEconomiaProps {
  dadosCooperado: any;
}

export const PlanosEconomia: React.FC<PlanosEconomiaProps> = ({
  dadosCooperado
}) => {
  const [consumoCalculadora, setConsumoCalculadora] = useState(450);
  const [bandeiraCalculadora, setBandeiraCalculadora] = useState('Verde');

  const calcularEconomia = (consumo: number, bandeira: string, desconto: number) => {
    const tarifaBase = 0.595; // R$/kWh base
    const taxaBandeira = {
      'Verde': 0,
      'Amarela': 0.0187,
      'Vermelha 1': 0.0374,
      'Vermelha 2': 0.0935
    }[bandeira] || 0;

    const valorSemDesconto = consumo * (tarifaBase + taxaBandeira);
    const valorComDesconto = valorSemDesconto * (1 - desconto / 100);
    const economia = valorSemDesconto - valorComDesconto;

    return { valorSemDesconto, valorComDesconto, economia };
  };

  return (
    <div className="space-y-6">
      <div className="dashboard-card p-6">
        <h1 className="text-2xl font-bold text-sion-text mb-4">Planos e Economia</h1>
        <p className="text-sion-text-secondary">
          Compare nossos planos e calcule sua economia potencial
        </p>
      </div>

      {/* Comparador de Planos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(dadosCooperado.planos).map(([key, plano]: [string, any]) => (
          <div
            key={key}
            className={`dashboard-card p-6 relative overflow-hidden ${
              key === 'ouro' ? 'border-2 border-sion-yellow' : ''
            }`}
          >
            {key === 'ouro' && (
              <div className="absolute top-0 right-0 bg-sion-yellow text-white px-3 py-1 text-sm font-bold rounded-bl-lg">
                <Star className="inline h-4 w-4 mr-1" />
                POPULAR
              </div>
            )}

            <div className="text-center mb-6">
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: plano.cor + '20', border: `2px solid ${plano.cor}` }}
              >
                <Star className="h-8 w-8" style={{ color: plano.cor }} />
              </div>
              <h3 className="text-xl font-bold text-sion-text">{plano.nome}</h3>
              <p className="text-3xl font-bold mt-2" style={{ color: plano.cor }}>
                {plano.desconto}%
              </p>
              <p className="text-sm text-sion-text-secondary">de desconto</p>
            </div>

            <ul className="space-y-3 mb-6">
              {plano.beneficios.map((beneficio: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-sion-green mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-sion-text">{beneficio}</span>
                </li>
              ))}
            </ul>

            <button 
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
                key === 'ouro'
                  ? 'bg-sion-yellow text-white hover:bg-sion-yellow/90'
                  : 'btn-secondary'
              }`}
            >
              {key === 'ouro' ? 'Plano Atual' : 'Migrar para este Plano'}
            </button>
          </div>
        ))}
      </div>

      {/* Calculadora de Economia */}
      <div className="dashboard-card p-6">
        <h3 className="text-xl font-bold text-sion-text mb-6">Calculadora de Economia</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              Consumo Mensal (kWh)
            </label>
            <input
              type="number"
              value={consumoCalculadora}
              onChange={(e) => setConsumoCalculadora(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              Bandeira Tarifária
            </label>
            <select
              value={bandeiraCalculadora}
              onChange={(e) => setBandeiraCalculadora(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
            >
              <option value="Verde">Verde</option>
              <option value="Amarela">Amarela</option>
              <option value="Vermelha 1">Vermelha 1</option>
              <option value="Vermelha 2">Vermelha 2</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {Object.entries(dadosCooperado.planos).map(([key, plano]: [string, any]) => {
            const resultado = calcularEconomia(consumoCalculadora, bandeiraCalculadora, plano.desconto);
            
            return (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-sion-text mb-3">{plano.nome}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-sion-text-secondary">Sem desconto:</span>
                    <span>R$ {resultado.valorSemDesconto.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sion-text-secondary">Com SION:</span>
                    <span className="font-medium">R$ {resultado.valorComDesconto.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium">Economia:</span>
                    <span className="font-bold text-sion-green">R$ {resultado.economia.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-sion-blue/10 to-sion-green/10 rounded-lg">
          <h4 className="font-bold text-sion-text mb-2">💡 Dica de Economia</h4>
          <p className="text-sm text-sion-text-secondary">
            O Plano Ouro oferece a maior economia e benefícios exclusivos. 
            Com o consumo informado, você pode economizar até R$ {
              calcularEconomia(consumoCalculadora, bandeiraCalculadora, 25).economia.toFixed(2)
            } por mês!
          </p>
        </div>
      </div>
    </div>
  );
};
