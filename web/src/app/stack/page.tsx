import type { Metadata } from "next";
import Script from "next/script";
import {
  ArrowUpRight,
  Boxes,
  Cloud,
  Database,
  Lock,
  Server,
  Smartphone,
  Workflow,
  Zap,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { CopyBlock } from "@/components/copy-block";
import { SITE } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The locked tech stack — VibeKit Native",
  description:
    "What's the actual backend? Expo API Routes (same repo as the mobile app) running on EAS Hosting, backed by Neon Postgres + Prisma v7 + Better Auth. Plus the full mobile + integrations + observability layers.",
  alternates: { canonical: "/stack" },
  openGraph: {
    url: `${SITE.url}/stack`,
    title: "The locked tech stack — VibeKit Native",
    description:
      "Expo API Routes + Neon + Prisma v7 + Better Auth — the full production stack VibeKit Native targets, with deploy via EAS Build / Submit / Update / Hosting.",
    images: ["/vibekit_thumbnail_cli.png"],
  },
};

const layers = [
  {
    group: "Mobile",
    icon: Smartphone,
    items: [
      { layer: "Framework", pick: "Expo SDK 55+ · React Native 0.83+", why: "Largest mobile community. OTA updates via EAS. Single codebase iOS + Android (+ web)." },
      { layer: "Language", pick: "TypeScript 5.9 strict", why: "End-to-end types — Zod schemas shared between mobile forms and API routes." },
      { layer: "Routing", pick: "expo-router (file-based)", why: "Same mental model as Next.js App Router — agents know the pattern." },
      { layer: "Styling", pick: "NativeWind v4 (Tailwind for RN)", why: "Reuses Tailwind muscle memory; design tokens via theme.ts." },
      { layer: "Lists", pick: "@shopify/flash-list", why: "Recycled rows. Smooth at 10,000+ items." },
      { layer: "Images", pick: "expo-image", why: "Disk cache + blurhash placeholders. No layout shift." },
      { layer: "Animations", pick: "react-native-reanimated 3 + Moti", why: "Runs on the UI thread. 60fps even when JS thread is busy." },
      { layer: "Gestures", pick: "react-native-gesture-handler", why: "Native gesture detection." },
      { layer: "Icons", pick: "@expo/vector-icons (Ionicons)", why: "Bundled with Expo. Zero linking." },
      { layer: "Haptics", pick: "expo-haptics", why: "Built into the registry button. Tap / select / success / error / warning." },
    ],
  },
  {
    group: "State + Storage",
    icon: Database,
    items: [
      { layer: "Server state", pick: "TanStack Query v5", why: "Retries, refetch-on-focus, cursor pagination, offline persister." },
      { layer: "Client state", pick: "Zustand", why: "Lightweight. No boilerplate. Use only when state spans 3+ screens." },
      { layer: "Fast storage", pick: "react-native-mmkv", why: "30× faster than AsyncStorage. Preferences, cache, last-seen IDs." },
      { layer: "Sensitive storage", pick: "expo-secure-store", why: "iOS Keychain + Android EncryptedSharedPreferences. Auth tokens, biometric secrets." },
      { layer: "Forms", pick: "react-hook-form + Zod", why: "Shared schemas with API routes." },
    ],
  },
  {
    group: "Backend (same repo, same deploy)",
    icon: Server,
    items: [
      { layer: "API Routes", pick: "Expo API Routes (app/api/**/+api.ts)", why: "File-based. Web standard Request/Response. Runs on Node when deployed to EAS Hosting." },
      { layer: "Database", pick: "Neon Postgres (HTTP serverless driver)", why: "No connection pool issues on cold-start. Pay-per-use. Branching for preview environments." },
      { layer: "ORM", pick: "Prisma v7 + @prisma/adapter-pg + @neondatabase/serverless", why: "New prisma-client generator. Driver adapter pattern for HTTP." },
      { layer: "Auth", pick: "Better Auth + @better-auth/expo", why: "Native OAuth via expo-web-browser. Sessions in expo-secure-store. Server-side via Prisma adapter." },
      { layer: "Email", pick: "Resend", why: "Transactional only. React Email templates." },
      { layer: "File uploads", pick: "Cloudinary or R2 via signed URLs", why: "Mint short-lived signed URLs server-side. Never proxy bytes through the API." },
      { layer: "Webhooks", pick: "HMAC verification + idempotent dedupe", why: "DGateway, Stripe — both verified with crypto.timingSafeEqual before parsing body." },
    ],
  },
  {
    group: "Payments",
    icon: Zap,
    items: [
      { layer: "East Africa mobile money", pick: "DGateway (UGX/KES/TZS/RWF)", why: "Iotec for UGX, Relworx for KES/TZS/RWF — routed automatically. Mobile NEVER calls DGateway directly; backend proxies with the API key." },
      { layer: "Global cards", pick: "@stripe/stripe-react-native PaymentSheet", why: "Apple Pay, Google Pay, cards. Backend mints PaymentIntent / Subscription." },
      { layer: "Marketplace seller onboarding", pick: "Stripe Connect Express + DGateway payouts", why: "5-step wizard component. Hosted KYC via expo-web-browser. Mobile-money payouts for EA sellers." },
    ],
  },
  {
    group: "Native integrations",
    icon: Workflow,
    items: [
      { layer: "Push notifications", pick: "expo-notifications + Expo Push Service", why: "Free. Works on iOS + Android. usePushNotifications hook ships in the registry." },
      { layer: "Deep links", pick: "expo-linking + Universal Links + App Links", why: "Required for OAuth callbacks, magic-link sign-in, share targets." },
      { layer: "Biometrics", pick: "expo-local-authentication", why: "Face ID / Touch ID / Fingerprint. biometric-unlock-screen component." },
      { layer: "Camera + barcode", pick: "expo-camera (CameraView)", why: "QR + every common barcode format. barcode-scanner-screen component." },
      { layer: "Signature capture", pick: "react-native-signature-canvas", why: "Proof-of-delivery patterns. signature-capture-screen component." },
    ],
  },
  {
    group: "Build + Deploy",
    icon: Cloud,
    items: [
      { layer: "Native binaries", pick: "EAS Build", why: "iOS + Android in one command. Auto-incrementing build numbers." },
      { layer: "Store submission", pick: "EAS Submit", why: "App Store + Play Console. Credentials managed by Expo." },
      { layer: "OTA updates", pick: "EAS Update", why: "JS-only fixes ship without store review. Native changes still rebuild." },
      { layer: "API hosting", pick: "EAS Hosting", why: "Node runtime for Expo API Routes. Auto-scaled. Free tier covers dev." },
      { layer: "Secrets", pick: "EAS Secret", why: "Server-side env vars. Never committed. Never bundled into the mobile binary." },
    ],
  },
  {
    group: "Observability",
    icon: Lock,
    items: [
      { layer: "Crash + error reporting", pick: "Sentry React Native + Sentry Node", why: "Mobile + server. Source maps uploaded via EAS post-build hook." },
      { layer: "Analytics", pick: "PostHog React Native (optional)", why: "Self-hostable. Event funnels. Only if project-description.md says yes." },
    ],
  },
];

