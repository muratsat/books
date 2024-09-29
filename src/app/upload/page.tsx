import { getServerAuthSession } from "@/server/auth";
import { UploadComponent } from "./UploadButton";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-[100dvh] flex-col items-center bg-gradient-to-b from-[#ecdeff] to-[#abafff]">
      <div className="flex w-full max-w-xl flex-col p-5">
        {session?.user && <UploadComponent />}
        <UploadComponent />
      </div>
    </main>
  );
}
