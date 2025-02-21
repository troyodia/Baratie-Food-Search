import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import MenuForm from "./MenuForm";
import CuisinesForm from "./CuisinesForm";
import { Separator } from "../ui/separator";
import DetailsForm from "./DetailsForm";
import { MAX_FILE_SIZE, imageTypes } from "./myResturantFormData";
import ImageUploadForm from "./ImageUploadForm";
import SubmitButton from "../ui/submitButton";
import { useEffect } from "react";
import { useCreatMyResturant } from "@/hooks/myResturant";
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
  //cuisines
  items: z.array(z.string()).refine(
    (value) => {
      return value.some((item) => item);
    },
    { message: "please select at least one item" }
  ),
  details: z.object({
    name: z
      .string()
      .nonempty("must provide resturant name")
      .max(20, "20 character limit"),
    city: z.string().nonempty("must provide resturant city"),
    country: z.string().nonempty("must provide resturant country"),
    deliveryPrice: z.string().nonempty("must provide a delivery price"),
    deliveryTime: z.string().nonempty("muts provide a delivery time"),
  }),
  resturantImage: z
    .instanceof(File, { message: "please provide a valid image file" })
    .refine(
      (value) => !value || value.type === "" || imageTypes.includes(value.type),
      {
        message: "Only .jpg, .jpeg, .webp and .png formats are supported",
      }
    )
    .refine((value) => value.size <= MAX_FILE_SIZE, {
      message: "images cannot be larger than 5MB",
    }),
});

export type ManageResturantForm = z.infer<typeof ManageResturantSchema>;

export default function ManageResturant() {
  const { mutate } = useCreatMyResturant();
  const form = useForm<ManageResturantForm>({
    resolver: zodResolver(ManageResturantSchema),
    defaultValues: {
      menu: [{ name: "", price: "" }],
      items: ["american"],
      resturantImage: undefined,
    },
  });
  const {
    formState: { isDirty, isValid, isSubmitSuccessful },
    reset,
  } = form;
  const onSubmit: SubmitHandler<ManageResturantForm> = (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.resturantImage);
    formData.append("cuisineItems", JSON.stringify(data.items));
    formData.append("menu", JSON.stringify(data.menu));
    Object.keys(data.details).forEach((detail) => {
      formData.append(
        detail,
        data.details[
          detail as keyof {
            name: string;
            city: string;
            country: string;
            deliveryPrice: string;
            deliveryTime: string;
          }
        ]
      );
    });
    console.log([...formData]);
    mutate(formData);
    //add toast to use muatation
  };
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [reset, isSubmitSuccessful]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DetailsForm form={form} />
        <Separator orientation="vertical" className="bg-white w-full h-px" />
        <CuisinesForm form={form} />
        <Separator orientation="vertical" className="bg-white w-full h-px" />
        <MenuForm form={form} />
        <Separator orientation="vertical" className="bg-white w-full h-px" />
        <ImageUploadForm form={form} />

        {/*add ispending state, add is pending to button */}
        <SubmitButton disabled={!isDirty || !isValid}>
          {/* {isPending && (
            <span className="flex gap-1">
              <LoaderCircle className="animate-spin h-4 w-4" />
              Submitting
            </span>
          )}
          {!isPending && "Submit"} */}
          Submit
        </SubmitButton>
      </form>
    </Form>
  );
}
