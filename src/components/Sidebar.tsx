
import React from 'react';
import { Grid2x2, Users, Star, FileText, Shield } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile: boolean;
  showMobileSidebar: boolean;
}

const menuItems = [
  { id: 'analise', label: 'Análise da Unidade', icon: Grid2x2 },
  { id: 'consolidada', label: 'Visão Consolidada', icon: Users },
  { id: 'planos', label: 'Planos e Economia', icon: Star },
  { id: 'faturas', label: 'Faturas e Boletos', icon: FileText },
  { id: 'sustentabilidade', label: 'Sustentabilidade', icon: Shield },
  { id: 'cadastro', label: 'Dados Cadastrais', icon: Users }
];

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  activeSection,
  onSectionChange,
  isMobile,
  showMobileSidebar
}) => {
  const sidebarClasses = `
    fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 overflow-y-auto
    ${isMobile ? 'w-72' : isCollapsed ? 'w-20' : 'w-72'}
    ${isMobile ? (showMobileSidebar ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'}
  `;

  return (
    <aside className={sidebarClasses}>
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/ab5cc21f-aad9-41e0-a147-b5dbc9e28ffe.png" 
            alt="SION Cooperativa" 
            className={`transition-all duration-300 ${
              isCollapsed && !isMobile ? 'h-8 w-8' : 'h-12 w-auto'
            }`}
          />
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`
                  sidebar-item w-full text-left group
                  ${isActive ? 'active' : ''}
                `}
                title={isCollapsed && !isMobile ? item.label : undefined}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span 
                  className={`ml-3 transition-opacity duration-300 ${
                    isCollapsed && !isMobile ? 'opacity-0 w-0' : 'opacity-100'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className={`text-center text-xs text-sion-text-secondary ${
          isCollapsed && !isMobile ? 'hidden' : 'block'
        }`}>
          <p className="font-medium">SION Energia</p>
          <p>Cooperativa v2.0</p>
        </div>
      </div>
    </aside>
  );
};
