import { getServerAuthSession } from "@/server/auth";
import { UploadComponent } from "./UploadButton";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-[100dvh] flex-col items-center bg-gradient-to-b from-[#ecdeff] to-[#abafff]">
      <header className="w-full flex-col gap-4 p-5">
        {/* home svg */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
        </Link>
      </header>
      <div className="flex w-full max-w-xl flex-col p-5">
        {!session?.user && (
          <div className="flex max-w-lg flex-col items-center gap-4">
            <h1 className="text-xl font-medium">
              Please sign in to upload files
            </h1>
            <Link
              href="/api/auth/signin"
              className="max-w-md rounded-full bg-blue-800/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              Sign in
            </Link>
          </div>
        )}
        {session?.user && <UploadComponent />}
      </div>
    </main>
  );
}
