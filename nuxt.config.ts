import process from "node:process";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@unocss/nuxt", "@nuxtjs/seo"],

  runtimeConfig: {
    database: {
      url: process.env.NUXT_DATABASE_URL,
      token: process.env.NUXT_DATABASE_TOKEN,
      debug: process.env.NUXT_DATABASE_DEBUG,
    },

    oauth: {
      google: {
        clientId: process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.NUXT_OAUTH_GOOGLE_REDIRECT_URI,
      },
    },

    session: {
      secureCookie: process.env.NUXT_SESSION_SECURE_COOKIE,
    },
  },

  unocss: {
    uno: {
      dark: "media",
    },
    preflight: true,
    theme: {
      colors: {
        peach: "#fab387",
      },
    },
  },

  site: {
    url: "https://shortkey.vercel.app",
    name: "Shortkey",
    description: "Self-hostable, minimalistic, and open-source URL shortener.",
    defaultLocale: "en",
  },

  compatibilityDate: "2024-07-07",
});
