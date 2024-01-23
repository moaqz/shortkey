import { github } from "@lucia-auth/oauth/providers";
import { auth } from "./lucia";

export const githubProvider = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID || "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
});
