
export const dadosCooperado = {
  nomeCliente: "João Silva Santos",
  email: "joao.silva@email.com",
  telefone: "(11) 99999-9999",
  cpf: "123.456.789-00",
  endereco: {
    rua: "Rua das Flores, 123",
    bairro: "Centro",
    cidade: "São Paulo",
    cep: "01234-567",
    estado: "SP"
  },
  unidadesConsumidoras: {
    UC001: {
      nome: "Residência Principal",
      endereco: "Rua das Flores, 123 - Centro - São Paulo/SP",
      distribuidora: "Enel SP",
      planoAtual: "Plano Ouro",
      historico: {
        "2024-03": {
          consumo: 450,
          valorBoletoSion: 89.50,
          valorSemSion: 267.80,
          economia: 178.30,
          bandeiraTarifaria: "Verde",
          status: "Pago",
          vencimento: "2024-04-15",
          co2Evitado: 225.5,
          arvoresEquivalentes: 8.2
        },
        "2024-02": {
          consumo: 520,
          valorBoletoSion: 103.20,
          valorSemSion: 309.40,
          economia: 206.20,
          bandeiraTarifaria: "Amarela",
          status: "Pago",
          vencimento: "2024-03-15",
          co2Evitado: 260.8,
          arvoresEquivalentes: 9.5
        },
        "2024-01": {
          consumo: 380,
          valorBoletoSion: 75.60,
          valorSemSion: 226.20,
          economia: 150.60,
          bandeiraTarifaria: "Verde",
          status: "Pago",
          vencimento: "2024-02-15",
          co2Evitado: 190.6,
          arvoresEquivalentes: 6.9
        },
        "2023-12": {
          consumo: 490,
          valorBoletoSion: 97.30,
          valorSemSion: 291.90,
          economia: 194.60,
          bandeiraTarifaria: "Vermelha 1",
          status: "Pago",
          vencimento: "2024-01-15",
          co2Evitado: 245.8,
          arvoresEquivalentes: 8.9
        }
      }
    },
    UC002: {
      nome: "Casa de Praia",
      endereco: "Av. Beira Mar, 456 - Praia Grande - Santos/SP",
      distribuidora: "Enel SP",
      planoAtual: "Plano Prata",
      historico: {
        "2024-03": {
          consumo: 280,
          valorBoletoSion: 67.20,
          valorSemSion: 166.80,
          economia: 99.60,
          bandeiraTarifaria: "Verde",
          status: "Em Aberto",
          vencimento: "2024-04-18",
          co2Evitado: 140.4,
          arvoresEquivalentes: 5.1
        },
        "2024-02": {
          consumo: 320,
          valorBoletoSion: 76.80,
          valorSemSion: 190.40,
          economia: 113.60,
          bandeiraTarifaria: "Amarela",
          status: "Pago",
          vencimento: "2024-03-18",
          co2Evitado: 160.6,
          arvoresEquivalentes: 5.8
        },
        "2024-01": {
          consumo: 210,
          valorBoletoSion: 50.40,
          valorSemSion: 125.10,
          economia: 74.70,
          bandeiraTarifaria: "Verde",
          status: "Pago",
          vencimento: "2024-02-18",
          co2Evitado: 105.3,
          arvoresEquivalentes: 3.8
        },
        "2023-12": {
          consumo: 350,
          valorBoletoSion: 84.00,
          valorSemSion: 208.50,
          economia: 124.50,
          bandeiraTarifaria: "Vermelha 1",
          status: "Pago",
          vencimento: "2024-01-18",
          co2Evitado: 175.7,
          arvoresEquivalentes: 6.4
        }
      }
    },
    UC003: {
      nome: "Escritório Comercial",
      endereco: "Rua Augusta, 789 - Consolação - São Paulo/SP",
      distribuidora: "Enel SP",
      planoAtual: "Plano Livre",
      historico: {
        "2024-03": {
          consumo: 180,
          valorBoletoSion: 50.40,
          valorSemSion: 107.10,
          economia: 56.70,
          bandeiraTarifaria: "Verde",
          status: "Pago",
          vencimento: "2024-04-20",
          co2Evitado: 90.3,
          arvoresEquivalentes: 3.3
        },
        "2024-02": {
          consumo: 200,
          valorBoletoSion: 56.00,
          valorSemSion: 119.00,
          economia: 63.00,
          bandeiraTarifaria: "Amarela",
          status: "Pago",
          vencimento: "2024-03-20",
          co2Evitado: 100.4,
          arvoresEquivalentes: 3.6
        },
        "2024-01": {
          consumo: 160,
          valorBoletoSion: 44.80,
          valorSemSion: 95.20,
          economia: 50.40,
          bandeiraTarifaria: "Verde",
          status: "Pago",
          vencimento: "2024-02-20",
          co2Evitado: 80.2,
          arvoresEquivalentes: 2.9
        },
        "2023-12": {
          consumo: 220,
          valorBoletoSion: 61.60,
          valorSemSion: 130.90,
          economia: 69.30,
          bandeiraTarifaria: "Vermelha 1",
          status: "Pago",
          vencimento: "2024-01-20",
          co2Evitado: 110.5,
          arvoresEquivalentes: 4.0
        }
      }
    }
  },
  planos: {
    livre: {
      nome: "Plano Livre",
      desconto: 15,
      cor: "#6b7280",
      beneficios: [
        "15% de desconto na tarifa",
        "Energia 100% renovável",
        "Sem taxa de adesão",
        "Suporte via WhatsApp"
      ]
    },
    prata: {
      nome: "Plano Prata",
      desconto: 20,
      cor: "#9ca3af",
      beneficios: [
        "20% de desconto na tarifa",
        "Energia 100% renovável",
        "Consultoria energética",
        "Suporte prioritário",
        "Dashboard avançado"
      ]
    },
    ouro: {
      nome: "Plano Ouro",
      desconto: 25,
      cor: "#f59e0b",
      beneficios: [
        "25% de desconto na tarifa",
        "Energia 100% renovável",
        "Consultoria especializada",
        "Suporte 24/7",
        "Dashboard premium",
        "Relatórios personalizados"
      ]
    }
  }
};

export const bandeirasTarifarias = {
  "Verde": { cor: "#10b981", taxa: 0 },
  "Amarela": { cor: "#f59e0b", taxa: 0.0187 },
  "Vermelha 1": { cor: "#ef4444", taxa: 0.0374 },
  "Vermelha 2": { cor: "#dc2626", taxa: 0.0935 }
};
