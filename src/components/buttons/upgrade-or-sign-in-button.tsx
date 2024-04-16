import { getServerAuthSession } from "~/server/auth";
import UpgradeButton from "./upgrade-button";

import Link from "next/link";

interface UpgradeOrSignInButtonProps {
  priceId: string;
}

const UpgradeOrSignInButton = async ({
  priceId,
}: UpgradeOrSignInButtonProps) => {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <Link
        className="mt-8   inline-flex items-center justify-center whitespace-nowrap rounded-md bg-zinc-900 px-6 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
        href="/api/auth/signin"
      >
        Subscribe
      </Link>
    );
  }

  return <UpgradeButton priceId={priceId} />;
};

export default UpgradeOrSignInButton;
