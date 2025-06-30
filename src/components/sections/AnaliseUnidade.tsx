
import React, { useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Chart, registerables } from 'chart.js';
import { bandeirasTarifarias } from '@/data/mockData';

Chart.register(...registerables);

interface AnaliseUnidadeProps {
  selectedUC: string;
  selectedMonth: string;
  onUCChange: (uc: string) => void;
  onMonthChange: (month: string) => void;
  dadosCooperado: any;
}

export const AnaliseUnidade: React.FC<AnaliseUnidadeProps> = ({
  selectedUC,
  selectedMonth,
  onUCChange,
  onMonthChange,
  dadosCooperado
}) => {
  const economiaChartRef = useRef<HTMLCanvasElement>(null);
  const consumoChartRef = useRef<HTMLCanvasElement>(null);
  const economiaChartInstance = useRef<Chart | null>(null);
  const consumoChartInstance = useRef<Chart | null>(null);

  const ucAtual = dadosCooperado.unidadesConsumidoras[selectedUC];
  const dadosMes = ucAtual?.historico[selectedMonth];
  const mesesDisponiveis = Object.keys(ucAtual?.historico || {}).sort().reverse();

  // Calcular variação do consumo
  const mesAnteriorIndex = mesesDisponiveis.findIndex(m => m === selectedMonth) + 1;
  const mesAnterior = mesesDisponiveis[mesAnteriorIndex];
  const consumoAnterior = mesAnterior ? ucAtual.historico[mesAnterior].consumo : 0;
  const variacaoConsumo = consumoAnterior ? ((dadosMes?.consumo - consumoAnterior) / consumoAnterior) * 100 : 0;

  useEffect(() => {
    if (!economiaChartRef.current || !ucAtual) return;

    // Destruir gráfico anterior
    if (economiaChartInstance.current) {
      economiaChartInstance.current.destroy();
    }

    const ctx = economiaChartRef.current.getContext('2d');
    if (!ctx) return;

    const meses = Object.keys(ucAtual.historico).sort();
    const economiasAcumuladas = meses.reduce((acc, mes, index) => {
      const economiaAnterior = index > 0 ? acc[index - 1] : 0;
      const economiaAtual = ucAtual.historico[mes].economia;
      acc.push(economiaAnterior + economiaAtual);
      return acc;
    }, [] as number[]);

    economiaChartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: meses.map(mes => {
          const [ano, m] = mes.split('-');
          return `${m}/${ano}`;
        }),
        datasets: [{
          label: 'Economia Acumulada (R$)',
          data: economiasAcumuladas,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#10b981'
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
              color: 'rgba(0, 0, 0, 0.05)'
            }
          }
        }
      }
    });

    return () => {
      if (economiaChartInstance.current) {
        economiaChartInstance.current.destroy();
      }
    };
  }, [selectedUC, ucAtual]);

  useEffect(() => {
    if (!consumoChartRef.current || !ucAtual) return;

    if (consumoChartInstance.current) {
      consumoChartInstance.current.destroy();
    }

    const ctx = consumoChartRef.current.getContext('2d');
    if (!ctx) return;

    const meses = Object.keys(ucAtual.historico).sort();
    const consumos = meses.map(mes => ucAtual.historico[mes].consumo);

    consumoChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: meses.map(mes => {
          const [ano, m] = mes.split('-');
          return `${m}/${ano}`;
        }),
        datasets: [{
          label: 'Consumo (kWh)',
          data: consumos,
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
                return value + ' kWh';
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
      if (consumoChartInstance.current) {
        consumoChartInstance.current.destroy();
      }
    };
  }, [selectedUC, ucAtual]);

  if (!dadosMes) {
    return <div>Dados não encontrados</div>;
  }

  const bandeira = bandeirasTarifarias[dadosMes.bandeiraTarifaria as keyof typeof bandeirasTarifarias];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="dashboard-card p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-sion-text mb-2">
              Unidade Consumidora
            </label>
            <select
              value={selectedUC}
              onChange={(e) => onUCChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
            >
              {Object.entries(dadosCooperado.unidadesConsumidoras).map(([id, uc]: [string, any]) => (
                <option key={id} value={id}>
                  {uc.nome} - {uc.endereco}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-sion-text mb-2">
              Mês de Referência
            </label>
            <select
              value={selectedMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
            >
              {mesesDisponiveis.map(mes => {
                const [ano, m] = mes.split('-');
                const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                return (
                  <option key={mes} value={mes}>
                    {nomesMeses[parseInt(m) - 1]} {ano}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Comparativo Principal */}
      <div className="dashboard-card p-8 bg-gradient-to-r from-sion-blue to-sion-blue/80 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Sua Economia com a SION</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Valor sem a SION</p>
            <p className="text-3xl font-bold text-red-200">R$ {dadosMes.valorSemSion.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Valor com a SION</p>
            <p className="text-3xl font-bold text-green-200">R$ {dadosMes.valorBoletoSion.toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm opacity-90 mb-2">Você economizou</p>
            <p className="text-4xl font-bold text-yellow-300">R$ {dadosMes.economia.toFixed(2)}</p>
            <p className="text-sm opacity-90">
              {((dadosMes.economia / dadosMes.valorSemSion) * 100).toFixed(1)}% de desconto
            </p>
          </div>
        </div>
      </div>

      {/* Cards de Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-sion-text-secondary">Economia no Mês</h3>
            <div className="h-2 w-2 bg-sion-green rounded-full"></div>
          </div>
          <p className="text-3xl font-bold text-sion-green mb-2">
            R$ {dadosMes.economia.toFixed(2)}
          </p>
          <p className="text-sm text-sion-text-secondary">
            {((dadosMes.economia / dadosMes.valorSemSion) * 100).toFixed(1)}% de desconto
          </p>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-sion-text-secondary">Consumo no Mês</h3>
            <div className="h-2 w-2 bg-sion-blue rounded-full"></div>
          </div>
          <p className="text-3xl font-bold text-sion-text mb-2">
            {dadosMes.consumo} kWh
          </p>
          <div className="flex items-center text-sm">
            {variacaoConsumo > 0 ? (
              <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
            )}
            <span className={variacaoConsumo > 0 ? 'text-red-500' : 'text-green-500'}>
              {Math.abs(variacaoConsumo).toFixed(1)}%
            </span>
            <span className="text-sion-text-secondary ml-1">vs mês anterior</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-sion-text-secondary">Plano Atual</h3>
            <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
          </div>
          <p className="text-xl font-bold text-sion-text mb-2">
            {ucAtual.planoAtual}
          </p>
          <p className="text-sm text-sion-text-secondary">
            {dadosCooperado.planos.ouro.desconto}% de desconto
          </p>
        </div>

        <div className="metric-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-sion-text-secondary">Bandeira Tarifária</h3>
            <div 
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: bandeira.cor }}
            ></div>
          </div>
          <p className="text-xl font-bold text-sion-text mb-2">
            {dadosMes.bandeiraTarifaria}
          </p>
          <p className="text-sm text-sion-text-secondary">
            {bandeira.taxa > 0 ? `+R$ ${bandeira.taxa.toFixed(4)}/kWh` : 'Sem taxa adicional'}
          </p>
        </div>
      </div>

      {/* Fatura e Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card de Fatura */}
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-bold text-sion-text mb-4">Fatura do Mês</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sion-text-secondary">Valor do Boleto SION</span>
              <span className="text-2xl font-bold text-sion-text">
                R$ {dadosMes.valorBoletoSion.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sion-text-secondary">Vencimento</span>
              <span className="font-medium">
                {new Date(dadosMes.vencimento).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sion-text-secondary">Status</span>
              <span className={dadosMes.status === 'Pago' ? 'status-paid' : 'status-pending'}>
                {dadosMes.status}
              </span>
            </div>
            <div className="pt-4 space-y-2">
              <button className="btn-primary w-full">Pagar Agora</button>
              <button className="btn-secondary w-full">Baixar 2ª Via</button>
            </div>
          </div>
        </div>

        {/* Gráfico de Economia Acumulada */}
        <div className="lg:col-span-2 dashboard-card p-6">
          <h3 className="text-lg font-bold text-sion-text mb-4">Economia Acumulada</h3>
          <div style={{ height: '300px' }}>
            <canvas ref={economiaChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Gráfico de Consumo */}
      <div className="dashboard-card p-6">
        <h3 className="text-lg font-bold text-sion-text mb-4">Evolução do Consumo Mensal</h3>
        <div style={{ height: '300px' }}>
          <canvas ref={consumoChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};
