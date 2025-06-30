
import React from 'react';
import { Menu, Bell, Users } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  clientName: string;
  isMobile: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  clientName,
  isMobile
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-5 w-5 text-sion-text" />
          </button>

          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-sion-blue rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-sion-text">
                Olá, {clientName.split(' ')[0]}!
              </h1>
              <p className="text-sm text-sion-text-secondary">
                Bem-vindo ao seu painel SION
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
            <Bell className="h-5 w-5 text-sion-text-secondary" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-sion-green rounded-full"></span>
          </button>

          <div className="hidden md:flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-sion-text">{clientName}</p>
              <p className="text-xs text-sion-text-secondary">Cooperado SION</p>
            </div>
            <div className="h-10 w-10 bg-gradient-to-br from-sion-blue to-sion-green rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {clientName.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
