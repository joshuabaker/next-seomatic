import { ContainerInputType, parseContainer } from "./utils";
import React, { FC } from "react";

export interface JsonLdProps {
  metaJsonLdContainer: ContainerInputType;
}

export const JsonLd: FC<JsonLdProps> = ({ metaJsonLdContainer }) => {
  const jsonLd = parseContainer(metaJsonLdContainer);

  if (!jsonLd) {
    return null;
  }

  return (
    <script
      key="jsonLd"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
