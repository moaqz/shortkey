import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { TABLES, db } from "~/server/database";
import { COOKIES, GOOGLE_API } from "~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const code = query.code?.toString() ?? null;
  const state = query.state?.toString() ?? null;

  if (!code || !state) {
    throw createError({
      message: "Invalid request",
      status: 400,
    });
  }

  const codeVerifier = getCookie(event, COOKIES.CODE_VERIFIER);
  const savedState = getCookie(event, COOKIES.STATE);

  if (!codeVerifier || !savedState) {
    throw createError({
      message: "Code verifier or saved state does not exists",
      status: 400,
    });
  }

  if (savedState !== state) {
    throw createError({
      message: "State does not match",
      status: 400,
    });
  }

  try {
    const { accessToken } = await googleProvider.validateAuthorizationCode(
      code,
      codeVerifier,
    );

    const user: GoogleUser = await $fetch(GOOGLE_API.USERS_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const [existingUser] = await db.select()
      .from(TABLES.users)
      .where(
        eq(TABLES.users.googleId, user.sub),
      );

    if (existingUser) {
      console.warn("User already exists, updating user...");
      await db
        .update(TABLES.users)
        .set({
          email: user.email,
          fullName: user.name,
          name: user.given_name,
          profilePicture: user.picture,
        });

      const session = await lucia.createSession(existingUser.id, {});
      appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
      return sendRedirect(event, "/");
    }

    const userId = generateIdFromEntropySize(10);
    await db.insert(TABLES.users).values({
      id: userId,
      googleId: user.sub,
      email: user.email,
      fullName: user.name,
      name: user.given_name,
      profilePicture: user.picture,
    });

    const session = await lucia.createSession(userId, {});
    appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());
    return sendRedirect(event, "/");
  }
  catch (e) {
    throw createError({
      status: 500,
    });
  }
});

interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}
