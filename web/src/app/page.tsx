import { InstallStrip } from "@/components/install-strip";
import { CommunityBanner } from "@/components/community-banner";
import { ContributeBanner } from "@/components/contribute-banner";
import { Creator } from "@/components/creator";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { ComponentFeatures } from "@/components/component-features";
import { CLIReference } from "@/components/cli-reference";
import { Hero } from "@/components/hero";
import { HowItWorksFlow } from "@/components/how-it-works-flow";
import { ComponentRegistry } from "@/components/component-registry";
import { TerminalPhoneDemo } from "@/components/terminal-phone-demo";
import { Nav } from "@/components/nav";
import { BuildDeploy } from "@/components/build-deploy";
import { Problems } from "@/components/problems";
import { Stack } from "@/components/stack";
import { Testimonials } from "@/components/testimonials";

export default function HomePage() {
  // Narrative arc:
  //   1. Hook                — Hero
  //   2. Pain                — Problems (the why)
  //   3. Solution preview    — InstallStrip + HowItWorksFlow
  //   4. Show, don't tell    — TerminalPhoneDemo
  //   5. Depth               — ComponentFeatures, Stack, CLIReference, BuildDeploy
  //   6. Proof               — ComponentRegistry, Testimonials, Creator
  //   7. Convert             — Contribute, Community, CTA
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problems />
        <InstallStrip />
        <HowItWorksFlow />
        <TerminalPhoneDemo />
        <ComponentFeatures />
        <Stack />
        <CLIReference />
        <BuildDeploy />
        <ComponentRegistry />
        <Testimonials />
        <Creator />
        <ContributeBanner />
        <CommunityBanner />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
