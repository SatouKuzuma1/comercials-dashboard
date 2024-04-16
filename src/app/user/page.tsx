import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
const User = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
  }

  return <div>Hello</div>;
};

export default User;
