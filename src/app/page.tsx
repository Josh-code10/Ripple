import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-[#002444] overflow-x-hidden">
      {/* 1. Header with Active Sandbox Badge */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#f0f2f5] transition-all">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          {/* Logo */}
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

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#002444]">
            <Link
              href="/showcase/ripple-sandbox"
              className="flex items-center gap-1.5 text-[#00838f] hover:text-[#30C0CF] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#25CE7B]" />
              Try Demo
            </Link>
            <a
              href="#showcase"
              className="flex items-center gap-1.5 hover:text-[#30C0CF] transition-colors"
            >
              Showcase
            </a>
            <a
              href="#features"
              className="flex items-center gap-1.5 hover:text-[#30C0CF] transition-colors"
            >
              Why Ripple
            </a>
            <a
              href="#builders"
              className="flex items-center gap-1.5 hover:text-[#30C0CF] transition-colors"
            >
              Builders
            </a>
            <a
              href="#resources"
              className="flex items-center gap-1.5 hover:text-[#30C0CF] transition-colors"
            >
              Resources
            </a>
          </div>

          {/* Right Action Elements */}
          <div className="flex items-center gap-4">
            {/* 1. Header Status Badge */}
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#d8dce2] bg-[#f8f8f9] px-3.5 py-1.5 text-xs font-medium text-[#002444]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25CE7B] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25CE7B]"></span>
              </span>
              <span>Ripple Sandbox: Active</span>
            </div>

            <Link
              href="/showcase/ripple-sandbox"
              className="inline-flex items-center justify-center rounded-full bg-[#002444] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#7580ef] hover:scale-[1.02] active:scale-[0.98]"
            >
              Try live demo
            </Link>
          </div>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[20%] left-[5%] h-[340px] w-[380px] rounded-full bg-gradient-to-tr from-[#ff6608]/20 via-[#ff8a2d]/15 to-[#ffe88f]/20 blur-[60px]" />
          <div className="absolute top-[25%] right-[8%] h-[360px] w-[400px] rounded-full bg-[#7580ef]/18 blur-[65px]" />
          <div className="absolute top-[35%] left-1/2 -translate-x-1/2 h-[450px] w-[600px] rounded-full bg-[#e0fdff]/40 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 text-center">
          {/* 2. Hero Top Pill */}
          <Link
            href="/showcase/ripple-sandbox"
            className="inline-flex items-center gap-2.5 rounded-full border border-[#d8dce2] bg-white px-4 py-1.5 text-xs font-semibold text-[#002444] shadow-sm hover:border-[#7580ef] transition-colors mb-8"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#30C0CF]/20 text-[#00838f] text-[10px]">
              ★
            </span>
            <span>A working pilot, built on a simulated version of Cardtonic&apos;s card API</span>
            <span className="text-[#7580ef]">&rarr;</span>
          </Link>

          {/* Hero Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-[#002444] sm:text-6xl lg:text-7xl leading-[1.12]">
            See what businesses are{" "}
            <span className="text-[#30C0CF] underline decoration-[#30C0CF]/30 decoration-wavy">
              already building
            </span>{" "}
            with Cardtonic
          </h1>

          {/* Hero Subtext */}
          <p className="mt-6 text-lg sm:text-xl font-normal leading-relaxed text-[#1b507e] max-w-2xl mx-auto">
            Ripple showcases a working simulation built on Cardtonic&apos;s business card API — created
            by a Cardtonic Upskill applicant, proving what&apos;s possible before you integrate.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/showcase/ripple-sandbox"
              className="inline-flex items-center justify-center rounded-full bg-[#002444] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#002444]/15 transition-all duration-200 hover:bg-[#7580ef] hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore the API in action
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-[#d8dce2] bg-white px-8 py-4 text-base font-semibold text-[#002444] shadow-sm transition-all duration-200 hover:bg-[#f8f8f9] hover:border-[#7580ef] hover:scale-[1.02] active:scale-[0.98]"
            >
              See integration examples &rarr;
            </a>
          </div>

          {/* 3. Stats Row */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl mx-auto border-t border-[#d8dce2]/80 pt-10">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-[#002444]">1</span>
              <span className="text-xs font-medium text-[#1b507e] mt-1">
                Working Pilot, Built Solo
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-[#002444]">3</span>
              <span className="text-xs font-medium text-[#1b507e] mt-1">
                Days to Build End-to-End
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-extrabold text-[#002444]">5x</span>
              <span className="text-xs font-medium text-[#1b507e] mt-1">
                Automated Anomaly Threshold
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Showcase Cards Section (Single Real Card + Dashed Placeholders) */}
      <section id="showcase" className="relative w-full py-16 bg-[#f8f8f9] border-y border-[#e6ecf2]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center rounded-full bg-[#eceffd] px-3.5 py-1 text-xs font-semibold text-[#7580ef]">
              Builder Showcase
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-[#002444] sm:text-4xl tracking-tight">
              Verified Integration Proof
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#1b507e]">
              Explore working pilot implementations. Click into the project to inspect the code, architecture, and live interactive sandbox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real Builder Card */}
            <Link
              href="/showcase/ripple-sandbox"
              className="group block rounded-[24px] border border-[#d8dce2] bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#30C0CF] hover:shadow-xl hover:shadow-[#30c0cf]/10 hover:-translate-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-tr from-[#002444] to-[#7580ef] text-base font-bold text-white shadow-sm">
                    J
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#002444] leading-tight group-hover:text-[#00838f] transition-colors">
                      [Joshua Adelasoye]
                    </h3>
                    <span className="text-xs text-[#1b507e] block">
                      Software Engineering Track — Upskill Applicant
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold bg-[#e0fdff] text-[#00838f] border-[#30c0cf]/30">
                  Fintech
                </span>
              </div>

              <h4 className="mt-5 text-lg font-bold text-[#002444]">
                Ripple Sandbox: Card Issuance &amp; Fraud Check
              </h4>

              <div className="mt-3 space-y-2 text-xs text-[#1b507e] leading-relaxed line-clamp-4">
                <p>
                  I built a working simulation of what Cardtonic&apos;s upcoming Pil API could look like for a business — a small sandboxed backend that issues virtual cards, funds them, and runs an anomaly check on transactions before approving them. It isn&apos;t connected to Cardtonic&apos;s real infrastructure; I don&apos;t have access to that. It&apos;s a proof of pattern: given the general shape of a card-issuing API, this is a plausible way a business could use it, and what a basic fraud-check layer on top of it could look like.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f0f2f5] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#25CE7B] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25CE7B]" />
                  Active Live Sandbox
                </span>
                <span className="text-[#7580ef] font-bold group-hover:translate-x-0.5 transition-transform">
                  Open case study &amp; demo &rarr;
                </span>
              </div>
            </Link>

            {/* Placeholder Outline 1 */}
            <div className="rounded-[24px] border-2 border-dashed border-[#d8dce2] bg-white/50 p-8 flex flex-col items-center justify-center text-center transition-all hover:border-[#30c0cf]/40">
              <div className="h-12 w-12 rounded-2xl bg-[#f0f2f5] flex items-center justify-center text-[#1b507e] mb-4">
                <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h5 className="text-base font-bold text-slate-500">
                Future submission
              </h5>
              <p className="text-xs text-slate-400 mt-2 max-w-xs">
                Reserved for upcoming pilot projects built by applicants and alumni.
              </p>
              <span className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                Coming soon
              </span>
            </div>

            {/* Placeholder Outline 2 */}
            <div className="rounded-[24px] border-2 border-dashed border-[#d8dce2] bg-white/50 p-8 flex flex-col items-center justify-center text-center transition-all hover:border-[#30c0cf]/40">
              <div className="h-12 w-12 rounded-2xl bg-[#f0f2f5] flex items-center justify-center text-[#1b507e] mb-4">
                <svg className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h5 className="text-base font-bold text-slate-500">
                Future submission
              </h5>
              <p className="text-xs text-slate-400 mt-2 max-w-xs">
                Peer-verified business blueprints and card infrastructure integrations.
              </p>
              <span className="mt-4 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-500">
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Enterprise Evaluation Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center rounded-full bg-[#eceffd] px-3.5 py-1 text-xs font-semibold text-[#7580ef]">
            Enterprise Evaluation
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-[#002444] sm:text-5xl tracking-tight">
            Evaluate the Pil API Before You Write Code
          </h2>
          {/* 9. Enterprise Evaluation Section Subtext */}
          <p className="mt-4 text-base sm:text-lg text-[#1b507e] font-normal leading-relaxed">
            Ripple gives engineering leaders and finance executives a hands-on simulation of how card issuance, automated risk controls, and programmatic funding could work on Cardtonic&apos;s Pil API.
          </p>
        </div>

        {/* 4 B2B Evaluation Cards with (simulated) tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Virtual Card Issuance */}
          <div className="group rounded-[22px] border border-[#d8dce2] bg-[#f8f8f9] p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-white hover:border-[#30C0CF] hover:shadow-xl hover:shadow-[#30c0cf]/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0fdff] text-[#00838f]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-[#002444] group-hover:text-[#00838f] transition-colors">
              Instant Card Issuance
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1b507e]">
              Test on-demand virtual card generation with instant PAN masking, custom budget caps, and team labels via <code>/api/issue-card (simulated)</code>.
            </p>
            <div className="mt-6 font-semibold text-xs text-[#00838f] flex items-center gap-1">
              <span>Card issuance endpoint</span> &rarr;
            </div>
          </div>

          {/* Card 2: 5x Anomaly & Risk Engine */}
          <div className="group rounded-[22px] border border-[#d8dce2] bg-[#f8f8f9] p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-white hover:border-[#7580ef] hover:shadow-xl hover:shadow-[#7580ef]/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eceffd] text-[#7580ef]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-[#002444] group-hover:text-[#7580ef] transition-colors">
              Automated Trust Checks
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1b507e]">
              Evaluate real-time spending anomaly detection that automatically flags transactions exceeding 5x historical card averages via <code>/api/check-transaction (simulated)</code>.
            </p>
            <div className="mt-6 font-semibold text-xs text-[#7580ef] flex items-center gap-1">
              <span>Risk check endpoint</span> &rarr;
            </div>
          </div>

          {/* Card 3: Dynamic Balance Funding */}
          <div className="group rounded-[22px] border border-[#d8dce2] bg-[#f8f8f9] p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-white hover:border-[#ff8058] hover:shadow-xl hover:shadow-[#ff8058]/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffe4db] text-[#ff6608]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-[#002444] group-hover:text-[#ff6608] transition-colors">
              Programmatic Funding
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1b507e]">
              Validate programmatic top-ups and balance allocation logic across departments in real time via <code>/api/fund-card (simulated)</code>.
            </p>
            <div className="mt-6 font-semibold text-xs text-[#ff6608] flex items-center gap-1">
              <span>Fund card endpoint</span> &rarr;
            </div>
          </div>

          {/* Card 4: Faster Time-to-Market */}
          <div className="group rounded-[22px] border border-[#d8dce2] bg-[#f8f8f9] p-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-white hover:border-[#25ce7b] hover:shadow-xl hover:shadow-[#25ce7b]/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e2fbe8] text-[#0b8043]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-bold text-[#002444] group-hover:text-[#0b8043] transition-colors">
              Accelerated Integration
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#1b507e]">
              Reference pre-tested, functional integration patterns to shave weeks off your team&apos;s product development cycle.
            </p>
            <div className="mt-6 font-semibold text-xs text-[#0b8043] flex items-center gap-1">
              <span>Integration blueprints</span> &rarr;
            </div>
          </div>
        </div>
      </section>

      {/* 6. Builders Section */}
      <section id="builders" className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="rounded-[28px] border border-[#d8dce2] bg-[#f8f8f9] p-8 sm:p-14 transition-all">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full bg-[#eceffd] px-3.5 py-1 text-xs font-semibold text-[#7580ef]">
                For Upskill Alumni &amp; Builders
              </span>
              <h3 className="mt-3 text-2xl sm:text-4xl font-extrabold text-[#002444] tracking-tight">
                Built an integration with Cardtonic? Showcase your work.
              </h3>
              {/* 7. Builders section description */}
              <p className="mt-4 text-base text-[#1b507e] leading-relaxed">
                This is designed to become the place where future builds get put in front of companies and hiring teams evaluating Cardtonic&apos;s Pil API — submit a project, and it becomes part of a growing, honestly-labeled body of proof.
              </p>
            </div>

            {/* 8. Coming Soon Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/coming-soon"
                className="inline-flex items-center justify-center rounded-full bg-[#002444] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#7580ef] hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit your integration (Coming soon)
              </Link>
              <Link
                href="/coming-soon"
                className="inline-flex items-center justify-center rounded-full border border-[#d8dce2] bg-white px-7 py-3.5 text-sm font-semibold text-[#002444] transition-all duration-200 hover:bg-[#f8f8f9] hover:border-[#7580ef] hover:scale-[1.02] active:scale-[0.98]"
              >
                Builder guidelines (Coming soon) &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer id="resources" className="w-full bg-[#002444] text-white pt-16 pb-12 mt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          {/* Top exploration bar */}
          <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-white/[0.08] border border-white/[0.14] px-6 py-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#30C0CF]/20 text-[#30C0CF]">
                ✦
              </span>
              <div>
                <p className="text-sm font-semibold text-white">
                  Evaluating Cardtonic&apos;s Pil API for your company?
                </p>
                <p className="text-xs text-[#d1e0e4]">
                  Browse verified integration blueprints, endpoint specifications, and builder code.
                </p>
              </div>
            </div>
            <Link
              href="/showcase/ripple-sandbox"
              className="inline-flex items-center justify-center rounded-full bg-[#30C0CF] px-5 py-2 text-xs font-bold text-[#002444] transition-colors hover:bg-white"
            >
              Explore live demo
            </Link>
          </div>

          {/* 4-Column Directory */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 pb-14 border-b border-white/10">
            {/* Column 1: Brand & Description (Requirement 5) */}
            <div className="space-y-4">
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
              {/* 5. Footer description */}
              <p className="text-xs text-[#d1e0e4] leading-relaxed">
                A working pilot of what a proof-of-API showcase could look like for Cardtonic&apos;s Pil product. Built independently by a Software Engineering track applicant in Cardtonic&apos;s Upskill program.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[11px] text-[#25CE7B]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25CE7B]" />
                  Ripple Sandbox: Active
                </span>
              </div>
            </div>

            {/* Column 2: API Endpoints & Capabilities */}
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                API Capabilities
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-[#d1e0e4]">
                <li>
                  <span className="hover:text-[#30C0CF] transition-colors">
                    POST /api/issue-card (simulated)
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#30C0CF] transition-colors">
                    POST /api/fund-card (simulated)
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#30C0CF] transition-colors">
                    GET /api/cards (simulated)
                  </span>
                </li>
                <li>
                  <span className="hover:text-[#30C0CF] transition-colors">
                    POST /api/check-transaction (5x simulated)
                  </span>
                </li>
                <li>
                  <a href="/api/status" target="_blank" rel="noreferrer" className="hover:text-[#30C0CF] transition-colors">
                    GET /api/status
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources & Builders (Requirement 8) */}
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                Resources
              </h4>
              <ul className="mt-4 space-y-2.5 text-xs text-[#d1e0e4]">
                <li>
                  <a href="#features" className="hover:text-[#30C0CF] transition-colors">
                    Integration Blueprints
                  </a>
                </li>
                <li>
                  {/* 8. Alumni Builder Directory (Coming soon) */}
                  <Link href="/coming-soon" className="hover:text-[#30C0CF] transition-colors">
                    Alumni Builder Directory (Coming soon)
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon" className="hover:text-[#30C0CF] transition-colors">
                    Submit a Project (Coming soon)
                  </Link>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#30C0CF] transition-colors">
                    Fraud Check Specs
                  </a>
                </li>
                <li>
                  <a href="/api/status" target="_blank" rel="noreferrer" className="hover:text-[#30C0CF] transition-colors">
                    System Health
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Cardtonic & Upskill Affiliation (Requirement 6) */}
            <div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                Affiliation &amp; Status
              </h4>
              <p className="mt-4 text-xs text-[#d1e0e4] leading-relaxed">
                Modeled after Cardtonic&apos;s high-trust fintech design system and built by an Upskill track applicant.
              </p>
              {/* 6. Footer Badges: removed 'Cardtonic Ecosystem', updated to 'Upskill Applicant' */}
              <div className="mt-4 flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-white">
                  Upskill Applicant
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright & Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d1e0e4]">
            <p>&copy; {new Date().getFullYear()} Ripple. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/showcase/ripple-sandbox" className="hover:text-white transition-colors">
                Showcase Case Study
              </Link>
              <Link href="/coming-soon" className="hover:text-white transition-colors">
                Directory (Coming soon)
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
