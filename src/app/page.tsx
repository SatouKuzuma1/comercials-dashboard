import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "~/components/login/login-form";

import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect(`/user/${session.user.id}`);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoginForm />
    </main>
  );
}
