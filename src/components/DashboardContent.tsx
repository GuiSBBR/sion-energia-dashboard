
import React from 'react';
import { AnaliseUnidade } from './sections/AnaliseUnidade';
import { VisaoConsolidada } from './sections/VisaoConsolidada';
import { PlanosEconomia } from './sections/PlanosEconomia';
import { FaturasBoletos } from './sections/FaturasBoletos';
import { Sustentabilidade } from './sections/Sustentabilidade';
import { DadosCadastrais } from './sections/DadosCadastrais';

interface DashboardContentProps {
  activeSection: string;
  selectedUC: string;
  selectedMonth: string;
  onUCChange: (uc: string) => void;
  onMonthChange: (month: string) => void;
  dadosCooperado: any;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({
  activeSection,
  selectedUC,
  selectedMonth,
  onUCChange,
  onMonthChange,
  dadosCooperado
}) => {
  const commonProps = {
    selectedUC,
    selectedMonth,
    onUCChange,
    onMonthChange,
    dadosCooperado
  };

  return (
    <div className="animate-fade-in">
      {activeSection === 'analise' && <AnaliseUnidade {...commonProps} />}
      {activeSection === 'consolidada' && <VisaoConsolidada {...commonProps} />}
      {activeSection === 'planos' && <PlanosEconomia {...commonProps} />}
      {activeSection === 'faturas' && <FaturasBoletos {...commonProps} />}
      {activeSection === 'sustentabilidade' && <Sustentabilidade {...commonProps} />}
      {activeSection === 'cadastro' && <DadosCadastrais {...commonProps} />}
    </div>
  );
};
