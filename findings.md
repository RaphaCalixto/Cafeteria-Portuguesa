# Descobertas Técnicas e Arquitetura - Delta Cafés Replica

## 1. Identidade e Estética da Marca
- **Cores Principais**:
  - Vermelho Delta icônico: `#D12026` / `#BC1E2D` (usado em detalhes, botões e acentos de marca)
  - Café Profundo / Marrom Torrado: `#18110E` / `#221815` (fundo principal em áreas nobres, expressa riqueza do grão)
  - Creme / Bege Seda: `#F9F6F0` / `#F3EFE6` (fundos luminosos de alto contraste editorial)
  - Ouro / Âmbar Torrado: `#C5A880` / `#D4AF37` (acentos sofisticados)
  - Texto escuro: `#1F1F1F`, texto suave: `#6B6059`
- **Tipografia**:
  - Fonte display / manchete: Sans moderna e geométrica com personalidade marcante (estilo Montserrat / Syne / Plus Jakarta Sans) combinada com serifas editoriais para citações de tradição (Playfair / Instrument Serif).
- **Tom de Voz & Narrativa**:
  - "Delta, coffee with heart" (Um café com coração).
  - Tradição portuguesa iniciada pelo Comendador Rui Nabeiro em Campo Maior (1961).
  - Valores de solidariedade, proximidade humana, qualidade impecável e inovação sustentável.

## 2. Pilares de Animação e Interação
- GSAP com `ScrollTrigger` e `@gsap/react` via hook `useGSAP`.
- Transições de entrada escalonadas (stagger) para tipografia e cards de produto.
- Scroll suave e parallax nos elementos visuais do grão e xícaras.
- Hover states táteis nos produtos e botões com curvas Bézier orgânicas (`cubic-bezier(0.16, 1, 0.3, 1)`).

## 3. Conformidade com Diretrizes Globais
- Anti-"AI Slop": Estética deliberada, tipografia de impacto, paleta personalizada quente e rica, sem cartões genéricos cinza claro.
- Aceleração por GPU para animações (`transform: translate3d`, `opacity`), evitando layout shifts e repaints.

## 4. Estrutura e Ativos Extraídos do Site Oficial para Cultura & Quiz
- **Fundo**: Textura sutil oficial `product-bg-tile.png` repetida sobre base creme `#F4E4D2` / `#FBF6EE`.
- **A Cultura do Café**:
  - Título `A Cultura do Café` (em EN: `The Culture of Coffee`), cor `#35221A`.
  - Manifesto na coluna esquerda sobre os rituais e hábitos do café como património vivo.
  - Coluna direita em grid editorial com duas linhas divididas por linhas finas em tom café:
    - Linha 1: `Centro de Ciência do Café`, botão `Explorar →`, imagem botânica moderna `/imgs/culture/ccc.jpg`, descrição oficial.
    - Linha 2: `Academia Barista`, botão `Explorar →`, imagem `/imgs/culture/barista.jpg`, descrição oficial.
- **Delta Quiz**:
  - Anel orbital de 18 embalagens (`.outer-ring`) com distribuição polar radial `--degrees: calc(i * 360/18 * 1deg)` com translação circular em viewport units (`translateY(-33.75vw)` ou raio responsivo) e rotação inversa interna para manter os pacotes sempre verticais.
  - Centro do anel com subtítulo `Delta Quiz`, título `Vem descobrir o teu perfil de café`, descrição e botão pill `Iniciar Quiz →` com círculo amarelo e seta deslizante.
  - Modal interativo com quiz de múltipla escolha sensorial, barra de progresso em tempo real, seleção de intensidade e blend personalizado.
