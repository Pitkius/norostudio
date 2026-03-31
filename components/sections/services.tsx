import { Container } from "@/components/ui";
import { prisma } from "@/lib/db";
import { MotionReveal } from "@/components/motion-reveal";

const fallback = [
  {
    title: "Paprasta svetainė (1 puslapio)",
    description:
      "Puikus pasirinkimas, jei norite greitai turėti savo puslapį internete - paslaugai, asmeniniam brandui ar mažam verslui.",
    price: "nuo 300 €",
    features: [
      "Tvarkingas ir modernus dizainas",
      "Veikia telefone ir kompiuteryje",
      "Pagrindinė informacija viename puslapyje",
      "Svetainės paleidimas internete"
    ]
  },
  {
    title: "Verslo svetainė",
    description:
      "Skirta verslui, kuris nori atrodyti profesionaliai ir turėti daugiau informacijos klientams.",
    price: "nuo 500 €",
    features: [
      "Individualiai sukurtas dizainas",
      "Keli puslapiai (apie mus, paslaugos, kontaktai)",
      "Kontaktų forma klientams",
      "SEO pagrindai ir papildomų funkcijų integracija"
    ]
  },
  {
    title: "Web aplikacija (sistema)",
    description:
      "Tinka, jei reikia ne tik svetainės, bet ir sistemos: registracijos, paskyrų, rezervacijų ar duomenų valdymo.",
    price: "nuo 1000 €",
    features: [
      "Prisijungimo ir registracijos sistema",
      "Vartotojų paskyros",
      "Admin panelė valdymui",
      "Rezervacijos ir duomenų valdymas"
    ]
  }
];

export async function ServicesSection() {
  const fromDb = await prisma.servicePlan.findMany({
    where: { isActive: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }]
  });
  const services =
    fromDb.length > 0
      ? fromDb.map((s) => ({
          title: s.title,
          description: s.description,
          price: s.price,
          features: s.features
        }))
      : fallback;

  return (
    <Container id="services">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <MotionReveal className="max-w-md space-y-4">
          <h2 className="section-title">Paslaugos ir kainos</h2>
          <p className="section-subtitle">
            Kiekvienas projektas yra skirtingas, todėl kainos gali keistis pagal jūsų poreikius.
            Žemiau pateikti paprasti planai padės aiškiai suprasti, ką gaunate.
          </p>
          <p className="text-xs text-slate-400">
            Jei nežinote, ko tiksliai reikia, parašykite - padėsiu išsirinkti tinkamiausią
            variantą ir parengsiu individualų pasiūlymą pagal biudžetą.
          </p>
        </MotionReveal>
        <div className="grid flex-1 gap-5 md:grid-cols-3">
          {services.map((service, i) => (
            <MotionReveal key={service.title} delayMs={i * 80}>
              <article className="card flex h-full flex-col justify-between transition hover:-translate-y-1 hover:border-indigo-300/30">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {service.description}
                </p>
                <p className="mt-3 text-sm font-semibold text-indigo-300">
                  {service.price}
                </p>
                <ul className="mt-3 space-y-1 text-xs text-slate-300">
                  {service.features.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-white/20 px-5 py-2 text-xs font-semibold text-slate-100 transition hover:border-indigo-300 hover:bg-indigo-500/20"
              >
                Gauti pasiūlymą
              </a>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </Container>
  );
}

