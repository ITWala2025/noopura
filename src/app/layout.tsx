import type { Metadata } from "next";
import "./globals.css";
import { buildPageMetadata, getEducationalOrganizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Noopura Indian Classical School of Dance | Dublin",
    description:
      "Official conservatory of Noopura Indian Classical School of Dance in Dublin, Ireland. Authentic training in Bharatanatyam, Mohiniyattam, and Kuchipudi for kids, youth, and adults.",
    path: "/",
  }),
  title: {
    default: "Noopura Indian Classical School of Dance | Dublin",
    template: "%s | Noopura Dance School",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJsonLd = getEducationalOrganizationJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="font-sans antialiased text-sage-deep bg-sage-mist"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
