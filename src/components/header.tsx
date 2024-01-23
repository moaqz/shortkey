import { Session } from "lucia";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="py-6">
      <div className="flex items-center justify-end space-x-3">
        {session ? (
          <>
            <img
              src={session.user.avatarUrl}
              alt="User profile"
              width="36"
              height="36"
            />
            <span className="text-zinc-300">{session.user.username}</span>
            <span className="text-zinc-300">|</span>
            <form method="post" action="/api/auth/logout">
              <input
                type="submit"
                value="Sign out"
                className="cursor-pointer rounded-md bg-indigo-500 px-3 py-1.5 hover:bg-indigo-600 hover:transition-colors"
              />
            </form>
          </>
        ) : (
          <a
            href="/api/auth/github"
            className="text-zinc-300 hover:text-white hover:transition-colors"
          >
            Sign in
          </a>
        )}
      </div>
    </header>
  );
}
