
import React from 'react';

interface VisaoConsolidadaProps {
  selectedMonth: string;
  dadosCooperado: any;
}

export const VisaoConsolidada: React.FC<VisaoConsolidadaProps> = ({
  selectedMonth,
  dadosCooperado
}) => {
  // Calcular totais consolidados
  const totaisConsolidados = Object.entries(dadosCooperado.unidadesConsumidoras).reduce(
    (totais: any, [ucId, ucData]: [string, any]) => {
      const dadosMes = ucData.historico[selectedMonth];
      if (dadosMes) {
        totais.economiaTotal += dadosMes.economia;
        totais.consumoTotal += dadosMes.consumo;
        totais.valorTotalSion += dadosMes.valorBoletoSion;
        totais.valorTotalSemSion += dadosMes.valorSemSion;
        totais.boletos.push({
          ucId,
          nome: ucData.nome,
          valor: dadosMes.valorBoletoSion,
          vencimento: dadosMes.vencimento,
          status: dadosMes.status
        });
      }
      return totais;
    },
    {
      economiaTotal: 0,
      consumoTotal: 0,
      valorTotalSion: 0,
      valorTotalSemSion: 0,
      boletos: []
    }
  );

  return (
    <div className="space-y-6">
      <div className="dashboard-card p-6">
        <h1 className="text-2xl font-bold text-sion-text mb-6">Visão Consolidada</h1>
        <p className="text-sion-text-secondary">
          Resumo de todas as suas unidades consumidoras para o mês selecionado
        </p>
      </div>

      {/* Cards de Destaque Consolidados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card bg-gradient-to-br from-sion-green to-sion-green/80 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">Economia Total no Mês</h3>
          <p className="text-3xl font-bold mb-2">
            R$ {totaisConsolidados.economiaTotal.toFixed(2)}
          </p>
          <p className="text-sm opacity-90">
            {((totaisConsolidados.economiaTotal / totaisConsolidados.valorTotalSemSion) * 100).toFixed(1)}% de desconto total
          </p>
        </div>

        <div className="metric-card bg-gradient-to-br from-sion-blue to-sion-blue/80 text-white">
          <h3 className="text-sm font-medium opacity-90 mb-2">Consumo Total no Mês</h3>
          <p className="text-3xl font-bold mb-2">
            {totaisConsolidados.consumoTotal} kWh
          </p>
          <p className="text-sm opacity-90">
            {Object.keys(dadosCooperado.unidadesConsumidoras).length} unidades
          </p>
        </div>

        <div className="metric-card">
          <h3 className="text-sm font-medium text-sion-text-secondary mb-2">Valor Total SION</h3>
          <p className="text-3xl font-bold text-sion-text mb-2">
            R$ {totaisConsolidados.valorTotalSion.toFixed(2)}
          </p>
          <p className="text-sm text-sion-text-secondary">
            Valor que você paga
          </p>
        </div>

        <div className="metric-card">
          <h3 className="text-sm font-medium text-sion-text-secondary mb-2">Valor sem SION</h3>
          <p className="text-3xl font-bold text-red-500 mb-2">
            R$ {totaisConsolidados.valorTotalSemSion.toFixed(2)}
          </p>
          <p className="text-sm text-sion-text-secondary">
            Valor da distribuidora
          </p>
        </div>
      </div>

      {/* Painel de Boletos */}
      <div className="dashboard-card p-6">
        <h3 className="text-xl font-bold text-sion-text mb-6">Boletos do Mês</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Unidade</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Valor</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Vencimento</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Status</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Ações</th>
              </tr>
            </thead>
            <tbody>
              {totaisConsolidados.boletos.map((boleto: any, index: number) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-sion-text">{boleto.nome}</p>
                      <p className="text-sm text-sion-text-secondary">{boleto.ucId}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-lg font-bold text-sion-text">
                      R$ {boleto.valor.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sion-text">
                      {new Date(boleto.vencimento).toLocaleDateString('pt-BR')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={boleto.status === 'Pago' ? 'status-paid' : 'status-pending'}>
                      {boleto.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button 
                        className="btn-primary text-sm px-3 py-1"
                        disabled={boleto.status === 'Pago'}
                      >
                        Pagar
                      </button>
                      <button className="btn-secondary text-sm px-3 py-1">
                        2ª Via
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 bg-sion-bg rounded-lg border border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold text-sion-text">Total a Pagar</p>
              <p className="text-sm text-sion-text-secondary">
                {totaisConsolidados.boletos.filter((b: any) => b.status === 'Em Aberto').length} boletos em aberto
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-sion-text">
                R$ {totaisConsolidados.boletos
                  .filter((b: any) => b.status === 'Em Aberto')
                  .reduce((sum: number, b: any) => sum + b.valor, 0)
                  .toFixed(2)}
              </p>
              <button className="btn-primary mt-2">
                Pagar Todos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resumo por Unidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Object.entries(dadosCooperado.unidadesConsumidoras).map(([ucId, ucData]: [string, any]) => {
          const dadosMes = ucData.historico[selectedMonth];
          if (!dadosMes) return null;

          return (
            <div key={ucId} className="dashboard-card p-6">
              <h4 className="font-bold text-sion-text mb-3">{ucData.nome}</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sion-text-secondary">Consumo</span>
                  <span className="font-medium">{dadosMes.consumo} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sion-text-secondary">Economia</span>
                  <span className="font-medium text-sion-green">
                    R$ {dadosMes.economia.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sion-text-secondary">Valor SION</span>
                  <span className="font-medium">R$ {dadosMes.valorBoletoSion.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <span className={dadosMes.status === 'Pago' ? 'status-paid' : 'status-pending'}>
                    {dadosMes.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
