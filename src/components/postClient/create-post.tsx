/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

import { type SubmitHandler, useForm } from "react-hook-form";
import { inputSchema, type InputSchemaType } from "~/validation/post-schema";
import { useState } from "react";
import { type TimePickerDemoProps } from "../timepicker/time-picker";
import { TimePicker } from "../timepicker/time-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "../ui/form";
import { useRouter } from "next/navigation";

const results = [
  { label: "Vendido", value: "SOLD" },
  { label: "No Vendido", value: "NOTSOLD" },
] as const;

export function CreatePostClient() {
  const router = useRouter();
  // const post = api.post.create.useMutation()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  const [startedAt, setStartedAt] = useState<TimePickerDemoProps>();
  const [endedAt, setEndedAt] = useState<TimePickerDemoProps>();
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const form = useForm<InputSchemaType>({
    resolver: zodResolver(inputSchema),
  });
  const createPost = api.post.create.useMutation({
    onError: () => {
      form.reset({
        clientName: "",
        notes: "",
        price: "100€",
        product: "Flores",
      }),
        router.refresh();
      setResult("");
      setEndedAt();
      setStartedAt();
    },
    onSuccess: () => {
      form.reset({
        clientName: "",
        notes: "",
        price: "100€",
        product: "Flores",
      }),
        router.refresh();
      setResult("");
      setEndedAt();
      setStartedAt();
    },
  });

  async function onSubmit(data: InputSchemaType) {
    const clientName: InputSchemaType["clientName"] =
      form.getValues("clientName");
    const price: InputSchemaType["price"] = form.getValues("price");

    const product: InputSchemaType["product"] = form.getValues("product");
    const notes: InputSchemaType["notes"] = form.getValues("notes");
    // const result: InputSchemaType["result"] = form.getValues("result");

    createPost.mutate({
      clientName: clientName,
      price: price ?? null,
      startedAt: startedAt ?? new Date(),
      endedAt: endedAt ?? null,
      product: product,
      notes: notes ?? "",
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      result: result ?? "NOTSOLD",
    });
  }
  const onInvalid = (errors: any) => console.error(errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="my-4 mt-4"
      >
        <Card className="mt-4 sm:w-[400px]">
          {errorMessage && (
            <p className="text-center text-red-600">{errorMessage}</p>
          )}

          <CardContent className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <FormField
                {...form.register("clientName")}
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Cliente</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        name="clientName"
                        placeholder="Marcos delgado..."
                        {...form.register}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                {...form.register("product")}
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Producto</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        name="product"
                        placeholder="Flores"
                        {...form.register}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                {...form.register("price", { required: false })}
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coste del producto(opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        name="price"
                        placeholder="100€"
                        {...form.register("price", { valueAsNumber: true })}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="  grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="endedAt">Hora de Inicio</Label>
                <TimePicker date={startedAt} setDate={setStartedAt} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endedAt">Hora de Finalizacion</Label>
                <TimePicker date={endedAt} setDate={setEndedAt} />
              </div>
            </div>
            {/* <FormField
              {...form.register("result")}
              control={form.control}
              name="result"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Resultado</FormLabel>

                  <Select
                    {...form.register("result", { required: true })}
                    {...field}
                    onValueChange={(value) => setResult(value)}
                  >
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent {...form.register}>
                      <SelectItem id="1" value="SOLD" key="SOLD">
                        Vendido
                      </SelectItem>
                      <SelectItem id="2" value="NOTSOLD" key="NOTSOLD">
                        No vendido
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="grid gap-2">
              <Label htmlFor="result" defaultValue="2">
                Resultado
              </Label>
              <Select onValueChange={(value) => setResult(value)}>
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem id="1" value="SOLD">
                    Vendido
                  </SelectItem>
                  <SelectItem id="2" value="NOTSOLD">
                    No vendido
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <FormField
                {...form.register("notes")}
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coste del producto(opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[10vh]"
                        id="notes"
                        placeholder="Opcionalmente, añade anotaciones que describan los puntos que te gustaría mejorar en futuras visitas con este cliente."
                        {...form.register("notes", { required: false })}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button type="submit">Enviar</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
