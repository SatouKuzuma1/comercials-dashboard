import { type NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { SendMail, compileWelcomeTemplate } from "~/lib/email-helper";
import { env } from "~/env";
export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const cron = req.nextUrl.pathname.split("/")[3];
  console.log(cron);
  if (!cron) return new Response("No cron provided", { status: 400 });
  const response = await update(cron);
  return new NextResponse(JSON.stringify(response), {
    status: 200,
  });
}

async function Send(interval: string) {
  const sendSelection = await SendMail({
    to: env.EMAIL,
    name: "Max",
    subject: "Test Mail",
    body: compileWelcomeTemplate(
      "James",
      "https://twitter.com/i/flow/login?redirect_after_login=%2Fruben_7778",
    ),
  });
  const response = await kv.set(interval, {
    fetchedAt: Date.now(),
    id: sendSelection[0],
  });

  return response;
}
