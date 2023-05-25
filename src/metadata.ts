import { Metadata } from "next";
import { OpenGraphTypeEnum, ReferrerEnum, TwitterCardEnum } from "./types";
import { ContainerInputType, getTag, parseContainer } from "./utils";

export function getMetadata({
  metaLinkContainer,
  metaTagContainer,
  metaTitleContainer,
}: {
  metaLinkContainer: ContainerInputType;
  metaTagContainer: ContainerInputType;
  metaTitleContainer: ContainerInputType;
}): Metadata {
  const link = parseContainer(metaLinkContainer) as {
    author?: { href: string };
    publisher?: { href: string };
    canonical?: { href: string };
  };

  const tag = parseContainer(metaTagContainer);

  const title = parseContainer(metaTitleContainer) as {
    title: { title: string };
  };

  const ogImage = getTag(tag, "og:image");
  const twitterImage = getTag(tag, "twitter:image");

  return {
    title: title?.title?.title,

    description: getTag(tag, "description"),

    referrer: getTag(tag, "referrer") as ReferrerEnum,
    keywords: getTag(tag, "keywords"),
    authors: [{ url: link?.author?.href }],
    publisher: link?.publisher?.href,

    openGraph: {
      locale: getTag(tag, "og:locale"),
      alternateLocale: getTag(tag, "og:locale:alternate"),
      siteName: getTag(tag, "og:site_name"),
      type: getTag(tag, "og:type") as OpenGraphTypeEnum,
      url: getTag(tag, "og:url"),
      title: getTag(tag, "og:title"),
      description: getTag(tag, "og:description"),
      images: ogImage
        ? [
            {
              url: ogImage,
              width: getTag(tag, "og:width"),
              height: getTag(tag, "og:height"),
              alt: getTag(tag, "og:alt"),
            },
          ]
        : undefined,
    },

    robots: getTag(tag, "robots"),

    twitter: {
      card: getTag(tag, "twitter.card") as TwitterCardEnum,
      site: getTag(tag, "twitter:site"),
      creator: getTag(tag, "twitter:creator"),
      title: getTag(tag, "twitter:title"),
      description: getTag(tag, "twitter:description"),
      images: twitterImage
        ? [
            {
              url: twitterImage,
              width: getTag(tag, "twitter:image:width"),
              height: getTag(tag, "twitter:image:height"),
              alt: getTag(tag, "twitter:image:alt"),
            },
          ]
        : undefined,
    },

    verification: {
      google: getTag(tag, "google-site-verification"),
    },

    alternates: {
      canonical: link?.canonical?.href,
    },
  };
}
