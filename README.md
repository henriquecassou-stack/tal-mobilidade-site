# Site TAL Mobilidade Urbana

Site estático (HTML + CSS + JS puro), sem build. Para publicar, envie a pasta inteira para qualquer hospedagem estática (Netlify, Vercel, Hostinger, GitHub Pages).

## Onde editar

| O quê | Arquivo |
|---|---|
| Modelos, preços, specs, fotos dos modelos | `js/config.js` → `modelos` |
| Número do WhatsApp (mensagem pré-preenchida) | `js/config.js` → `whatsapp.numero` |
| Tarifa de energia e consumo da calculadora | `js/config.js` → `calculadora` |
| Fotos e depoimentos de clientes | `js/config.js` → `galeria`, `depoimentos` |
| Horários e fotos da loja | `js/config.js` → `loja` |
| Textos das seções, SEO, telefone no schema | `index.html` |
| Cores e fontes | `css/style.css` → `:root` |

## Fotos

- Use **WebP**, comprimidas (≈ 80% de qualidade).
- Modelos: PNG/WebP **recortado com fundo transparente**, ~1200 px de largura → `assets/img/modelos/`.
- Clientes: ~1000 px, proporção 4:5 → `assets/img/clientes/`.
- Loja: ~1600 px → `assets/img/loja/`.
- Enquanto um campo `foto` estiver vazio, o site mostra uma ilustração/moldura marcada como PLACEHOLDER.

## Pendências (PLACEHOLDER)

- Arquivo oficial do logo (hoje é um wordmark provisório em SVG no `index.html`)
- Número de WhatsApp com DDD (o link `wa.me/message/...` não aceita texto automático)
- Nome e specs da moto rosa (R$ 3.999) e da chopper; demais modelos/cores
- Specs de cor/estilo do Y1
- Horários, fotos da fachada/showroom, fotos e depoimentos de clientes
- Domínio, telefone e CEP no JSON-LD (`index.html`), imagem de compartilhamento `assets/img/og-tal.jpg`
- Validar com a loja os benefícios da seção "Por que elétrica" e os valores de referência da calculadora

## Rodar localmente

```
python -m http.server 5173
```
