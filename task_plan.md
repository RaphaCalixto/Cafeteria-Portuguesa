# Plano de Execução - Réplica Delta Cafés (Delta, coffee with heart)

## Visão Geral do Projeto
Reconstrução fiel (pixel & motion faithful) da landing page internacional da **Delta Cafés** (`https://deltacafes.com/en`), incorporando a estética editorial e calorosa da marca, microinterações refinadas, transições suaves, tipografia marcante e animações cinematográficas de scroll utilizando Next.js 15, TypeScript, Tailwind CSS e GSAP (@gsap/react + ScrollTrigger).

---

## Fases do Projeto

### Phase 1: Análise Detalhada do Site de Referência e Extração de Ativos
- Inspeção profunda de `site.html`, extração da hierarquia de seções, textos em inglês/português, fontes, paleta de cores (vermelho Delta `#D32F2F` / `#BC1E2D`, tons café escuro `#1B120E`, cremes e dourados), imagens em alta resolução, logos e assets de mídia.
- Levantamento de todas as animações, transições, cursores interativos, carrosséis de produtos e efeitos de scroll.
- Extração de todas as 61 URLs do CDN do Sanity.io dos cafés e montagem de `delta_data.json`.
**Status:** complete

### Phase 2: Inicialização do Projeto Next.js 15 e Configuração do Ambiente
- Inicialização do projeto Next.js 15 com TypeScript, Tailwind CSS e ESLint.
- Instalação e configuração do GSAP (`gsap`, `@gsap/react`, `lucide-react`, etc.).
- Configuração de fontes (`next/font` para tipografia marcante, serifas elegantes e display sans).
- Configuração de tokens de cores, sombras e utilitários no Tailwind de acordo com o design system da Delta Cafés.
- Configuração de `.gitignore` garantindo segurança total (sem vazamento de env) e `.env.example`.
**Status:** complete

### Phase 3: Construção da Estrutura de Componentes e Layout Base
- Header / Navbar sticky com logo Delta Cafés, menu de navegação, seletor de idioma, busca e botão de ação com animação de expansão/transição.
- Estrutura semântica das seções:
  1. **Hero Section**: Título de impacto, manifesto "The coffee of your life", elementos visuais dinâmicos, call-to-actions e scroll indicator.
  2. **Brand Story / Manifesto ("Coffee with Heart")**: Seção editorial com tipografia de alta escala, história de Rui Nabeiro e compromisso humano.
  3. **Origens & Sustentabilidade**: Cards com narrativa visual das fazendas, grãos selecionados e impacto social.
  4. **Universo de Produtos & Blends**: Vitrine interativa de cafés em grão, moídos, cápsulas e máquinas com abas/filtros.
  5. **Inovação & Momentos Delta**: Seção multimídia de rituais de café e sustentabilidade.
  6. **Newsletter & Conexão**: Formulário elegante de inscrição e interação.
  7. **Footer Institucional**: Links, certificações, redes sociais e direitos reservados.
**Status:** complete

### Phase 4: Implementação das Animações e Transições GSAP
- Registro oficial de plugins com `gsap.registerPlugin(ScrollTrigger)`.
- Implementação de `useGSAP` em cada seção com aceleração por hardware (GPU: `x`, `y`, `scale`, `opacity`, `autoAlpha`).
- Animações de entrada no Hero (reveal de texto com stagger e entrada fluida das imagens).
- Scroll-driven animations com ScrollTrigger (efeito parallax sutil, pinning de histórias, fade/slide progressivo nas seções).
- Microinterações interativas: hover táteis em botões e cards de produtos, efeito magnético suave e transição de abas.
**Status:** complete

### Phase 5: Validação, Responsividade e Refinamento de Performance
- Teste e refinamento responsivo (Mobile, Tablet, Desktop e Telas Ultra-wide).
- Otimização de imagens com `next/image` e carregamento lazy inteligente.
- Verificação de acessibilidade (ARIA, contrastes de cor, suporte a `prefers-reduced-motion`).
- Build de produção (`npm run build`) para atestar zero erros de compilação ou hidratação.
- Verificação visual e interativa no browser subagent atestando funcionamento sem falhas.
**Status:** complete

### Phase 6: Réplica Exata de "A Cultura do Café" e "Delta Quiz"
- Reconstrução de `CoffeeCulture.tsx`:
  - Background cream com textura orgânica idêntica ao site oficial (`product-bg-tile.png` sobre `#F4E4D2`).
  - Coluna esquerda: tipografia editorial proeminente `A Cultura do Café`, novo card vertical com fotografia editorial preenchendo o espaço sob o título, e parágrafo de manifesto sobre os rituais e o património vivo do café.
  - Coluna direita: duas linhas editoriais separadas por divisórias finas em tom café:
    1. `Centro de Ciência do Café` + botão pill `Explorar →` + imagem botânica oficial + texto descritivo.
    2. `Academia Barista` + botão pill `Explorar →` + imagem CCC Barista Academy oficial + texto descritivo.
  - Modal interativo de exploração ao clicar em "Explorar" com detalhes das instalações, estufas e formações.
