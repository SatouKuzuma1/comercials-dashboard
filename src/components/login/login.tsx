import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

export default async function Login() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <Link
      href={session ? "/api/auth/signout" : "/api/auth/signin"}
      className={cn(
        "hover:text-foreground/80 transition-colors",

        "text-foreground/60",
      )}
    >
      {session ? "Sign out" : "Sign in"}
    </Link>
  );
}
