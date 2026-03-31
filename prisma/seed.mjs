import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "change-this-password";
  const fallbackEmail = "admin@example.com";
  const passwordHash = await bcrypt.hash(password, 10);

  // If old default admin exists, migrate it to current .env credentials.
  const fallback = await prisma.adminUser.findUnique({ where: { email: fallbackEmail } });
  if (fallback && email !== fallbackEmail) {
    await prisma.adminUser.update({
      where: { email: fallbackEmail },
      data: { email, passwordHash }
    });
    console.log(`Updated default admin to: ${email}`);
    return;
  }

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash }
  });

  console.log(`Admin is ready: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

