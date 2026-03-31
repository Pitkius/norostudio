import { ReactNode } from "react";

export const metadata = {
  robots: {
    index: false,
    follow: false
  }
};

export default function SecretAdminLayout({ children }: { children: ReactNode }) {
  return children;
}
