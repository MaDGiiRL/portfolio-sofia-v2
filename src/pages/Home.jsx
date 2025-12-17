import { motion } from "framer-motion";

import AboutSection from "../components/AboutSection";
import ExperienceRegionSection from "../components/ExperienceRegionSection"; // ✅ ADD
import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import PortfolioSection from "../components/PortfolioSection";
import FAQSection from "../components/FAQSection";
// import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";
import SkillsSection from "../components/SkillsSection";
import DiscordShopBanner from "../components/DiscordShopBanner";
import BackToTop from "../components/BackToTop";
import NikelinoShopBanner from "../components/NikelinoShopBanner";

/** Wrapper: fade+rise on enter, una sola volta */
function Reveal({ children, delay = 0, y = 18, duration = 0.6 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main>
      <section id="home" className="scroll-mt-28">
        <Reveal y={12} duration={0.6}>
          <Hero />
        </Reveal>
      </section>

      <section id="about" className="scroll-mt-28">
        <Reveal delay={0.06}>
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
        </Reveal>
      </section>

      {/* ✅ NEW SECTION */}
      <section id="experience" className="scroll-mt-28">
        <Reveal delay={0.08}>
          <ExperienceRegionSection />
        </Reveal>
      </section>

      <section id="skills" className="scroll-mt-28">
        <SkillsSection />
      </section>

      <section id="services" className="scroll-mt-28">
        <Reveal delay={0.1}>
          <ServicesSection />
        </Reveal>
      </section>

      <section id="projects" className="scroll-mt-28">
        <Reveal delay={0.12} y={22} duration={0.7}>
          <PortfolioSection />
        </Reveal>
      </section>

      <section id="faq" className="scroll-mt-28">
        <Reveal delay={0.12}>
          <FAQSection />
        </Reveal>
      </section>

      <section id="contact" className="scroll-mt-28">
        <Reveal delay={0.1}>
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
              {
                label: "GitHub",
                href: "https://github.com/MaDGiiRL",
                icon: "github",
              },
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
        </Reveal>
      </section>

      <Reveal y={12} duration={0.55}>
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
      </Reveal>

      <Reveal y={12} duration={0.55} delay={0.05}>
        <NikelinoShopBanner />
      </Reveal>

      <BackToTop threshold={450} />
    </main>
  );
}
