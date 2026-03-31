import Link from "next/link";

const links = [
  { href: "#home", label: "Pradžia" },
  { href: "#about", label: "Apie mane" },
  { href: "#services", label: "Paslaugos" },
  { href: "#portfolio", label: "Darbai" },
  { href: "#logos", label: "Logotipai" },
  { href: "#contact", label: "Kontaktai" }
];

export function MainNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="container-main flex items-center justify-between py-4">
        <Link href="#home" className="flex items-center gap-3 text-sm font-semibold tracking-tight text-slate-100">
          <span className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white shadow-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/Logo.svg"
              alt="Noro Studio logo"
              width={56}
              height={56}
              className="h-full w-full  object-cover object-center"
            />
          </span>
          <span className="text-slate-100">Noro Studio</span>
        </Link>
        <nav className="hidden items-center gap-6 text-xs font-medium text-slate-400 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-slate-50"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

