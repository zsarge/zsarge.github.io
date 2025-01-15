import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypePrettyCode from "rehype-pretty-code";
import remarkReadingTime from "./src/plugins/remark-reading-time.mjs";
import react from "@astrojs/react";
import Icons from "unplugin-icons/vite";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { BASE_URL } from "./src/consts";


// https://astro.build/config
export default defineConfig({
  site: BASE_URL,
  integrations: [mdx(), sitemap(), tailwind(), react()],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [rehypePrettyCode, rehypeKatex],
    remarkPlugins: [remarkReadingTime, remarkMath],
  },
  vite: {
    plugins: [
      Icons({
        compiler: "jsx",
        jsx: "react",
        autoInstall: true,
      }),
    ],
  },
});
