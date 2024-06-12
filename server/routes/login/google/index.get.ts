import { generateCodeVerifier, generateState } from "arctic";
import { COOKIES } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = await googleProvider.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"],
  });

  const secureCookie = useRuntimeConfig().session.secureCookie.toString() === "true";

  setCookie(event, COOKIES.STATE, state, {
    path: "/",
    secure: secureCookie,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  setCookie(event, COOKIES.CODE_VERIFIER, codeVerifier, {
    path: "/",
    secure: secureCookie,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return sendRedirect(event, url.toString());
});
