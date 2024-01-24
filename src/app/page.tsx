import * as context from "next/headers";
import { auth } from "~/lib/auth";

import { Toaster } from "sonner";
import CreateLink from "~/components/create-link";
import Footer from "~/components/footer";
import Header from "~/components/header";

export default async function Home() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();

  return (
    <>
      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-4 px-4">
        <Header session={session} />
        <main className="flex flex-1 flex-col items-center justify-center gap-y-6">
          <div>
            <h1 className="text-center font-serif text-6xl font-semibold sm:text-7xl">
              shortkey
            </h1>
            <p className="text-pretty text-center text-lg text-zinc-400">
              minimalistic and open-source URL shortener
            </p>
          </div>
          <CreateLink disabled={session == null} />
        </main>
        <Footer />
      </div>
      <Toaster richColors position="bottom-center" />
    </>
  );
}
