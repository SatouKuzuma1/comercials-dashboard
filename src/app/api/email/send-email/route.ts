import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { env } from "~/env";
import { ComercialEmailTemplate } from "~/components/email-templates/comercial-template";

const text = "I like potatoes";
const subject = "Potatoes";
const senderName = "Manuel";

const mailList = [
  { name: "augustinerepos", email: "augustinerepos@gmail.com" },
];
export async function POST(request: NextRequest) {
  try {
    // const { subject, message, senderName } = await request.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      //   host: "smtpro.zoho.in",
      //   port: 465,
      //   secure: true,
      auth: {
        user: env.EMAIL,
        pass: env.EMAIL_PASSWORD,
      },
    });

    // const mailOption = {
    //   from: env.EMAIL,
    //   to: "augustinerepos@gmail.com",
    //   subject: "Send Email Tutorial",
    //   html: `
    //     <h3>Hello Augustine</h3>
    //     <li> title: ${subject}</li>
    //     <li> message: ${message}</li>
    //     `,
    // };

    // await transporter.sendMail(mailOption);

    // Crear una lista de opciones de correo para cada destinatario
    const mailOptions = mailList.map(({ name, email }) => ({
      from: env.EMAIL,
      to: email,
      subject: "Send Email Tutorial",
      html: ComercialEmailTemplate({ name, subject, text, senderName }),
    }));

    // Enviar correos electrónicos para cada opción de correo
    await Promise.all(
      mailOptions.map((option) => transporter.sendMail(option)),
    );

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 },
    );
  }
}
