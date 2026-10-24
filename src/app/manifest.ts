import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Surubata",
    short_name: "Surubata",
    description: "Practical AI and automation for Nepali builders.",
    start_url: "/ne",
    display: "standalone",
    background_color: "#f6f3ec",
    theme_color: "#f6f3ec",
    lang: "ne",
  };
}
