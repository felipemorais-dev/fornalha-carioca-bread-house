import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Flame,
  Leaf,
  Menu,
  X,
  MapPin,
  Clock3,
  MessageCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, currency, hours, pizzas } from "@/lib/pizzeria";
import hero from "@/assets/hero.asset.json";
import interior from "@/assets/interior.asset.json";
import ingredients from "@/assets/ingredients.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fornalha Carioca — Uma boa pizza muda a noite | Demonstração" },
      {
        name: "description",
        content:
          "Conheça a Fornalha Carioca, uma pizzaria fictícia de portfólio. Cardápio, fotografias e informações demonstrativas de pizzas artesanais.",
      },
      { property: "og:title", content: "Fornalha Carioca — Pizzaria artesanal fictícia" },
      {
        property: "og:description",
        content:
          "Uma boa pizza muda a noite. Projeto demonstrativo de portfólio, com informações e valores fictícios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const links = [
  { label: "Sobre", id: "sobre" },
  { label: "Cardápio", id: "cardapio" },
  { label: "Galeria", id: "galeria" },
  { label: "Contato", id: "contato" },
];

function Brand() {
  return (
    <a href="#inicio" className="brand" aria-label="Fornalha Carioca — início">
      <Flame strokeWidth={1.5} />
      <span>
        Fornalha <em>Carioca</em>
        <small>PIZZARIA ARTESANAL · PROJETO FICTÍCIO</small>
      </span>
    </a>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [demoNotice, setDemoNotice] = useState(false);
  return (
    <div id="inicio">
      <div className="demo-banner">
        <Info size={13} />
        <span>SITE DEMONSTRATIVO — informações e contatos fictícios</span>
      </div>
      <header className="site-header">
        <div className="page-width header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </nav>
          <Button asChild variant="pizza" className="header-cta">
            <a href="#cardapio">
              Ver cardápio <ArrowUpRight />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navegação no celular">
            {links.map((link) => (
              <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)}>
                {link.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-photo"
            src={hero.url}
            alt="Pizza artesanal de muçarela e manjericão sobre uma mesa — imagem demonstrativa"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="page-width hero-content">
            <p className="eyebrow hero-eyebrow">
              <span /> FEITA PARA COMPARTILHAR
            </p>
            <h1 id="hero-title">
              Uma boa pizza
              <br />
              muda a <em>noite.</em>
            </h1>
            <p className="hero-copy">
              Pizzas artesanais, ingredientes selecionados e um cardápio feito para compartilhar.
            </p>
            <Button asChild variant="pizza" className="hero-cta">
              <a href="#cardapio">
                Conheça o cardápio <ArrowUpRight />
              </a>
            </Button>
            <a href="#sobre" className="hero-bottom">
              <ArrowDown size={15} /> Um pedacinho da nossa história
            </a>
          </div>
          <div className="hero-stamp">
            <Flame size={23} strokeWidth={1.5} />
            <span>
              Fornalha
              <br />
              <em>Carioca</em>
            </span>
            <small>PIZZA & BOA COMPANHIA</small>
          </div>
          <span className="hero-caption">Imagem original de demonstração</span>
        </section>

        <section id="sobre" className="about section-pad">
          <div className="page-width about-grid">
            <div>
              <p className="eyebrow">
                <span /> MUITO ALÉM DA PRIMEIRA FATIA
              </p>
              <h2>
                Sobre a <em>Fornalha.</em>
              </h2>
            </div>
            <div className="about-copy">
              <p>
                A Fornalha Carioca é uma{" "}
                <strong>pizzaria fictícia criada para esta demonstração.</strong> A proposta é
                reunir sabores clássicos, ingredientes bem escolhidos e um ambiente descontraído.
              </p>
              <div className="about-signature">
                <Leaf size={19} strokeWidth={1.5} />
                <span>Uma ideia artesanal. Um projeto de portfólio.</span>
              </div>
            </div>
          </div>
        </section>

        <section id="cardapio" className="menu-section section-pad">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span /> ESCOLHA SUA PRÓXIMA FATIA
                </p>
                <h2>
                  Da fornalha <em>pra mesa.</em>
                </h2>
              </div>
              <p className="section-note">Cardápio demonstrativo — valores fictícios</p>
            </div>
            <div className="pizza-grid">
              {pizzas.map((pizza) => (
                <article key={pizza.name} className="pizza-card">
                  <div className="pizza-image">
                    <img
                      src={pizza.image}
                      alt={`Pizza ${pizza.name} — imagem demonstrativa`}
                      loading="lazy"
                    />
                    <span className="pizza-category">{pizza.category}</span>
                  </div>
                  <div className="pizza-info">
                    <h3>{pizza.name}</h3>
                    <p>{pizza.description}</p>
                    <div className="pizza-prices">
                      <div>
                        <span>Média</span>
                        <strong>{currency(pizza.medium)}</strong>
                      </div>
                      <div>
                        <span>Grande</span>
                        <strong>{currency(pizza.large)}</strong>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="menu-disclaimer">
              <Info size={14} /> Sabores e preços ilustrativos. Este site não recebe pedidos.
            </p>
          </div>
        </section>

        <section id="galeria" className="gallery-section section-pad">
          <div className="page-width">
            <div className="section-heading">
              <div>
                <p className="eyebrow">
                  <span /> UM POUCO DO NOSSO UNIVERSO
                </p>
                <h2>
                  O sabor começa <em>no olhar.</em>
                </h2>
              </div>
              <span className="section-note">Fotografias originais de demonstração</span>
            </div>
            <div className="gallery-grid">
              <figure className="gallery-main">
                <img
                  src={interior.url}
                  loading="lazy"
                  alt="Ambiente fictício com mesas de madeira e forno a lenha"
                />
                <figcaption>Um cantinho imaginado para reunir.</figcaption>
              </figure>
              <figure>
                <img
                  src={ingredients.url}
                  loading="lazy"
                  alt="Tomates, manjericão e muçarela — fotografia demonstrativa"
                />
                <figcaption>A beleza dos ingredientes.</figcaption>
              </figure>
              <figure>
                <img
                  src={hero.url}
                  loading="lazy"
                  alt="Detalhe da pizza de manjericão — fotografia demonstrativa"
                />
                <figcaption>Aquela primeira fatia.</figcaption>
              </figure>
            </div>
            <p className="photo-disclaimer">
              Imagens geradas para este projeto. Não retratam um estabelecimento real.
            </p>
          </div>
        </section>

        <section id="contato" className="contact-section section-pad">
          <div className="page-width">
            <p className="eyebrow">
              <span /> SÓ NA IMAGINAÇÃO, POR ENQUANTO
            </p>
            <h2>
              Um endereço para <em>a boa companhia.</em>
            </h2>
            <p className="contact-intro">Informações fictícias para demonstração</p>
            <div className="contact-grid">
              <div className="contact-item">
                <MapPin strokeWidth={1.5} />
                <h3>Onde seria</h3>
                <p>
                  Rua das Brasas, 123 — endereço fictício,
                  <br />
                  São Gonçalo — RJ
                </p>
                <span>Endereço demonstrativo · sem localização real</span>
              </div>
              <div className="contact-item">
                <Clock3 strokeWidth={1.5} />
                <h3>A hora da pizza</h3>
                <p>
                  Terça a domingo,
                  <br />
                  das {hours.opening}h às {hours.closing}h
                </p>
                <span>Horário demonstrativo</span>
              </div>
              <div className="contact-item">
                <MessageCircle strokeWidth={1.5} />
                <h3>Vamos conversar?</h3>
                <p>
                  WhatsApp: {contact.phone}
                  <br />— número fictício
                </p>
                <Button
                  variant="demo"
                  className="contact-button"
                  onClick={() => setDemoNotice(!demoNotice)}
                  aria-expanded={demoNotice}
                >
                  <MessageCircle /> Pedir pelo WhatsApp <small>DEMO</small>
                </Button>
                {demoNotice && (
                  <p role="status" className="contact-notice">
                    Apenas demonstrativo. Nenhuma conversa será aberta e nenhuma mensagem será
                    enviada.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="page-width">
          <div className="footer-top">
            <Brand />
            <nav aria-label="Navegação do rodapé">
              {links.map((link) => (
                <a key={link.id} href={`#${link.id}`}>
                  {link.label}
                </a>
              ))}
            </nav>
            <a href="#inicio" className="back-top" aria-label="Voltar ao topo">
              <ArrowUpRight size={21} />
            </a>
          </div>
          <div className="footer-bottom">
            <p>
              Projeto fictício de portfólio. Informações, endereço, preços e contato são
              demonstrativos.
            </p>
            <span>Feito para imaginar. Não para pedir.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
