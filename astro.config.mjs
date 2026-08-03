import { defineConfig } from "astro/config";

const site = process.env.PUBLIC_SITE_ORIGIN ?? "https://bir.badjoke-lab.com";

export default defineConfig({
  output: "static",
  site
});
