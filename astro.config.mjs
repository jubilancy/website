import { defineConfig } from "astro/config";
import astroExpressiveCode from 'astro-expressive-code';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://jubilancy.github.io',
  base: '/website',
  integrations: [
    // 1. Expressive Code MUST come before MDX to work properly
    astroExpressiveCode({
      themes: ['dracula'],
      styleOverrides: {
        borderRadius: '8px',
        codeFontSize: '0.9rem',
      },
    }),
    mdx(), 
    sitemap(), 
    tailwind(), 
    icon()
  ],
  markdown: {
    shikiConfig: {
      // Note: Expressive Code takes over highlighting, 
      // but keeping this for standard markdown files is fine.
      theme: 'dracula',
      wrap: true,
    }
  }
});
