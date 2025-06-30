
import React, { useState } from 'react';
import { Users, Mail, Check } from 'lucide-react';

interface DadosCadastraisProps {
  dadosCooperado: any;
}

export const DadosCadastrais: React.FC<DadosCadastraisProps> = ({
  dadosCooperado
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dadosEditados, setDadosEditados] = useState({
    nomeCliente: dadosCooperado.nomeCliente,
    email: dadosCooperado.email,
    telefone: dadosCooperado.telefone,
    endereco: { ...dadosCooperado.endereco }
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    // Aqui você salvaria os dados no backend
    console.log('Dados salvos:', dadosEditados);
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setDadosEditados({
      nomeCliente: dadosCooperado.nomeCliente,
      email: dadosCooperado.email,
      telefone: dadosCooperado.telefone,
      endereco: { ...dadosCooperado.endereco }
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="dashboard-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-sion-blue rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sion-text">Dados Cadastrais</h1>
              <p className="text-sion-text-secondary">Mantenha suas informações sempre atualizadas</p>
            </div>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-primary"
            >
              Editar Dados
            </button>
          )}
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-sion-green/10 border border-sion-green/20 rounded-lg flex items-center">
            <Check className="h-5 w-5 text-sion-green mr-3" />
            <span className="text-sion-green font-medium">Dados atualizados com sucesso!</span>
          </div>
        )}
      </div>

      {/* Informações Pessoais */}
      <div className="dashboard-card p-6">
        <h3 className="text-lg font-bold text-sion-text mb-6">Informações Pessoais</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              Nome Completo
            </label>
            {isEditing ? (
              <input
                type="text"
                value={dadosEditados.nomeCliente}
                onChange={(e) => setDadosEditados({
                  ...dadosEditados,
                  nomeCliente: e.target.value
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              />
            ) : (
              <p className="text-sion-text py-2">{dadosCooperado.nomeCliente}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              CPF
            </label>
            <p className="text-sion-text-secondary py-2">{dadosCooperado.cpf}</p>
            <span className="text-xs text-sion-text-secondary">* CPF não pode ser alterado</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              E-mail
            </label>
            {isEditing ? (
              <input
                type="email"
                value={dadosEditados.email}
                onChange={(e) => setDadosEditados({
                  ...dadosEditados,
                  email: e.target.value
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              />
            ) : (
              <div className="flex items-center py-2">
                <Mail className="h-4 w-4 text-sion-text-secondary mr-2" />
                <span className="text-sion-text">{dadosCooperado.email}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              Telefone
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={dadosEditados.telefone}
                onChange={(e) => setDadosEditados({
                  ...dadosEditados,
                  telefone: e.target.value
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              />
            ) : (
              <p className="text-sion-text py-2">{dadosCooperado.telefone}</p>
            )}
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div className="dashboard-card p-6">
        <h3 className="text-lg font-bold text-sion-text mb-6">Endereço</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-sion-text mb-2">
              Rua
            </label>
            {isEditing ? (
              <input
                type="text"
                value={dadosEditados.endereco.rua}
                onChange={(e) => setDadosEditados({
                  ...dadosEditados,
                  endereco: { ...dadosEditados.endereco, rua: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              />
            ) : (
              <p className="text-sion-text py-2">{dadosCooperado.endereco.rua}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              Bairro
            </label>
            {isEditing ? (
              <input
                type="text"
                value={dadosEditados.endereco.bairro}
                onChange={(e) => setDadosEditados({
                  ...dadosEditados,
                  endereco: { ...dadosEditados.endereco, bairro: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              />
            ) : (
              <p className="text-sion-text py-2">{dadosCooperado.endereco.bairro}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              Cidade
            </label>
            {isEditing ? (
              <input
                type="text"
                value={dadosEditados.endereco.cidade}
                onChange={(e) => setDadosEditados({
                  ...dadosEditados,
                  endereco: { ...dadosEditados.endereco, cidade: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              />
            ) : (
              <p className="text-sion-text py-2">{dadosCooperado.endereco.cidade}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              CEP
            </label>
            {isEditing ? (
              <input
                type="text"
                value={dadosEditados.endereco.cep}
                onChange={(e) => setDadosEditados({
                  ...dadosEditados,
                  endereco: { ...dadosEditados.endereco, cep: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              />
            ) : (
              <p className="text-sion-text py-2">{dadosCooperado.endereco.cep}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-sion-text mb-2">
              Estado
            </label>
            {isEditing ? (
              <select
                value={dadosEditados.endereco.estado}
                onChange={(e) => setDadosEditados({
                  ...dadosEditados,
                  endereco: { ...dadosEditados.endereco, estado: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sion-blue focus:border-transparent"
              >
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                {/* Adicionar outros estados */}
              </select>
            ) : (
              <p className="text-sion-text py-2">{dadosCooperado.endereco.estado}</p>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-4 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="btn-primary"
            >
              Salvar Alterações
            </button>
            <button
              onClick={handleCancel}
              className="btn-secondary"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* Unidades Consumidoras */}
      <div className="dashboard-card p-6">
        <h3 className="text-lg font-bold text-sion-text mb-6">Unidades Consumidoras</h3>
        
        <div className="space-y-4">
          {Object.entries(dadosCooperado.unidadesConsumidoras).map(([ucId, ucData]: [string, any]) => (
            <div key={ucId} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-sion-text">{ucData.nome}</h4>
                  <p className="text-sm text-sion-text-secondary mt-1">{ucData.endereco}</p>
                  <p className="text-sm text-sion-text-secondary">
                    Distribuidora: {ucData.distribuidora} | Plano: {ucData.planoAtual}
                  </p>
                </div>
                <span className="px-3 py-1 bg-sion-green/10 text-sion-green text-sm rounded-full font-medium">
                  Ativa
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sion-text mb-2">Precisa adicionar uma nova unidade?</h4>
          <p className="text-sm text-sion-text-secondary mb-3">
            Entre em contato conosco para incluir uma nova unidade consumidora em sua conta.
          </p>
          <button className="btn-secondary text-sm">
            Solicitar Nova UC
          </button>
        </div>
      </div>
    </div>
  );
};
