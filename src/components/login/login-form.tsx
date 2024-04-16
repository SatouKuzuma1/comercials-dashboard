"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";
import { type ILogin } from "~/validation/auth";
import { Separator } from "../ui/separator";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [toggleSingUp, setToggleSingUp] = useState(false);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const login = signIn("google", {
    callbackUrl: `http://localhost:3000/user`,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILogin>();

  const mutation = api.auth.register.useMutation({
    onError: (e) => setErrorMessage(e.message),
    onSuccess: () => router.push("/api/auth/signin"),
  });

  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    setErrorMessage(undefined);
    await mutation.mutateAsync({ password: data.password, email: data.email });
    reset();
  };
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">LogIn</CardTitle>
        {/* <CardDescription>
          Enter your email below to login to your account
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <div className="grid min-w-[350px] gap-4">
          <div className="gap-y-4">
            {toggleSingUp && (
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className="">
                  {errorMessage && (
                    <p className="text-center text-red-600">{errorMessage}</p>
                  )}
                  <div className="grid gap-4">
                    <Label htmlFor="email" className="">
                      Correo
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      {...register("email", { required: true })}
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="mt-4">
                        Contraseña
                      </Label>
                      {/* <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      {...register("password", { required: true })}
                      className="mt-2"
                    />
                  </div>
                  <div className="grid gap-2 ">
                    <Button type="submit" className="mt-4 w-full">
                      Registrate
                    </Button>
                    <Separator className="mt-2" />
                  </div>
                </form>
                <Button
                  variant="link"
                  className="underline"
                  onClick={() => setToggleSingUp(false)}
                >
                  Inicia Session
                </Button>
              </div>
            )}
          </div>

          {!toggleSingUp && (
            <div className="mt-2 gap-y-6 text-center text-sm">
              <Button
                className=" w-full"
                onClick={() => router.push("/api/auth/signin")}
              >
                Inicia Session
              </Button>
              <Separator className="mt-4" />
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => router.push("/api/auth/signin")}
              >
                Inicia session con Google
              </Button>
              No tienes una cuenta todavía?{" "}
              <Button
                variant="link"
                className="underline"
                onClick={() => setToggleSingUp(true)}
              >
                Registrate
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
