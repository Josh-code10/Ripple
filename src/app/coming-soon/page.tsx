import Link from "next/link";
import Image from "next/image";

export default function ComingSoonPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#002444] flex flex-col justify-between overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#f0f2f5]">
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

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8dce2] bg-[#f8f8f9] px-3.5 py-1.5 text-xs font-medium text-[#002444]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25CE7B] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#25CE7B]"></span>
              </span>
              <span>Ripple Sandbox: Active</span>
            </div>

            <Link
              href="/showcase/ripple-sandbox"
              className="inline-flex items-center justify-center rounded-full bg-[#002444] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#7580ef] hover:scale-[1.02]"
            >
              Try live demo
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#eceffd] px-4 py-1.5 text-xs font-semibold text-[#7580ef] mb-6">
          <span>Future Pipeline</span> &bull; <span>In Development</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#002444]">
          This feature isn&apos;t live yet
        </h1>

        <p className="mt-6 text-base sm:text-lg text-[#1b507e] leading-relaxed max-w-xl mx-auto">
          Ripple is currently a working pilot with its first builder entry. The community submission pipeline, peer code verification, and builder directory will open once additional pilot projects are onboarded.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#002444] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[#7580ef] hover:scale-[1.02]"
          >
            &larr; Back to Home
          </Link>
          <Link
            href="/showcase/ripple-sandbox"
            className="inline-flex items-center justify-center rounded-full border border-[#d8dce2] bg-white px-8 py-3.5 text-sm font-semibold text-[#002444] transition-all duration-200 hover:bg-[#f8f8f9] hover:border-[#7580ef]"
          >
            Explore the Live Sandbox Demo &rarr;
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#002444] text-white py-8 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#d1e0e4]">
          <p>&copy; {new Date().getFullYear()} Ripple. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/showcase/ripple-sandbox" className="hover:text-white transition-colors">Showcase</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
