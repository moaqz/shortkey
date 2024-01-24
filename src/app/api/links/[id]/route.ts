import * as context from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";
import { deleteLink, updateLink } from "~/lib/database/links";
import { parseURL } from "~/lib/functions/urls";

export async function POST(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();
  if (!session) {
    return NextResponse.json(
      { error: "You must be authenticated to update a link." },
      { status: 401 },
    );
  }

  const id = parseInt(params.id);
  // biome-ignore lint/suspicious/noImplicitAnyLet:
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
    await updateLink({ userId: session.user.userId, url: parsedUrl, id });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const authRequest = auth.handleRequest(request.method, context);
  const session = await authRequest.validate();

  if (!session) {
    return NextResponse.json(
      { error: "You must be authenticated to delete a link." },
      { status: 401 },
    );
  }

  const linkId = parseInt(params.id);
  if (!linkId || Number.isNaN(linkId)) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  try {
    await deleteLink({ id: linkId, userId: session.user.userId });
    return NextResponse.json(
      { message: "Successfully deleted link." },
      { status: 200 },
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
