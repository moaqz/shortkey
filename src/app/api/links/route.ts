import * as context from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { createLink, getRandomSlug } from "~/lib/database/links";
import { parseURL } from "~/lib/functions/urls";

export async function POST(request: Request) {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return NextResponse.json(
      { error: "You must be authenticated to create a link." },
      { status: 401 },
    );
  }

  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return new Response("Missing or invalid body.", { status: 400 });
  }

  if (!body.url) {
    return NextResponse.json(
      { error: "Missing destination url." },
      { status: 400 },
    );
  }

  const parsedUrl = parseURL(body.url);
  if (!parsedUrl && typeof parseURL !== "string") {
    return NextResponse.json(
      { error: "Invalid destination url." },
      { status: 422 },
    );
  }

  try {
    await createLink({
      slug: await getRandomSlug(),
      // Idk why this is typed as string | null
      url: parsedUrl || "",
      userId: session.user.userId,
    });

    return NextResponse.json(
      { message: "Link created sucessfully." },
      { status: 201 },
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
