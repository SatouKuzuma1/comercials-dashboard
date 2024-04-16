"use client";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";

interface UpgradeButtonProps {
  priceId: string;
}

const UpgradeButton = ({ priceId }: UpgradeButtonProps) => {
  const { mutateAsync: createCheckoutSession } =
    api.stripe.createCheckoutSession.useMutation();
  const router = useRouter();

  return (
    <Button
      className="mt-8 block w-full items-center px-6 py-2"
      onClick={async () => {
        const { checkoutUrl } = await createCheckoutSession();
        if (checkoutUrl) {
          void router.push(checkoutUrl);
        }
      }}
    >
      Subscribe
    </Button>
  );
};

export default UpgradeButton;
