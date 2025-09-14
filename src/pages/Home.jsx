// src/pages/Home.jsx
import AboutSection from "../components/AboutSection";
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/PortfolioSection";
import FAQSection from "../components/FAQSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import SkillsSection from "../components/SkillsSection";
import DiscordShopBanner from "../components/DiscordShopBanner";
import BackToTop from "../components/BackToTop";
import NikelinoShopBanner from "../components/NikelinoShopBanner";

export default function Home() {
  return (
    <main>
      <section id="home" className="scroll-mt-28">
        <Hero />
      </section>

      <section id="about" className="scroll-mt-28">
        <AboutSection
          years={7}
          projects={120}
          cvUrl="/cv/sofia-vidotto-cv.pdf"
          skills={[
            { label: "Frontend Development", value: 96 },
            { label: "Backend Systems", value: 78 },
            { label: "FiveM NUI", value: 96 },
            { label: "Web Design", value: 92 },
          ]}
        />
      </section>

      <section id="skills" className="scroll-mt-28">
        <SkillsSection />
      </section>

      <section id="services" className="scroll-mt-28">
        <ServicesSection />
      </section>

      <section id="projects" className="scroll-mt-28">
        <PortfolioSection />
      </section>

      <section id="faq" className="scroll-mt-28">
        <FAQSection />
      </section>

      {/* <section id="review" className="scroll-mt-28">
        <TestimonialsSection />
      </section> */}

      <section id="contact" className="scroll-mt-28">
        <ContactSection
          email="sofiavidotto8@gmail.com"
          phone="+39 351 725 5899"
          socials={[
            {
              label: "Instagram",
              href: "https://www.instagram.com/madgiirl99",
              icon: "instagram",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/in/sofia-vidotto-ba1369351",
              icon: "linkedin",
            },
            { label: "GitHub", href: "https://github.com/MaDGiiRL", icon: "github" },
            {
              label: "Facebook",
              href: "https://www.facebook.com/sophieriot99",
              icon: "facebook",
            },
          ]}
          onSubmit={async (data) => {
            console.log("Invia a backend:", data);
          }}
        />
      </section>

      {/* opzionale: non in navbar */}
      <DiscordShopBanner
        inviteUrl="https://discord.gg/DhDfTWPucn"
        priceListUrl="https://discord.com/channels/ID_SERVER/ID_CHANNEL_LISTINO"
        serverName="MADdev • Shop"
        perks={[
          "UI/NUI personalizzate FiveM",
          "Siti & landing ad alte performance",
          "Branding, template & wireframe",
          "Assistenza tecnica rapida",
        ]}
        coupon="MAD10"
      />
      <NikelinoShopBanner />
      <BackToTop threshold={450} />
    </main>
  );
}
