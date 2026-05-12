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
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <InstallStrip />
        <HowItWorksFlow />
        <TerminalPhoneDemo />
        <Problems />
        <ComponentFeatures />
        <Stack />
        <CLIReference />
        <BuildDeploy />
        <ComponentRegistry />
        <ContributeBanner />
        <Testimonials />
        <Creator />
        <CommunityBanner />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