- Reconstrução de `DeltaQuiz.tsx`:
  - Remoção de dependência de scroll (`ScrollTrigger` scrub removido per solicitação do usuário: "notei que la ta fixo, como se fosse um video/gif, não tem a tec de scroll, ent isso vc pode remover").
  - Sistema contínuo de 2 colunas/anéis concêntricos (Wave 1 e Wave 2, defasadas em 50% de fase) em loop autônomo infinito a 60/120 FPS via `requestAnimationFrame` com aceleração por GPU.
  - Órbita elíptica calibrada ($R_x \approx 2.2 \times R_y$), garantindo que os pacotes fiquem afastados nas laterais formando duas colunas visíveis em cada lado, mantendo o centro 100% desobstruído com ampla folga para o texto ("Vem descobrir o teu perfil de café") e botão ("Iniciar Quiz").
  - Pacotes ampliados (`w-28 h-40` a `w-44 h-60` com escala 0.85 a 1.25, atingindo ~170px a 200px de largura e até 260px de altura), nítidos e detalhados.
  - Movimento contínuo de afastamento em direção às bordas com fade-out gradual até opacidade 0 ao ultrapassar o limite externo, renovando o ciclo continuamente sem colisões.
  - Modal interativo do quiz totalmente funcional com 4 perguntas sensoriais, pontuação, confetti e recomendação de lote de café Delta.
**Status:** complete

### Phase 7: Implementação das Seções "Sustentabilidade" e "O Café dos Açores"
- **Seção "Sustentabilidade" (`SustainabilitySection.tsx` & `SustainabilityRive.tsx`)**:
  - Fundo em tom verde musgo profundo (`#1c2a20` / `var(--color-moss-green-700)`).
  - Animação oficial dos desenhos botânicos e folclóricos em Rive (`sustainability.riv` extraído do CDN da Delta).
  - Integração com GSAP ScrollTrigger para desenhar dinamicamente os ramos, folhas e arabescos no fundo em tempo real de acordo com a rolagem do usuário (`scrollProgress` de 0.0 a 1.0).
  - Duas fotografias editoriais autênticas inclinadas nas laterais com efeito parallax (`left-farmers.jpg` a `-1.78deg` e `right-harvest.jpg` a `+4deg`).
  - Tipografia monumental central: `Impacto Positivo da Origem até à Chávena` com o botão em pílula `Sustentabilidade →`.
  - Grid inferior com os 3 pilares detalhados de impacto (`Origem Responsável 100%`, `Economia Circular & Zero Desperdício`, `Solidariedade Humana`).
- **Seção "O Café dos Açores" (`AzoresPreFooter.tsx`)**:
  - Fullscreen cinematográfico (`100vh`) com vídeo em alta definição de drone das colinas verdes e plantação dos Açores (`acores-footer-web.mp4`).
  - Overlay escuro suave com efeito parallax cinematográfico de escala/movimento no vídeo ao rolar.
  - Tipografia monumental em serifa em 3 linhas: `O PRIMEIRO / CAFÉ / PORTUGUÊS` (ou `THE FIRST / PORTUGUESE / COFFEE`).
  - Eyebrow `O CAFÉ DOS AÇORES` e botão pílula interativo `O café dos Açores →`.
**Status:** complete

### Phase 8: Réplica do Hero (Imagem 2), Remoção de Seções e Rodapé Transparente (Imagem 1)
- **Remoção de Seções em `src/app/page.tsx`**:
  - Remover `ProductsCarousel` ("Catálogo Completo / Há muito de Portugal em cada lote Delta...").
  - Remover `CoffeeJournal` ("Publicação Editorial / The Coffee Journal").
- **Reconstrução do Hero (`src/components/sections/HeroSection.tsx`) per Imagem 2**:
  - Fundo em alta resolução: mão inspecionando cerejas verdes de café nos Açores (`/imgs/hero/azores-cherries-hero.jpg` / `/imgs/hero/azores-cherries-clean.jpg`).
  - Título inferior esquerdo: `O primeiro café` / `Português.` com botão pill `O Café dos Açores →`.
  - Slider inferior com 3 abas interativas (01 `Delta, café com coração.`, 02 `O primeiro café Português.` [ativo], 03 `Há muito Portugal em Delta.`) com thumbnails e barra de progresso.
  - Conjunto de widgets flutuantes à direita:
    - Card A: Pill `Produtos →` sobre card de embalagem `O café dos Açores`.
    - Card B: Card creme `▲ DELTA HOUSE ↗` com linha de produtos e texto `Produtos Delta em casa, com a Delta House`.
    - Card C: Card escuro frosted `Quiz Delta →` com anel de café giratório e texto `Quanto sabes sobre café? Descobre num quiz rápido e encontra o café à tua medida.`.
- **Reconstrução do Rodapé Transparente (`src/components/layout/Footer.tsx`) per Imagem 1**:
  - `bg-transparent` para fusão contínua sobre o vídeo/cenário costeiro dos Açores (`AzoresPreFooter`).
  - Logo triangular Delta em traço branco (`DELTA 1961`).
  - Links secundários à esquerda (`Loja Online Delta House`, `Recrutamento`, `Provedoria do Cliente`, `Centro de Imprensa`).
  - Ícones circulares de redes sociais (Facebook, Instagram, YouTube, LinkedIn).
  - Colunas de navegação: `DELTA CAFÉS`, `CULTURA DO CAFÉ` (com sub-itens `Origens`, `Blend`, `Torra`, `Prova`), e lista de tópicos (`PRODUTOS`, `SOLUÇÕES DE NEGÓCIO`, `SUSTENTABILIDADE`, `JORNAL`, `D DE DELTA`, `QUIZ`).
  - Coluna de contactos à direita (`E-MAIL`, `APOIO AO CLIENTE 808 20 06 44*`, `ASSISTÊNCIA TÉCNICA 800 20 41 10*`, `*custo para a rede fixa nacional`).
- **Validação de Build e Verificação Visual**:
  - `npm run build` compilado com 100% de sucesso sem erros.
  - Servidor Next.js rodando em produção na porta 3001.
  - Verificação no browser subagent confirmando conformidade visual e estrutural completa.
**Status:** complete
