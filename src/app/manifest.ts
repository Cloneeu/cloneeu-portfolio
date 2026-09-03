import type { MetadataRoute } from "next";
import { SITE_BASE_PATH, SITE_DESCRIPTION, SITE_NAME, withBasePath } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Cloneeu",
    description: SITE_DESCRIPTION,
    start_url: `${SITE_BASE_PATH}/`,
    scope: `${SITE_BASE_PATH}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    orientation: "any",
    categories: ["portfolio", "technology", "developer"],
    icons: [
      {
        src: withBasePath("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: withBasePath("/icon.svg"),
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
