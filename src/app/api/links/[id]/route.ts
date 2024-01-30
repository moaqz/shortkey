import * as context from "next/headers";
import { NextResponse } from "next/server";
import {
  ValiError,
  flatten,
  minValue,
  number,
  object,
  parse,
  safeParse,
} from "valibot";
import { auth } from "~/lib/auth";
import { deleteLink, updateLink } from "~/lib/database/links";
import { linkSchema } from "~/lib/schemas/link";

const paramsSchema = object({
  id: number([minValue(0)]),
});

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

  const { success, output } = safeParse(paramsSchema, {
    id: parseInt(params.id),
  });

  if (!success) {
    return NextResponse.json(
      { message: "Validation Failed." },
      { status: 422 },
    );
  }

  // biome-ignore lint/suspicious/noImplicitAnyLet:
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return new Response("Body should be a JSON object.", { status: 400 });
  }

  try {
    const { url } = parse(linkSchema, body);

    await updateLink({
      userId: session.user.userId,
      url,
      id: output.id,
    });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error instanceof ValiError) {
      return NextResponse.json(
        { message: "Validation Failed.", errors: flatten(error).root },
        { status: 422 },
      );
    }

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

  const { success, output } = safeParse(paramsSchema, {
    id: parseInt(params.id),
  });

  if (!success) {
    return NextResponse.json(
      { message: "Validation Failed." },
      { status: 422 },
    );
  }

  try {
    await deleteLink({
      id: output.id,
      userId: session.user.userId,
    });

    return NextResponse.json(
      { message: "Successfully deleted link." },
      { status: 200 },
    );
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
