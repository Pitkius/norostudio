import { MotionReveal } from "@/components/motion-reveal";

export function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-[92vh] items-center overflow-hidden text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(99,102,241,0.35),transparent_48%),radial-gradient(circle_at_85%_30%,rgba(236,72,153,0.14),transparent_35%)]" />
      <div className="container-main relative">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-slate-900/40 p-8 shadow-soft backdrop-blur-2xl sm:p-12">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-300/60 to-transparent" />
            <div>
              <div className="space-y-7">
                <div className="inline-flex items-center gap-4 rounded-full border border-white/15 bg-white/5 px-3 py-2">
                  <div className="h-11 w-11 overflow-hidden rounded-full bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/logo/Logo.svg"
                      alt="Noro Studio"
                      width={44}
                      height={44}
                      className="h-full w-full  object-cover object-center"
                    />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-slate-300">Noro Studio</span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm text-indigo-200/90">Freelance Web Developer</p>
                  <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
                    Kuriu <span className="gradient-text">premium</span> interneto patirtis.
                  </h1>
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
                    Modernus dizainas, aiški architektūra ir greitas veikimas. Nuo įspūdingų portfolio
                    iki verslo sistemų, kurios paverčia lankytojus klientais.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a className="btn-primary" href="#portfolio">Peržiūrėti projektus</a>
                  <a className="btn-outline" href="#contact">Pradėti projektą</a>
                </div>
              </div>

            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
