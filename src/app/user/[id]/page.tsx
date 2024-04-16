import React from "react";
import { CreatePostClient } from "~/components/postClient/create-post";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import CreateClientForm from "~/components/form/add-clietn-form";
const Page = async ({ params }: { params: string }) => {
  const session = await getServerAuthSession();

  if (!session || session.user.id !== params.id) {
    redirect("/");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <CreatePostClient />
    </main>
  );
};

export default Page;
