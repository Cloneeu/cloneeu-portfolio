export const SITE_NAME = "Alexandro — Software Engineer";
export const SITE_TITLE = "Alexandro — Software Engineer";
export const SITE_DESCRIPTION =
  "Portfolio of Alexandro (Cloneeu), a systems engineering student and software engineer building clean, thoughtful applications.";

export const SITE_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (!configuredUrl) {
    return new URL("https://cloneeu.github.io/cloneeu-portfolio/");
  }

  const url = new URL(configuredUrl.startsWith("http") ? configuredUrl : `https://${configuredUrl}`);
  url.pathname = `${url.pathname.replace(/\/$/, "")}/`;
  return url;
}

export function getAbsoluteUrl(path = "") {
  return new URL(path.replace(/^\//, ""), getSiteUrl());
}

export function withBasePath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_BASE_PATH}${normalizedPath}`;
}
