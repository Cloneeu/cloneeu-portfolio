export const SITE_NAME = "Cloneeu Terminal Portfolio";
export const SITE_TITLE = "Cloneeu — Software Engineer";
export const SITE_DESCRIPTION =
  "Interactive CRT terminal portfolio of Alexandro (Cloneeu), a software engineer building web experiences, tools, and creative experiments.";

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredUrl) {
    return new URL("http://localhost:3000");
  }

  return new URL(configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`);
}
