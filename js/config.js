/* =============================================================
   TAL Mobilidade Urbana — CONFIGURAÇÃO DO SITE
   Edite aqui fotos, preços, modelos e valores da calculadora.
   Tudo marcado com PLACEHOLDER precisa ser confirmado com a loja.
   ============================================================= */
window.TAL = {

  /* ---------- WhatsApp ----------
     O link "wa.me/message/..." NÃO aceita mensagem pré-preenchida.
     Para os botões "Quero essa" já abrirem com o texto do modelo,
     preencha `numero` só com dígitos: 55 + DDD + número (ex.: "5541999999999").
     Enquanto `numero` estiver vazio, o site usa o link abaixo e copia
     a mensagem para a área de transferência do cliente. */
  whatsapp: {
    link: "https://wa.me/message/WVK6FG4PKO2HM1",
    numero: "", // PLACEHOLDER — ex.: "5541900000000"
    mensagemPadrao: "Olá, TAL! Vim pelo site e quero conhecer as scooters elétricas ⚡"
  },

  instagram: "https://www.instagram.com/tal_mobilidade/",

  /* ---------- Loja ---------- */
  loja: {
    endereco: "Avenida Jacob Macanhan, 4134 — Pinhais/PR",
    horarios: [
      // PLACEHOLDER — confirmar com a loja
      { dias: "Segunda a sexta", horas: "[PLACEHOLDER]" },
      { dias: "Sábado", horas: "[PLACEHOLDER]" },
      { dias: "Domingo e feriados", horas: "[PLACEHOLDER]" }
    ],
    // Fotos da loja (WebP recomendado, ~1600px de largura). Vazio = moldura placeholder.
    fotoFachada: "",   // ex.: "assets/img/loja/fachada.webp"
    fotoShowroom: ""   // ex.: "assets/img/loja/showroom.webp"
  },

  /* ---------- Modelos ----------
     Campos:
       nome          nome exibido (null = placeholder)
       apelido       selinho curto acima do nome
       descricao     uma linha sobre o modelo
       potencia      número em W (null = placeholder)
       autonomia     texto, ex. "50–60 km" (null = placeholder)
       autonomiaMax  número em km, usado no contador
       bateria       texto (null = placeholder)
       preco         número em R$ (null = "Consulte condições")
       oferta        true mostra selo "Oferta"
       destaque      true deixa o card grande
       estilo        "retro" | "urbana" | "chopper" — usado no filtro
       cor           cor do produto (aparece só na ilustração/brilho)
       ilustracao    "retro" | "cesta" | "chopper" — desenho usado enquanto não há foto
       foto          caminho da foto WebP recortada (fundo transparente de preferência)
       nomeWhats     como o modelo é citado na mensagem do WhatsApp
  */
  modelos: [
    {
      id: "retro",
      nome: "Retrô",
      apelido: "O queridinho",
      descricao: "Visual vintage, alma elétrica. O modelo que todo mundo para pra olhar.",
      potencia: 1000,
      autonomia: "50–60 km",
      autonomiaMax: 60,
      bateria: "Lítio",
      preco: null,
      oferta: false,
      destaque: true,
      estilo: "retro",
      cor: "#9FE3D2",
      ilustracao: "retro",
      foto: "", // ex.: "assets/img/modelos/retro.webp"
      nomeWhats: "Retrô"
    },
    {
      id: "y1",
      nome: "Y1",
      apelido: null,
      descricao: "Leve e econômica para o vai e vem do dia a dia.",
      potencia: 500,
      autonomia: "50–60 km",
      autonomiaMax: 60,
      bateria: "Lítio",
      preco: null,
      oferta: false,
      destaque: false,
      estilo: "urbana", // PLACEHOLDER — confirmar estilo
      cor: "#C9CED6",   // PLACEHOLDER — confirmar cor
      ilustracao: "retro",
      foto: "",
      nomeWhats: "Y1"
    },
    {
      id: "urbana-compacta",
      nome: null, // PLACEHOLDER — nome do modelo rosa com cestinha
      apelido: "Compacta com cestinha",
      descricao: "Pequena, charmosa e pronta pra rotina na cidade.",
      potencia: null,  // PLACEHOLDER
      autonomia: null, // PLACEHOLDER
      autonomiaMax: null,
      bateria: null,   // PLACEHOLDER
      preco: 3999,
      oferta: true,
      destaque: false,
      estilo: "urbana",
      cor: "#F5B8CF",
      ilustracao: "cesta",
      foto: "",
      nomeWhats: "moto urbana compacta rosa (oferta de R$ 3.999)"
    },
    {
      id: "chopper",
      nome: null, // PLACEHOLDER — nome do modelo chopper/fat tire
      apelido: "Fat tire · banco duplo",
      descricao: "Pneus largos, postura chopper e lugar pra garupa.",
      potencia: null,  // PLACEHOLDER
      autonomia: null, // PLACEHOLDER
      autonomiaMax: null,
      bateria: null,   // PLACEHOLDER
      preco: null,
      oferta: false,
      destaque: false,
      estilo: "chopper",
      cor: "#2A2E35",
      ilustracao: "chopper",
      foto: "",
      nomeWhats: "scooter chopper preta e prata (fat tire)"
    },
    {
      id: "novo-modelo",
      nome: null, // PLACEHOLDER — espaço para mais modelos/cores (ex.: amarelo)
      apelido: "Mais cores na loja",
      descricao: "Temos outras cores e versões no showroom. [PLACEHOLDER]",
      potencia: null,
      autonomia: null,
      autonomiaMax: null,
      bateria: null,
      preco: null,
      oferta: false,
      destaque: false,
      estilo: "urbana",
      cor: "#F4E07A",
      ilustracao: "retro",
      foto: "",
      nomeWhats: "outros modelos e cores disponíveis"
    }
  ],

  /* ---------- Calculadora de economia ----------
     Valores de referência — ajuste conforme a tarifa e o modelo. */
  calculadora: {
    tarifaKwh: 0.90,        // R$ por kWh (referência; conferir tarifa residencial Copel vigente)
    consumoKwhPorKm: 0.035, // kWh por km (referência para scooter 500–1000 W)
    padrao: {               // valores iniciais dos controles
      kmPorDia: 20,
      diasPorMes: 22,
      gastoMensal: 400      // R$/mês com combustível ou transporte
    },
    // Modelo usado na frase "a economia paga sua scooter em X meses"
    modeloReferenciaId: "urbana-compacta"
  },

  /* ---------- Clientes #vempraTal ---------- */
  galeria: [
    // PLACEHOLDER — fotos de clientes recebendo as scooters
    // { foto: "assets/img/clientes/cliente-01.webp", legenda: "Primeira scooter da Ana" },
    { foto: "", legenda: "[Foto de cliente — PLACEHOLDER]" },
    { foto: "", legenda: "[Foto de cliente — PLACEHOLDER]" },
    { foto: "", legenda: "[Foto de cliente — PLACEHOLDER]" },
    { foto: "", legenda: "[Foto de cliente — PLACEHOLDER]" },
    { foto: "", legenda: "[Foto de cliente — PLACEHOLDER]" }
  ],
  depoimentos: [
    // PLACEHOLDER — usar depoimentos reais, com autorização do cliente
    { texto: "[Depoimento real do cliente — PLACEHOLDER]", nome: "[Nome]", modelo: "[Modelo]" },
    { texto: "[Depoimento real do cliente — PLACEHOLDER]", nome: "[Nome]", modelo: "[Modelo]" },
    { texto: "[Depoimento real do cliente — PLACEHOLDER]", nome: "[Nome]", modelo: "[Modelo]" }
  ]
};
