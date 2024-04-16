"use client";

import { type FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "./send-email";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";

export type FormData = {
  name: string;
  email: string;
  message: string;
  phone: string;
};

const Contact: FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    sendEmail(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" mb-5">
        <label htmlFor="name" className="mb-3 block text-base font-medium ">
          Full Name
        </label>
        <Input
          className="bg-white"
          type="text"
          placeholder="Full Name"
          {...register("name", { required: true })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium "
            >
              Email Address
            </label>
            <Input
              className="bg-white"
              type="email"
              placeholder="example@domain.com"
              {...register("email", { required: true })}
            />
          </div>
        </div>
        <div className="grid gap-2">
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 block text-base font-medium "
            >
              Phone
            </label>
            <Input
              className="bg-white"
              type="phone"
              placeholder="+34 654876987"
              {...register("phone", { required: true })}
            />
          </div>
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="message" className="mb-3 block text-base font-medium ">
          Message
        </label>
        <Textarea
          className="bg-white"
          rows={4}
          placeholder="Type your message"
          {...register("message", { required: true })}
        />
      </div>
      <div>
        <Button type="submit" variant="secondary">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default Contact;
