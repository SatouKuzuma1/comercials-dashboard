"use client";

import React from "react";

import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { api } from "~/trpc/react";

import { Button } from "../ui/button";
import { type CreateClientSchemaType } from "~/validation/client";
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

const CreateClientForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const utils = api.useUtils();

  const mutation = api.client.create.useMutation({
    onError: (e) => setErrorMessage(e.message),
    onSuccess: async () => reset({ name: "", email: "" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientSchemaType>();

  const onSubmit: SubmitHandler<CreateClientSchemaType> = async (data) => {
    setErrorMessage(undefined);
    await mutation.mutateAsync(data);
  };

  return (
    <Card className="mx-auto mb-8 w-full sm:w-[400px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && (
          <p className="text-center text-red-600">{errorMessage}</p>
        )}
        <CardHeader>Añade tus Clientes aquí.</CardHeader>
        <div className="mx-8 grid items-center gap-4 ">
          <div className="flex flex-col space-y-1.5">
            <Label>Nombre</Label>
            <Input
              type="text"
              {...register("name", { required: true })}
              className="mx-auto"
            />
          </div>
          {errors.name && (
            <p className="text-center text-red-600">This field is required</p>
          )}
          <div className="flex flex-col space-y-1.5">
            <Label>Correo</Label>
            <Input type="text" {...register("email", { required: true })} />
            {errors.email && (
              <p className="text-center text-red-600">This field is required</p>
            )}
          </div>
        </div>
        <CardFooter className="ml-2 mt-6 flex justify-between">
          <Button type="submit">Enviar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateClientForm;
