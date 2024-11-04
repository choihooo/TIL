import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import getConfig from "../../lib/getConfig";
import { Config } from "../../types/config";

const config: Config = getConfig();

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar author={config.site.author} />
        {children}
      </body>
    </html>
  );
}
