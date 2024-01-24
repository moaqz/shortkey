import Link from "next/link";
import { Footer } from "~/components/common";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-4 px-4">
      <div className="flex-1 flex flex-col text-center justify-center">
        <h1 className="text-7xl sm:text-8xl font-bold">NOT FOUND</h1>

        <span className="mt-2 font-semibold text-zinc-400">
          Sorry, the page you are looking for could not be found.{" "}
          <Link href="/" className="text-indigo-500 underline">
            Return home
          </Link>
        </span>
      </div>
      <Footer />
    </div>
  );
}
