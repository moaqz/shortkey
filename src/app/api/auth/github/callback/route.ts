import { OAuthRequestError } from "@lucia-auth/oauth";
import { cookies, headers } from "next/headers";
import { auth, githubProvider } from "~/lib/auth";

export async function GET(request: Request) {
  const storedState = cookies().get("github_oauth_state")?.value;
  const url = new URL(request.url);
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const { getExistingUser, githubUser, createUser } =
      await githubProvider.validateCallback(code);

    const getUser = async () => {
      const existingUser = await getExistingUser();
      if (existingUser) {
        return existingUser;
      }

      const user = await createUser({
        attributes: {
          username: githubUser.login,
          avatar: githubUser.avatar_url,
        },
      });

      return user;
    };

    const user = await getUser();
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    const authRequest = auth.handleRequest(request.method, {
      cookies,
      headers,
    });

    authRequest.setSession(session);

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      });
    }

    return new Response(null, {
      status: 500,
    });
  }
}
