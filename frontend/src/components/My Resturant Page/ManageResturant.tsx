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
import CuisinesForm from "./CuisinesForm";
import { Separator } from "../ui/separator";
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
  items: z.array(z.string()).refine((value) => {
    value.some((item) => item);
  }),
});
export type ManageResturantForm = z.infer<typeof ManageResturantSchema>;

export default function ManageResturant() {
  const form = useForm<ManageResturantForm>({
    resolver: zodResolver(ManageResturantSchema),
    defaultValues: {
      menu: [{ name: "", price: "" }],
      items: ["american", "steak"],
    },
  });
  const onSubmit: SubmitHandler<ManageResturantForm> = (data) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CuisinesForm form={form} />
        <Separator orientation="vertical" className="bg-white w-full h-px" />
        <MenuForm form={form} />

        {/*use sub,it button you created */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
