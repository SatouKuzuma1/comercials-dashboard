"use server";
import { type Client } from "@prisma/client";
import { SendMail, compileWelcomeTemplate } from "~/lib/email-helper";

export type Clients = { clients: Client[] };

export const sendAll = async ({ clients }: Clients) => {
  try {
    // Espera que todos los envíos de correo electrónico se completen antes de continuar
    await Promise.all(
      clients.map(async (client) => {
        // Envía el correo electrónico
        await SendMail({
          to: client.email,
          name: client.name,
          subject: "Test Mail",
          body: compileWelcomeTemplate(
            `${client.name}`,
            "https://twitter.com/i/flow/login?redirect_after_login=%2Fruben_7778",
          ),
        });
      }),
    );
    console.log("Todos los correos electrónicos enviados correctamente");
  } catch (error) {
    console.error("Error al enviar correos electrónicos:", error);
  }
};
export const sendSelection = async ({ clients }: Clients) => {
  "use server";
  try {
    // Espera que todos los envíos de correo electrónico se completen antes de continuar
    await Promise.all(
      clients.map(async (client) => {
        // Envía el correo electrónico
        await SendMail({
          to: client.email,
          name: client.name,
          subject: "Test Mail",
          body: compileWelcomeTemplate(
            `${client.name}`,
            "https://twitter.com/i/flow/login?redirect_after_login=%2Fruben_7778",
          ),
        });
      }),
    );
    console.log("Todos los correos electrónicos enviados correctamente");
  } catch (error) {
    console.error("Error al enviar correos electrónicos:", error);
  }
};

export async function SendSelection({ clients }: Clients) {
  "use server";
  try {
    // Espera que todos los envíos de correo electrónico se completen antes de continuar

    // Envía el correo electrónico
    await Promise.all(
      clients.map(async (client) => {
        // Envía el correo electrónico
        await SendMail({
          to: client.email,
          name: client.name,
          subject: "Test Mail",
          body: compileWelcomeTemplate(
            `${client.name}`,
            "https://twitter.com/i/flow/login?redirect_after_login=%2Fruben_7778",
          ),
        });
      }),
    );

    console.log("Todos los correos electrónicos enviados correctamente");
  } catch (error) {
    console.error("Error al enviar correos electrónicos:", error, clients);
  }
}
