/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { env } from "~/env";

export async function POST(request: NextRequest) {
  const { email, name, message, phone } = await request.json();

  const transport = nodemailer.createTransport({
    service: "gmail",
    /*
      setting service as 'gmail' is same as providing these setings:
      host: "smtp.gmail.com",
      port: 465,
      secure: true
      If you want to use a different email provider other than gmail, you need to provide these manually.
      Or you can go use these well known services and their settings at
      https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json
  */
    auth: {
      user: env.EMAIL,
      pass: env.EMAIL_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: name,
    replyTo: email,
    to: env.EMAIL,
    // cc: email, (uncomment this line if you want to send a copy to the sender)
    subject: `Message from ${name} (${email})`,
    text: message,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Enviado");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Enviado" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
