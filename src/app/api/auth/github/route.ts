import { cookies } from "next/headers";
import { githubProvider } from "~/lib/auth";

export async function GET() {
  const [url, state] = await githubProvider.getAuthorizationUrl();

  cookies().set("github_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
