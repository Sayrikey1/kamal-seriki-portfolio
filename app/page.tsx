import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { DailyQuote } from "@/components/sections/daily-quote";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Credentials } from "@/components/sections/credentials";
import { Research } from "@/components/sections/research";
import { Contact } from "@/components/sections/contact";

/**
 * Single long-scroll composition. Order is deliberate: Experience leads over
 * Projects because six employers and a CTO stint is the stronger argument for a
 * senior IC, and Credentials/Research land after competence is established.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      {/* Values land right after the personal narrative, before the CV proper. */}
      <DailyQuote />
      <Skills />
      <Experience />
      <Projects />
      <Credentials />
      <Research />
      <Contact />
    </>
  );
}
