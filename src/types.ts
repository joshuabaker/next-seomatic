import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { Twitter } from "next/dist/lib/metadata/types/twitter-types";

export type OpenGraphTypeEnum = Extract<OpenGraph, { type: string }>["type"];
export type TwitterCardEnum = Extract<Twitter, { card: string }>["card"];
export type { ReferrerEnum } from "next/dist/lib/metadata/types/metadata-types";
