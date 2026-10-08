import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/fx/preloader";
import { Cursor } from "@/components/fx/cursor";
import { ParticleField } from "@/components/fx/particle-field";
import { Spotlight } from "@/components/spotlight";
import { ChapterHUD } from "@/components/fx/chapter-hud";
import { Hero } from "@/components/hero/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { StatCascade } from "@/components/sections/stat-cascade";
import { Snapshot } from "@/components/sections/snapshot";
import { ProjectsSection } from "@/components/projects/projects-section";
import { Experience } from "@/components/sections/experience";
import { CraftDeck } from "@/components/sections/craft-deck";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { PrintSummary } from "@/components/sections/print-summary";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Preloader />
      <Cursor />
      {/* The living world — reactive particles behind the content */}
      <ParticleField />
      <Spotlight />
      {/* The journey instrument — chapter rail + progress spine */}
      <ChapterHUD />
      <Nav />
      <main className="relative z-10 flex-1">
        <Hero />
        <Manifesto />
        <StatCascade />
        <Snapshot />
        <ProjectsSection />
        <Experience />
        <CraftDeck />
        <About />
        <Contact />
      </main>
      <Footer />
      <PrintSummary />
    </div>
  );
}
