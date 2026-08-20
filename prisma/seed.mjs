import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "change-this-password";
  const fallbackEmail = "admin@example.com";
  const passwordHash = await bcrypt.hash(password, 10);

  const fallback = await prisma.adminUser.findUnique({ where: { email: fallbackEmail } });
  if (fallback && email !== fallbackEmail) {
    await prisma.adminUser.update({
      where: { email: fallbackEmail },
      data: { email, passwordHash }
    });
    console.log(`Updated default admin to: ${email}`);
  } else {
    await prisma.adminUser.upsert({
      where: { email },
      update: { passwordHash },
      create: { email, passwordHash }
    });
    console.log(`Admin is ready: ${email}`);
  }

  const projectCount = await prisma.portfolioProject.count();
  if (projectCount === 0) {
    await prisma.portfolioProject.createMany({
      data: [
        {
          title: "Forge AI — dokumentų intelektas",
          description:
            "AI dokumentų intelektas verslui. Galerijoje: hero, dashboard ir analizės ekranas.",
          technologies: ["Next.js", "SaaS", "Product UI"],
          liveUrl: "#",
          images: [
            "/projects/mockup-forge-ai.png",
            "/projects/forge-mockup-dashboard.png",
            "/projects/forge-mockup-document.png"
          ],
          order: -1,
          isPublished: true
        },
        {
          title: "Aether Lab — AI studija",
          description:
            "AI studijos kryptis. Galerijoje: hero, paslaugos ir case study.",
          technologies: ["Next.js", "AI brand", "SEO"],
          liveUrl: "#",
          images: [
            "/projects/mockup-aether-lab.png",
            "/projects/aether-mockup-services.png",
            "/projects/aether-mockup-case.png"
          ],
          order: 0,
          isPublished: true
        },
        {
          title: "FORMA — plaukų atelier",
          description:
            "Plaukų atelier. Galerijoje: hero, rezervacija ir paslaugų meniu.",
          technologies: ["Next.js", "Brand", "Booking CTA"],
          liveUrl: "#",
          images: [
            "/projects/mockup-forma-salon.png",
            "/projects/forma-mockup-booking.png",
            "/projects/forma-mockup-services.png"
          ],
          order: 1,
          isPublished: true
        },
        {
          title: "Gyvūnų motelis",
          description:
            "Rezervacijos, profilis ir admin — pilna gyvūnų motelio sistema. Galerijoje: funkcionalumo ekranai.",
          technologies: ["Next.js", "TypeScript", "UI/UX"],
          liveUrl: "#",
          images: [
            "/projects/motel-mockup-booking.png",
            "/projects/motel-mockup-profile.png",
            "/projects/motel-mockup-admin.png"
          ],
          order: 2,
          isPublished: true
        }
      ]
    });
    console.log("Seeded sample portfolio projects");
  }

  const serviceCount = await prisma.servicePlan.count();
  if (serviceCount === 0) {
    await prisma.servicePlan.createMany({
      data: [
        {
          title: "Paprasta svetainė (1 puslapio)",
          description:
            "Greitas ir tvarkingas puslapis paslaugai, asmeniniam brandui ar mažam verslui.",
          price: "nuo 300 €",
          features: ["Modernus dizainas", "Mobilus + desktop", "Viena aiški struktūra", "Paleidimas internete"],
          order: 1,
          isActive: true
        },
        {
          title: "Verslo svetainė",
          description:
            "Keli puslapiai, kontaktų forma ir SEO pagrindai — kai reikia atrodyti solidžiai.",
          price: "nuo 500 €",
          features: ["Individualus dizainas", "Keli puslapiai", "Kontaktų forma", "SEO pagrindai"],
          order: 2,
          isActive: true
        },
        {
          title: "Web aplikacija",
          description:
            "Kai reikia sistemos: paskyrų, rezervacijų ar duomenų valdymo, ne tik vitrinos.",
          price: "nuo 1000 €",
          features: ["Prisijungimas", "Vartotojų paskyros", "Admin panelė", "Duomenų valdymas"],
          order: 3,
          isActive: true
        }
      ]
    });
    console.log("Seeded sample services");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
