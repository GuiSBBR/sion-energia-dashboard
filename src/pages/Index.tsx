
import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DashboardContent } from '@/components/DashboardContent';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { dadosCooperado } from '@/data/mockData';

const Index = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('analise');
  const [selectedUC, setSelectedUC] = useState('UC001');
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileSidebar(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMenuToggle = () => {
    if (isMobile) {
      setShowMobileSidebar(!showMobileSidebar);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (isMobile) {
      setShowMobileSidebar(false);
    }
  };

  return (
    <div className="min-h-screen bg-sion-bg w-full">
      {/* Mobile Sidebar Overlay */}
      {isMobile && showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      <div className="flex w-full">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isMobile={isMobile}
          showMobileSidebar={showMobileSidebar}
        />

        <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          !isMobile && !isSidebarCollapsed ? 'ml-72' : !isMobile ? 'ml-20' : ''
        }`}>
          <Header
            onMenuToggle={handleMenuToggle}
            clientName={dadosCooperado.nomeCliente}
            isMobile={isMobile}
          />

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <div className="max-w-screen-xl mx-auto">
              <DashboardContent
                activeSection={activeSection}
                selectedUC={selectedUC}
                selectedMonth={selectedMonth}
                onUCChange={setSelectedUC}
                onMonthChange={setSelectedMonth}
                dadosCooperado={dadosCooperado}
              />
            </div>
          </main>
        </div>
      </div>

      <WhatsAppFloat />
    </div>
  );
};

export default Index;
