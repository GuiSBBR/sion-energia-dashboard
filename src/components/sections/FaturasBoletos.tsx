
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface FaturasBoletoProps {
  selectedUC: string;
  onUCChange: (uc: string) => void;
  dadosCooperado: any;
}

export const FaturasBoletos: React.FC<FaturasBoletoProps> = ({
  selectedUC,
  onUCChange,
  dadosCooperado
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const ucAtual = dadosCooperado.unidadesConsumidoras[selectedUC];
  const historico = Object.entries(ucAtual?.historico || {}).sort().reverse();

  useEffect(() => {
    if (!chartRef.current || !ucAtual) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const meses = Object.keys(ucAtual.historico).sort();
    const valores = meses.map(mes => ucAtual.historico[mes].valorBoletoSion);

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses.map(mes => {
          const [ano, m] = mes.split('-');
          return `${m}/${ano}`;
        }),
        datasets: [{
          label: 'Valor Pago (R$)',
          data: valores,
          backgroundColor: '#384974',
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              callback: function(value) {
                return 'R$ ' + Number(value).toFixed(0);
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedUC, ucAtual]);

  return (
    <div className="space-y-6">
      <div className="dashboard-card p-6">
        <h1 className="text-2xl font-bold text-sion-text mb-4">Faturas e Boletos</h1>
        <p className="text-sion-text-secondary mb-6">
          Histórico detalhado de suas faturas e boletos
        </p>

        <div>
          <label className="block text-sm font-medium text-sion-text mb-2">
            Unidade Consumidora
          </label>
          <select
            value={selectedUC}
            onChange={(e) => onUCChange(e.target.value)}
            className="max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
          >
            {Object.entries(dadosCooperado.unidadesConsumidoras).map(([id, uc]: [string, any]) => (
              <option key={id} value={id}>
                {uc.nome} - {uc.endereco}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabela de Faturas */}
      <div className="dashboard-card p-6">
        <h3 className="text-xl font-bold text-sion-text mb-6">Histórico de Faturas</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Mês/Ano</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Valor SION</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Vencimento</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Status</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Ações</th>
              </tr>
            </thead>
            <tbody>
              {historico.map(([mes, dados]: [string, any]) => {
                const [ano, m] = mes.split('-');
                const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                
                return (
                  <tr key={mes} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-medium text-sion-text">
                        {nomesMeses[parseInt(m) - 1]} {ano}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-lg font-bold text-sion-text">
                        R$ {dados.valorBoletoSion?.toFixed(2) || '0.00'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sion-text">
                        {new Date(dados.vencimento).toLocaleDateString('pt-BR')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={dados.status === 'Pago' ? 'status-paid' : 'status-pending'}>
                        {dados.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="btn-secondary text-sm px-3 py-1">
                          2ª Via Distribuidora
                        </button>
                        <button className="btn-secondary text-sm px-3 py-1">
                          2ª Via SION
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico de Valores Pagos */}
      <div className="dashboard-card p-6">
        <h3 className="text-xl font-bold text-sion-text mb-6">Valor Pago por Mês</h3>
        <div style={{ height: '300px' }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="metric-card">
          <h3 className="text-sm font-medium text-sion-text-secondary mb-2">Total Pago</h3>
          <p className="text-2xl font-bold text-sion-text">
            R$ {historico.reduce((sum, [, dados]: [string, any]) => sum + (dados.valorBoletoSion || 0), 0).toFixed(2)}
          </p>
          <p className="text-sm text-sion-text-secondary">Últimos {historico.length} meses</p>
        </div>

        <div className="metric-card">
          <h3 className="text-sm font-medium text-sion-text-secondary mb-2">Economia Total</h3>
          <p className="text-2xl font-bold text-sion-green">
            R$ {historico.reduce((sum, [, dados]: [string, any]) => sum + (dados.economia || 0), 0).toFixed(2)}
          </p>
          <p className="text-sm text-sion-text-secondary">Economizado com a SION</p>
        </div>

        <div className="metric-card">
          <h3 className="text-sm font-medium text-sion-text-secondary mb-2">Média Mensal</h3>
          <p className="text-2xl font-bold text-sion-text">
            R$ {(historico.reduce((sum, [, dados]: [string, any]) => sum + (dados.valorBoletoSion || 0), 0) / historico.length).toFixed(2)}
          </p>
          <p className="text-sm text-sion-text-secondary">Valor médio das faturas</p>
        </div>
      </div>
    </div>
  );
};
