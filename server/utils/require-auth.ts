import type { H3Event } from "h3";
import type { User } from "lucia";

/**
 * Checks if the user is authenticated.
 *
 * Throws a 401 error if there is no valid session or user.
 * Returns the authenticated user information if successful.
 */
export default function (event: H3Event): User {
  if (!event.context.session || !event.context.user) {
    throw createError({
      status: 401,
      statusMessage: "Unauthorized",
      message: "You must be logged in to perform this action.",
    });
  }

  return event.context.user;
};
