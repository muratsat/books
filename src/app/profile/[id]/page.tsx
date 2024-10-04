import { api } from "@/trpc/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { type Metadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { id: string };
  },
  // parent: ResolvingMetadata,
): Promise<Metadata> {
  const user = await api.users.getUserProfile({ id: params.id });

  if (!user) return { title: "404" };

  const title = user.name ?? "Books user";
  const description = `${user.name ?? "User"} profile page`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: user.image ? [{ url: user.image }] : undefined,
    },
  };
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await api.users.getUserProfile({ id: params.id });

  if (!user) return notFound();

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#ecdeff] to-[#abafff]">
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
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-2">
          <Image
            src={user.image ?? "/avatar-placeholder.svg"}
            alt={user.name ?? "user"}
            width={100}
            height={100}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">{user.name}</h1>
        </div>

        <div className="flex w-full max-w-2xl flex-col items-center gap-2 p-2">
          {user.files.map((file) => (
            <Link
              href={file.url ?? "#"}
              key={file.url}
              className="m-1 w-full rounded-lg border-2 border-gray-400 bg-gradient-to-r from-[#f1eff2] to-[#ececef] p-3"
            >
              {file.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
