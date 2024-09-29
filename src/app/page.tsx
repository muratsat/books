import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#ecdeff] to-[#abafff]">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-[5rem]">
            Books
          </h1>

          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl">
                {session && (
                  <span>
                    Logged in as{" "}
                    <Link
                      href={`/profile/${session.user?.id}`}
                      className="underline"
                    >
                      {session.user?.name}
                    </Link>
                  </span>
                )}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-blue-800/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          </div>

          {session?.user && (
            <Link
              href="/upload"
              className="rounded-full bg-blue-800/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Upload files
            </Link>
          )}
        </div>
        <footer className="absolute bottom-0 left-0 flex w-full flex-col items-center gap-4 p-5">
          <p className="text-center">
            Made by{" "}
            <Link
              href="/profile/ff2910ab-dfb6-46cf-99f1-d76a71521067"
              className="underline"
            >
              Murat
            </Link>
          </p>
        </footer>
      </main>
    </HydrateClient>
  );
}
