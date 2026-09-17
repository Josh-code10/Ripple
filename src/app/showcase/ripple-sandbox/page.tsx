import Link from "next/link";
import Image from "next/image";
import InteractiveApiDemo from "@/components/InteractiveApiDemo";

export default function RippleSandboxPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#002444] overflow-x-hidden">
      {/* 1. Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#f0f2f5] transition-all">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden bg-[#002444] shadow-sm border border-[#d8dce2]/60">
              <Image
                src="/logo.png"
                alt="Ripple Logo"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#002444]">
              Ripple
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#002444]">
            <Link
              href="/"
              className="hover:text-[#30C0CF] transition-colors"
            >
              &larr; Back to Showcase
            </Link>
            <a
              href="#demo"
              className="flex items-center gap-1.5 text-[#00838f] hover:text-[#30C0CF] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#25CE7B]" />
              Interactive Sandbox
            </a>
            <Link
              href="/coming-soon"
              className="hover:text-[#30C0CF] transition-colors"
            >
              Submit Project (Coming soon)
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#d8dce2] bg-[#f8f8f9] px-3.5 py-1.5 text-xs font-medium text-[#002444]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25CE7B] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25CE7B]"></span>
              </span>
              <span>Ripple Sandbox: Active</span>
            </div>

            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full bg-[#002444] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#7580ef] hover:scale-[1.02] active:scale-[0.98]"
            >
              Test API Live
            </a>
          </div>
        </nav>
      </header>

      {/* 2. Project Case Study Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 bg-gradient-to-b from-[#f8f8f9] to-white border-b border-[#e6ecf2]">
        {/* Subtle glow accents */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[10%] left-[10%] h-[320px] w-[350px] rounded-full bg-[#30C0CF]/10 blur-[80px]" />
          <div className="absolute top-[15%] right-[10%] h-[320px] w-[350px] rounded-full bg-[#7580ef]/10 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1b507e] hover:text-[#002444] transition-colors mb-6"
          >
            <span>&larr;</span> Back to Ripple Showcase
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold bg-[#e0fdff] text-[#00838f] border-[#30c0cf]/30">
              Fintech
            </span>
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-[#eceffd] text-[#7580ef] border-[#7580ef]/30">
              Verified Working Pilot
            </span>
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold bg-[#e2fbe8] text-[#0b8043] border-[#25ce7b]/30">
              Solo Build
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#002444] leading-tight">
            Ripple Sandbox: Card Issuance &amp; Fraud Check
          </h1>

          {/* Builder Metadata */}
          <div className="mt-6 flex items-center gap-4 pb-8 border-b border-[#d8dce2]/70">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#002444] to-[#7580ef] text-base font-bold text-white shadow-sm">
              J
            </div>
            <div>
              <h3 className="text-base font-bold text-[#002444]">
                Joshua Adelasoye
              </h3>
              <p className="text-xs sm:text-sm text-[#1b507e]">
                Software Engineering Track — Upskill Applicant
              </p>
            </div>
          </div>

          {/* Case Study Narrative (Exact wording from requirement 4) */}
          <div className="mt-8 space-y-6 text-base sm:text-lg leading-relaxed text-[#002444]">
            <p className="font-normal">
              I built a working simulation of what Cardtonic&apos;s upcoming Pil API could look like for a business — a small sandboxed backend that issues virtual cards, funds them, and runs an anomaly check on transactions before approving them. It isn&apos;t connected to Cardtonic&apos;s real infrastructure; I don&apos;t have access to that. It&apos;s a proof of pattern: given the general shape of a card-issuing API, this is a plausible way a business could use it, and what a basic fraud-check layer on top of it could look like.
            </p>

            <p className="font-normal">
              I directed the build end-to-end using Antigravity rather than hand-writing every line, and found and fixed a real bug in the anomaly-detection math myself once testing exposed it — the average-transaction calculation broke under normal inputs, which is a more useful thing to have found than if everything had looked perfect from the start.
            </p>

            <p className="font-normal">
              This is also the first, and currently only, real entry on Ripple&apos;s showcase. Everything else describing other builders on the page is a placeholder for what the format could look like once people actually start submitting — I didn&apos;t want to imply a community exists yet that doesn&apos;t.
            </p>
          </div>

          {/* Quick jump CTA to demo */}
          <div className="mt-10 pt-6 border-t border-[#d8dce2]/70 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1b507e]">
              <span className="h-2 w-2 rounded-full bg-[#25CE7B]" />
              <span>Interactive endpoints: <code>/api/issue-card</code>, <code>/api/fund-card</code>, <code>/api/check-transaction</code></span>
            </div>
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full bg-[#002444] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#7580ef]"
            >
              Scroll to Interactive Demo &darr;
            </a>
          </div>
        </div>
      </section>

      {/* 3. Live Interactive Sandbox Section */}
      <section id="demo" className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center rounded-full bg-[#eceffd] px-3.5 py-1 text-xs font-semibold text-[#7580ef]">
            Live API Sandbox
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#002444] sm:text-5xl tracking-tight">
            Try the API Yourself
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#1b507e] font-normal leading-relaxed">
            Test the virtual card engine live. Issue a new virtual card, fund a balance, and test the 5x transaction fraud check in real time.
          </p>
        </div>

        <InteractiveApiDemo />
      </section>

      {/* 4. Footer */}
      <footer className="w-full bg-[#002444] text-white pt-14 pb-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/10">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden bg-[#002444] border border-white/20 shadow-sm">
                  <Image
                    src="/logo.png"
                    alt="Ripple Logo"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Ripple
                </span>
              </div>
              <p className="mt-3 text-xs text-[#d1e0e4] leading-relaxed max-w-sm">
                A working pilot of what a proof-of-API showcase could look like for Cardtonic&apos;s Pil product. Built independently by a Software Engineering track applicant in Cardtonic&apos;s Upskill program.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">API Endpoints (Simulated)</h4>
              <ul className="mt-3 space-y-2 text-xs text-[#d1e0e4]">
                <li>POST /api/issue-card (simulated)</li>
                <li>POST /api/fund-card (simulated)</li>
                <li>GET /api/cards (simulated)</li>
                <li>POST /api/check-transaction (simulated)</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white">Affiliation &amp; Status</h4>
              <div className="mt-3 flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white">
                  Upskill Applicant
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-[#25CE7B]">
                  Pilot Active
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d1e0e4]">
            <p>&copy; {new Date().getFullYear()} Ripple. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/coming-soon" className="hover:text-white transition-colors">Submit Project (Coming soon)</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
