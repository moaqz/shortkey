import * as context from "next/headers";
import { NextResponse } from "next/server";
import { ValiError, flatten, parse } from "valibot";
import { auth } from "~/lib/auth";
import { createLink, getRandomSlug, getUserLinks } from "~/lib/database/links";
import { linkSchema } from "~/lib/schemas/link";

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
    return new Response("Body should be a JSON object.", { status: 400 });
  }

  try {
    const { url } = parse(linkSchema, body);
    await createLink({
      slug: await getRandomSlug(),
      url,
      userId: session.user.userId,
    });

    return NextResponse.json(
      { message: "Link created sucessfully." },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof ValiError) {
      return NextResponse.json(
        { message: "Validation Failed.", errors: flatten(error).nested },
        { status: 422 },
      );
    }

    return new Response(null, { status: 500 });
  }
}
