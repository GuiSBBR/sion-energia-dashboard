
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FaturaBoletosProps {
  selectedUC: string;
  selectedMonth: string;
  onUCChange: (uc: string) => void;
  onMonthChange: (month: string) => void;
  dadosCooperado: any;
}

export const FaturasBoletos: React.FC<FaturaBoletosProps> = ({
  selectedUC,
  selectedMonth,
  onUCChange,
  onMonthChange,
  dadosCooperado
}) => {
  const ucData = dadosCooperado.unidadesConsumidoras[selectedUC];
  
  // Dados para gráfico de histórico de valores
  const historicoValores = Object.entries(ucData?.historico || {}).map(([mes, dados]: [string, any]) => ({
    mes: new Date(mes).toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
    valorSion: dados?.valorBoletoSion || 0,
    economia: dados?.economia || 0
  }));

  return (
    <div className="space-y-6">
      <div className="dashboard-card p-6">
        <h1 className="text-2xl font-bold text-sion-text mb-6">Faturas e Boletos</h1>
        
        {/* Filtros */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-sion-text-secondary mb-2">
              Unidade Consumidora
            </label>
            <select 
              value={selectedUC}
              onChange={(e) => onUCChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
            >
              {Object.entries(dadosCooperado.unidadesConsumidoras).map(([ucId, ucData]: [string, any]) => (
                <option key={ucId} value={ucId}>
                  {ucData.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Histórico de Faturas */}
      <div className="dashboard-card p-6">
        <h3 className="text-xl font-bold text-sion-text mb-6">Histórico de Faturas - {ucData?.nome}</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Mês/Ano</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Valor SION</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Economia</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Vencimento</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Status</th>
                <th className="text-left py-3 px-4 font-medium text-sion-text-secondary">Ações</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(ucData?.historico || {}).map(([mes, dados]: [string, any]) => (
                <tr key={mes} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="font-medium text-sion-text">
                      {new Date(mes).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-lg font-bold text-sion-text">
                      R$ {dados?.valorBoletoSion?.toFixed(2) || '0.00'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-lg font-bold text-sion-green">
                      R$ {dados?.economia?.toFixed(2) || '0.00'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sion-text">
                      {dados?.vencimento ? new Date(dados.vencimento).toLocaleDateString('pt-BR') : '-'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={dados?.status === 'Pago' ? 'status-paid' : 'status-pending'}>
                      {dados?.status || 'Pendente'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="btn-secondary text-sm px-3 py-1">
                        2ª Via Distribuidora
                      </button>
                      <button className="btn-primary text-sm px-3 py-1">
                        2ª Via SION
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico de Histórico de Valores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="dashboard-card p-6">
          <h3 className="text-lg font-bold text-sion-text mb-4">Evolução dos Valores Pagos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historicoValores}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  `R$ ${Number(value || 0).toFixed(2)}`, 
                  name === 'valorSion' ? 'Valor SION' : 'Economia'
                ]}
              />
              <Bar dataKey="valorSion" fill="#384974" name="valorSion" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-card p-6">
          <h3 className="text-lg font-bold text-sion-text mb-4">Evolução da Economia</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicoValores}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value: any) => [`R$ ${Number(value || 0).toFixed(2)}`, 'Economia']}
              />
              <Line 
                type="monotone" 
                dataKey="economia" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="economia"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
