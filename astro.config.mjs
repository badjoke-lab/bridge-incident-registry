import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_ORIGIN ?? "https://bridge-incident-registry.pages.dev";

export default defineConfig({
  output: "static",
  site
});
