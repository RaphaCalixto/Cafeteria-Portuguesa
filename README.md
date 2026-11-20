# ☕ Delta Cafés — Réplica Oficial

Uma reconstrução fiel (design, motion e microinterações cinematográficas) da plataforma internacional da **Delta Cafés** (`https://deltacafes.com/pt`), concebida com estética editorial, fluidez a 60/120 FPS e atenção aos mínimos detalhes visuais e de marca.

---

## ✨ Funcionalidades e Destaques

- **Preloader Cinematográfico com Logo Mask**: Abertura icônica revelando a marca com transição do triângulo Delta em vídeo.
- **Navbar em Cápsula Flutuante (Floating Pill)**:
  - Vidro fosco escuro (`backdrop-blur-xl`), bordas arredondadas e logotipo triangular Delta centralizado.
  - Dropdowns ricos acionados por **hover** com debounce gracioso (180ms) e cards de navegação com prévias oficiais.
  - Seletor de idioma instantâneo (`PT / EN`).
- **Hero Section Dinâmico**:
  - Fotografia em alta resolução da plantação de café nos Açores (`O Primeiro Café Português`).
  - Slider inferior com 3 abas interativas com miniaturas e barra de progresso.
  - Cluster de widgets flutuantes à direita: Card de embalagem dos Açores (`Produtos →`), Card Delta House (`▲ DELTA HOUSE ↗`) e Card Quiz com anel colorido em rotação contínua.
- **Brand Story & Manifesto ("Coffee with Heart")**:
  - Homenagem ao Comendador Rui Nabeiro e às origens em Campo Maior (1961).
  - Linha do tempo constelar interativa com cards polaroid 3D e tooltips dinâmicos.
- **O Ciclo do Café ("The Journey of Coffee")**:
  - Da colheita à chávena perfeita com animações fluidas.
- **A Cultura do Café**:
  - Centro de Ciência do Café & Academia Barista com modal interativo imersivo.
  - Card vertical editorial com xícara de expresso de crema aveludada.
- **Delta Quiz Interativo**:
  - Anéis concêntricos contínuos de embalagens de café em loop autônomo (60/120 FPS via GPU).
  - Modal de quiz passo a passo com recomendação personalizada de blend e confetes de celebração.
- **Sustentabilidade & Impacto Positivo**:
  - Animação vetorial Rive oficial dos ramos botânicos (`sustainability.riv`) desenhados dinamicamente com o scroll do usuário.
  - Fotos editoriais autênticas com efeito parallax e 3 pilares de impacto ecológico.
- **O Café dos Açores & Rodapé 100% Transparente**:
  - Vídeo aéreo cinematográfico dos Açores em tela cheia com parallax.
  - Rodapé totalmente transparente sobre o vídeo com logotipo em traço branco (*DELTA 1961*), contatos oficiais e links de navegação.

---

## 🛠️ Stack Tecnológica

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Animações & Motion**:
  - [GSAP](https://greensock.com/gsap/) (`@gsap/react` + `ScrollTrigger`)
  - [Rive](https://rive.app/) (`@rive-app/react-canvas`)
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Ícones**: [Lucide React](https://lucide.dev/)

---

## 🚀 Como Executar Localmente

### 1. Clonar o repositório:
```bash
git clone https://github.com/RaphaCalixto/Cafeteria-Portuguesa.git
cd Cafeteria-Portuguesa
```

### 2. Instalar as dependências:
```bash
npm install
```

### 3. Executar o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

### 4. Build de Produção:
```bash
npm run build
npm run start
```

---

## 🔒 Segurança e Boas Práticas

- Sem credenciais ou arquivos `.env` commitados (conforme `.gitignore` estrito e `.env.example`).
- Aceleração por GPU em todas as transformações de layout (`transform: translate3d`, `opacity`), evitando reflows e mantendo alta taxa de quadros (60/120 FPS).

---

## 📄 Licença

Este projeto é uma recriação com fins educacionais e de demonstração da plataforma internacional da Delta Cafés. Todos os direitos de marca pertencem ao **Grupo Nabeiro / Delta Cafés**.