const blocklist = [
  { banned: "@react-native-async-storage/async-storage (for primary data)", instead: "react-native-mmkv (via the storage lib component)" },
  { banned: "react-native-vector-icons", instead: "@expo/vector-icons — bundled with Expo, zero linking" },
  { banned: "react-native-fast-image", instead: "expo-image — maintained, better API" },
  { banned: "react-navigation (raw)", instead: "expo-router — file-based, matches Next.js mental model" },
  { banned: "axios", instead: "native fetch — smaller bundle" },
  { banned: "moment", instead: "date-fns or native Intl.DateTimeFormat" },
  { banned: "lodash", instead: "Native ES2022 methods" },
  { banned: "redux / redux-toolkit", instead: "Zustand + TanStack Query" },
  { banned: "react-native-elements / react-native-paper", instead: "VibeKit Native registry + NativeWind" },
  { banned: "Animated from react-native", instead: "react-native-reanimated 3 (UI thread = 60fps)" },
  { banned: "FlatList for >50 items", instead: "@shopify/flash-list (recycled rows)" },
];

export default function StackPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 pb-24">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[color:var(--border)] pb-16 sm:pb-24">
          <div className="pointer-events-none absolute inset-0 -z-10 circuit-grid opacity-50" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 -z-10"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 65%)",
            }}
          />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 sm:pt-24 text-center">
            <div className="inline-flex items-center gap-2 pill-chip rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-secondary)]">
              <Boxes className="h-3 w-3 text-[color:var(--accent)]" />
              The locked tech stack
            </div>
            <h1 className="mt-6 headline-display text-[clamp(2.25rem,6vw,4rem)] headline-glow-strong">
              One repo. One deploy. The whole backend.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[color:var(--text-secondary)]">
              VibeKit Native runs your <strong className="text-[color:var(--text-primary)]">mobile app and backend in the same Expo project</strong>. Screens live in <code className="font-mono text-[14px] text-[color:var(--accent)]">app/</code>; API routes live in <code className="font-mono text-[14px] text-[color:var(--accent)]">app/api/</code>. Both deploy together via EAS — no separate Next.js server, no separate Vercel project, no monorepo.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/components" variant="accent" size="lg">
                Browse 65 components
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button href="/performance" variant="outline" size="lg">
                Performance budget
              </Button>
            </div>
          </div>
        </section>

        {/* The backend question */}
        <Section
          eyebrow="The backend question"
          title="What's the actual backend?"
          description="The most common question we get. The short answer: Expo API Routes + Neon + Prisma v7 + Better Auth — all in the same Expo project, all deployed by one command."
          containerClassName="max-w-4xl"
        >
          <div className="reveal rounded-2xl card-glass p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <BackendCard icon={Server} title="API Routes (Node, server-side)">
                Files at <code className="font-mono text-[12.5px] text-[color:var(--accent)]">app/api/**/+api.ts</code> in your Expo project. Export named methods (<code className="font-mono text-[12px]">GET</code>, <code className="font-mono text-[12px]">POST</code>, <code className="font-mono text-[12px]">PATCH</code>). Use Web standard <code className="font-mono text-[12px]">Request</code>/<code className="font-mono text-[12px]">Response</code>. Run on Node when deployed to EAS Hosting.
              </BackendCard>
              <BackendCard icon={Database} title="Neon Postgres + Prisma v7">
                Neon's HTTP serverless driver kills cold-start connection pool issues. Prisma v7's new <code className="font-mono text-[12.5px]">prisma-client</code> generator + <code className="font-mono text-[12.5px]">@prisma/adapter-pg</code> wires Neon natively.
              </BackendCard>
              <BackendCard icon={Lock} title="Better Auth + @better-auth/expo">
                Server config uses <code className="font-mono text-[12px]">prismaAdapter</code> + <code className="font-mono text-[12px]">expo()</code> plugin. Mobile uses <code className="font-mono text-[12px]">createAuthClient</code> + <code className="font-mono text-[12px]">expoClient()</code> + <code className="font-mono text-[12px]">expo-secure-store</code>. Email + password, OAuth (Google / Apple / GitHub), magic links, OTP — all configurable.
              </BackendCard>
              <BackendCard icon={Cloud} title="EAS Hosting deploy">
                One command (<code className="font-mono text-[12.5px]">eas deploy --prod</code>) ships the API routes. Production env vars via <code className="font-mono text-[12.5px]">eas secret:create</code>. Auto-scaled Node runtime. Free tier for dev.
              </BackendCard>
            </div>

            <div className="mt-6 border-t border-[color:var(--border)] pt-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">Sample API route</p>
              <CopyBlock
                filename="app/api/posts/+api.ts"
                label="Cursor-paginated, auth-gated, Zod-validated"
                code={`import { auth } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { CreatePostSchema } from "@/src/lib/schemas/post";

export async function GET(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor") ?? undefined;
  const items = await prisma.post.findMany({
    where: { userId: session.user.id },
    take: 21,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    orderBy: { createdAt: "desc" },
  });
  const hasMore = items.length > 20;
  return Response.json({
    data: hasMore ? items.slice(0, -1) : items,
    nextCursor: hasMore ? items[19].id : null,
  });
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = CreatePostSchema.safeParse(await request.json());
  if (!parsed.success) {
    return Response.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { ...parsed.data, userId: session.user.id },
  });
  return Response.json({ data: post }, { status: 201 });
}`}
              />
            </div>
          </div>
        </Section>

        {/* The full stack — by group */}
        <Section
          eyebrow="The full stack"
          title="Every layer, locked."
          description="The master_prompt.md tells the AI agent to use exactly these. Swapping any layer means losing the AI agent's pattern recognition — only deviate when project-description.md explicitly says so."
          containerClassName="max-w-5xl"
        >
          <div className="grid gap-5">
            {layers.map(({ group, icon: Icon, items }) => (
              <div key={group} className="reveal rounded-2xl card-glass overflow-hidden">
                <div className="flex items-center gap-3 border-b border-[color:var(--border)] bg-[color:var(--bg-subtle)] px-5 py-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md bg-[color:var(--bg-elevated)] text-[color:var(--accent)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--text-primary)]">
                    {group}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--text-tertiary)] ml-auto">
                    {items.length} {items.length === 1 ? "layer" : "layers"}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {items.map((row, i) => (
                        <tr
                          key={row.layer}
                          className={i !== items.length - 1 ? "border-b border-[color:var(--border)]" : ""}
                        >
                          <td className="px-5 py-3.5 font-medium text-[color:var(--text-primary)] w-[28%] align-top">
                            {row.layer}
                          </td>
                          <td className="px-5 py-3.5 font-mono text-[12.5px] text-[color:var(--accent)] w-[34%] align-top">
                            {row.pick}
                          </td>
                          <td className="px-5 py-3.5 text-[color:var(--text-secondary)] align-top">
                            {row.why}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Dependency blocklist */}
        <Section
          eyebrow="The blocklist"
          title="What you DON'T install."
          description="The master_prompt.md ships a banned-deps list so the AI agent doesn't drift off-stack. Each ban has a better alternative on the locked stack."
          containerClassName="max-w-4xl"
        >
          <div className="reveal rounded-2xl card-glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[color:var(--bg-subtle)] text-[11px] font-mono uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
                  <tr>
                    <th className="px-5 py-3 font-medium">Banned</th>
                    <th className="px-5 py-3 font-medium">Use instead</th>
                  </tr>
                </thead>
                <tbody>
                  {blocklist.map((row, i) => (
                    <tr
                      key={row.banned}
                      className={i !== blocklist.length - 1 ? "border-b border-[color:var(--border)]" : ""}
                    >
                      <td className="px-5 py-3.5 font-mono text-[13px] text-[color:var(--text-primary)] align-top">
                        {row.banned}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[13px] text-[color:var(--accent)] align-top">
                        {row.instead}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* Why one repo */}
        <Section
          eyebrow="Why one repo"
          title="Not a separate Next.js + Expo monorepo."
          description="Every other mobile-plus-API stack is two projects in two repos with two CI pipelines. VibeKit Native collapses both into one Expo project with one deploy. Here is why that works."
          containerClassName="max-w-3xl"
        >
          <div className="reveal grid gap-4">
            <Justification
              icon={Workflow}
              title="One TypeScript build, one set of types"
              body={`The mobile app imports the same Zod schemas from src/lib/schemas/ that the API routes use to validate incoming requests. Type safety end-to-end with no codegen step.`}
            />
            <Justification
              icon={Lock}
              title="Auth session resolves identically on both sides"
              body={`Better Auth's @better-auth/expo plugin handles the mobile session in expo-secure-store. The same Better Auth instance handles server-side auth.api.getSession({ headers }) on every API route. One source of truth.`}
            />
            <Justification
              icon={Cloud}
              title="One deploy, one rollback"
              body={`eas build ships the binary. eas deploy --prod ships the API routes. eas update ships JS-only patches via OTA. If something breaks, you roll back EAS Update — instantly, without store review.`}
            />
            <Justification
              icon={Server}
              title="No CORS, no separate domains"
              body={`The mobile app is signed with the same scheme as the API routes' trustedOrigins. No cross-origin headers to debug. No separate sub-domain to provision.`}
            />
          </div>
        </Section>
      </main>
      <Footer />

      <Script
        id="ld-stack-page"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: "VibeKit Native — The locked tech stack",
            description: metadata.description,
            url: `${SITE.url}/stack`,
            author: { "@type": "Person", name: "JB (Muke Johnbaptist)" },
            about: layers.flatMap((g) => g.items.map((i) => i.pick)),
          }),
        }}
      />
    </>
  );
}

function BackendCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Server;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-[color:var(--bg-subtle)] border border-[color:var(--border)] p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-md bg-[color:var(--bg-elevated)] text-[color:var(--accent)]">
          <Icon className="h-4 w-4" />
        </span>
        <span className="font-mono text-[13px] font-semibold text-[color:var(--text-primary)]">
          {title}
        </span>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--text-secondary)]">
        {children}
      </p>
    </div>
  );
}

function Justification({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Server;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl card-glass p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[color:var(--bg-subtle)] text-[color:var(--accent)]">
          <Icon className="h-4 w-4" />
        </span>
        <div className="flex-1">
          <div className="font-mono text-[13px] font-semibold uppercase tracking-tight text-[color:var(--text-primary)]">
            {title}
          </div>
          <p className="mt-2 text-[14.5px] leading-relaxed text-[color:var(--text-secondary)]">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
