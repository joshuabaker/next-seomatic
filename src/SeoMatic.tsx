import React, { FC } from "react";
import { JsonLd, JsonLdProps } from "./JsonLd";
import { Scripts, ScriptsProps } from "./Scripts";

type SeoMaticProps = JsonLdProps & ScriptsProps;

export const SeoMatic: FC<SeoMaticProps> = ({
  metaJsonLdContainer,
  metaScriptContainer,
}) => {
  return (
    <>
      <JsonLd metaJsonLdContainer={metaJsonLdContainer} />
      <Scripts metaScriptContainer={metaScriptContainer} />
    </>
  );
};
