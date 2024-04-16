/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { columns } from "~/components/clients-table/components/columns";
import { DataTable } from "~/components/clients-table/components/data-table";
import { Button } from "~/components/ui/button";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { SendSelection } from "../../../actions/send-emails";
import { SendMail, compileWelcomeTemplate } from "~/lib/email-helper";
import { env } from "~/env";

export default async function Page() {
  const clients = await api.client.findMany();
  const session = await getServerAuthSession();

  const sendSelection = async () => {
    "use server";
    await SendMail({
      to: env.EMAIL,
      name: "Max",
      subject: "Test Mail",
      body: compileWelcomeTemplate(
        "James",
        "https://twitter.com/i/flow/login?redirect_after_login=%2Fruben_7778",
      ),
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      {/* <DataTable columns={columns} data={clients} /> */}
      <form>
        <div className="  grid grid-cols-2 gap-4">
          {/* <div className="grid gap-2">
            <Button formAction={sendAll} className="">
              Enviar a todos
            </Button>
          </div> */}
          <div className="grid gap-2">
            <Button formAction={sendSelection}>Enviar selecion</Button>
          </div>
        </div>
      </form>
    </main>
  );
}
