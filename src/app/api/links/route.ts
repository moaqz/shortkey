import * as context from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { createLink, getRandomSlug, getUserLinks } from "~/lib/database/links";
import { parseURL } from "~/lib/functions/urls";

export async function GET(request: Request) {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();
  if (!session) {
    return new Response(null, { status: 401 })
  }

  try {
    const data = await getUserLinks(session.user.userId);
    return NextResponse.json({ links: data })
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

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
  if (!parsedUrl && typeof parsedUrl !== "string") {
    return NextResponse.json(
      { error: "Invalid destination url." },
      { status: 422 },
    );
  }

  try {
    await createLink({
      slug: await getRandomSlug(),
      url: parsedUrl,
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
