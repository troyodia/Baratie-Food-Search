import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import MenuForm from "./MenuForm";

//get current restant as props
const ManageResturantSchema = z.object({
  menu: z.array(
    z.object({
      name: z
        .string()
        .nonempty("must provide a meal name")
        .max(10, "10 character limit"),
      price: z.string().nonempty("must provide a price"),
    })
  ),
});
export type ManageResturantForm = z.infer<typeof ManageResturantSchema>;

export default function ManageResturant() {
  const form = useForm<ManageResturantForm>({
    resolver: zodResolver(ManageResturantSchema),
    defaultValues: { menu: [{ name: "", price: "" }] },
  });
  const onSubmit: SubmitHandler<ManageResturantForm> = (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <MenuForm form={form} />

        {/*use sub,it button you created */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
