import { getServerAuthSession } from "@/server/auth";
import { UploadComponent } from "./UploadButton";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-[100dvh] flex-col items-center bg-gradient-to-b from-[#ecdeff] to-[#abafff]">
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
