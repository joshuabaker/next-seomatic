import { ContainerInputType, parseContainer } from "./utils";
import React, { FC } from "react";

export interface ScriptsProps {
  metaScriptContainer: ContainerInputType;
}

export const Scripts: FC<ScriptsProps> = ({ metaScriptContainer }) => {
  const script = parseContainer(metaScriptContainer);

  if (!script) {
    return null;
  }

  const html = (
    Object.entries(script) as [string, { script: string; bodyScript: string }][]
  )
    .flatMap(([, v]) => v?.script ?? v?.bodyScript)
    .join("");

  if (!html) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: 0,
      }}
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};
