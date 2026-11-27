import type { Metadata } from "next";
import type { DanceClass } from "@/types/database";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://noopura.ie";

export const SCHOOL_NAME = "Noopura Indian Classical School of Dance";

interface BuildMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}

/** Generate consistent Next.js Metadata with Open Graph & Twitter cards. */
export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    keywords: [
      "Noopura",
      "Indian classical dance Dublin",
      "Bharatanatyam Dublin",
      "Mohiniyattam Ireland",
      "Kuchipudi classes",
      "Noopura by Shini",
      ...keywords,
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SCHOOL_NAME}`,
      description,
      url,
      siteName: SCHOOL_NAME,
      locale: "en_IE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SCHOOL_NAME}`,
      description,
    },
  };
}

/** JSON-LD EducationalOrganization schema for root/about pages. */
export function getEducationalOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: SCHOOL_NAME,
    alternateName: "Noopura by Shini",
    url: SITE_URL,
    description:
      "Premier Indian classical dance conservatory in Dublin, Ireland teaching Bharatanatyam, Mohiniyattam, and Kuchipudi across kids, youth, and adult batches.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dublin",
      addressCountry: "IE",
    },
    areaServed: "Dublin, Ireland",
    sameAs: ["https://allid.me/noopura/"],
  };
}

/** JSON-LD Course schema for a specific dance class. */
export function getCourseJsonLd(danceClass: DanceClass) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: danceClass.title,
    description: danceClass.description,
    provider: {
      "@type": "EducationalOrganization",
      name: SCHOOL_NAME,
      sameAs: SITE_URL,
    },
    educationalLevel: danceClass.level,
    offers: {
      "@type": "Offer",
      price: danceClass.monthlyFeeEur,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };
}
