import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"]
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export function withTimeout<T>(promise: Promise<T>, ms: number, label = "operation"): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_resolve, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error(`${label} timed out after ${ms}ms`));
      }, ms);
    })
  ]);
}

