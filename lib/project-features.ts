/** Labeled walkthrough screens for project galleries. */
export type ProjectScreen = {
  src: string;
  label: string;
  blurb: string;
};

export function getProjectScreens(title: string, images: string[]): ProjectScreen[] {
  const t = title.toLowerCase();

  if (t.includes("motelis") || t.includes("gyvūn")) {
    return [
      {
        src: "/projects/motel-mockup-booking.png",
        label: "01 · Rezervacija",
        blurb: "Kalendorius, pastabos ir nakvynės užklausa."
      },
      {
        src: "/projects/motel-mockup-profile.png",
        label: "02 · Profilis",
        blurb: "Augintinio info ir nuotraukos po apsistojimo."
      },
      {
        src: "/projects/motel-mockup-admin.png",
        label: "03 · Admin",
        blurb: "Rezervacijų patvirtinimas ir slotų valdymas."
      }
    ];
  }

  if (t.includes("forge")) {
    return [
      {
        src: "/projects/mockup-forge-ai.png",
        label: "01 · Hero",
        blurb: "Produkto pristatymas ir pagrindinė CTA."
      },
      {
        src: "/projects/forge-mockup-dashboard.png",
        label: "02 · Dashboard",
        blurb: "Dokumentų sąrašas, statusai ir navigacija."
      },
      {
        src: "/projects/forge-mockup-document.png",
        label: "03 · Analizė",
        blurb: "Failo peržiūra ir AI santrauka."
      }
    ];
  }

  if (t.includes("aether")) {
    return [
      {
        src: "/projects/mockup-aether-lab.png",
        label: "01 · Hero",
        blurb: "AI studijos brand ir konversijos hero."
      },
      {
        src: "/projects/aether-mockup-services.png",
        label: "02 · Paslaugos",
        blurb: "Konsultacijų / research pasiūlymai."
      },
      {
        src: "/projects/aether-mockup-case.png",
        label: "03 · Case study",
        blurb: "Projekto rezultatai ir detalus aprašymas."
      }
    ];
  }

  if (t.includes("forma") || t.includes("atelier") || t.includes("plauk")) {
    return [
      {
        src: "/projects/mockup-forma-salon.png",
        label: "01 · Hero",
        blurb: "Salon brand ir rezervacijos kvietimas."
      },
      {
        src: "/projects/forma-mockup-booking.png",
        label: "02 · Rezervacija",
        blurb: "Stilistas, laikai ir rezervacijos forma."
      },
      {
        src: "/projects/forma-mockup-services.png",
        label: "03 · Paslaugos",
        blurb: "Meniu ir kainos redakciniu layout’u."
      }
    ];
  }

  return images.map((src, i) => ({
    src,
    label: `0${i + 1} · Vaizdas`,
    blurb: "Projekto ekranas"
  }));
}

export function getProjectFeatures(title: string): string[] {
  const t = title.toLowerCase();

  if (t.includes("forge")) {
    return [
      "AI dokumentų analizė ir santraukos",
      "Automatizuoti workflow operatoriams",
      "Saugus prisijungimas ir rolės",
      "Dashboard su užduočių statusu",
      "Integracijos su įmonės failais",
      "Mobiliai pritaikytas produktų UI"
    ];
  }

  if (t.includes("aether")) {
    return [
      "AI studijos paslaugų vitrina",
      "Case studies ir research blokai",
      "Aiški CTA konversijai",
      "SEO struktūra B2B auditorijai",
      "Greitas Next.js frontendas",
      "Brand sistema be šabloninio look"
    ];
  }

  if (t.includes("forma") || t.includes("atelier") || t.includes("plauk")) {
    return [
      "Online rezervacijos CTA",
      "Paslaugų meniu (kirpimas, dažymas, priežiūra)",
      "Meistrų / stilistų profiliai",
      "Darbų galerija (prieš–po)",
      "Kontaktai ir darbo laikas",
      "Mobilus, greitas UI"
    ];
  }

  if (t.includes("motelis") || t.includes("gyvūn")) {
    return [
      "Rezervacija su kalendoriumi",
      "Pastabos apie režimą / poreikius",
      "Šeimininko profilis",
      "Augintinio nuotraukos",
      "Admin: patvirtinimas ir statusai",
      "Slotų / laikų valdymas"
    ];
  }

  return [
    "Individualus dizainas",
    "Greitas ir mobilus frontendas",
    "SEO pagrindai",
    "Kontaktų / konversijos srautas"
  ];
}
