import nodemailer from "nodemailer";
import * as handlebars from "handlebars";
import { welcomeTemplate } from "~/components/email-templates/welcome-template";
import { env } from "~/env";

export async function SendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string | string[];
  name: string | string[];
  subject: string;
  body: string;
}) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    //   host: "smtpro.zoho.in",
    //   port: 465,
    //   secure: true,
    auth: {
      user: env.EMAIL,
      pass: env.EMAIL_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: env.EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}

export function compileWelcomeTemplate(name: string | string[], url: string) {
  const template = handlebars.compile(welcomeTemplate);
  const htmlBody = template({
    name: name,
    url: url,
  });
  return htmlBody;
}
