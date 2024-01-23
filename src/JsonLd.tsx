import { ContainerInputType, parseContainer } from "./utils";
import React, { FC } from "react";

export interface JsonLdProps {
  metaJsonLdContainer: ContainerInputType;
}

export const JsonLd: FC<JsonLdProps> = ({ metaJsonLdContainer }) => {
  let jsonLd = parseContainer(metaJsonLdContainer);

  if (!jsonLd) {
    return null;
  }

  if (!jsonLd["@context"] && !jsonLd["@graph"]) {
    const values = Object.values(jsonLd);
    jsonLd = {
      "@context": values?.[0]?.["@context"] ?? "http://schema.org",
      "@graph": values,
    };
  }

  return (
    <script
      key="jsonLd"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
};
