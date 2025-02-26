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
import SubmitButton from "@/components/ui/submitButton";
import { useEffect } from "react";
import { useCreatMyResturant, useUpdateMyResturant } from "@/hooks/myResturant";
import { LoaderCircle } from "lucide-react";
import { CreatedResturant } from "@/types/resturantTypes";
import { notify } from "@/utils/notify";

//get current restant as props
const ManageResturantSchema = z
  .object({
    menu: z.array(
      z.object({
        name: z
          .string()
          .nonempty("You must provide a meal name")
          .max(25, "25 character limit"),
        price: z.string().nonempty("You must provide a price"),
      })
    ),
    //cuisines

    cuisineItems: z.array(z.string()).refine(
      (value) => {
        return value.some((item) => item);
      },
      { message: "Please select at least one item" }
    ),
    details: z.object({
      name: z
        .string()
        .nonempty("You must provide resturant name")
        .max(35, "35 character limit"),
      city: z.string().nonempty("You must provide resturant city"),
      country: z.string().nonempty("You must provide resturant country"),
      deliveryPrice: z.string().nonempty("You must provide a delivery price"),
      deliveryTime: z.string().nonempty("You must provide a delivery time"),
    }),
    image: z
      .instanceof(File, { message: "Please provide a valid image file" })
      .refine(
        (value) =>
          !value || value.type === "" || imageTypes.includes(value.type),
        {
          message: "Only .jpg, .jpeg, .webp and .png formats are supported",
        }
      )
      .refine((value) => value.size <= MAX_FILE_SIZE, {
        message: "Images cannot be larger than 5MB",
      })
      .optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.imageUrl ?? data.image, {
    message: "Either Image File must be provided",
    path: ["image"],
  });

export type ManageResturantForm = z.infer<typeof ManageResturantSchema>;
type Props = {
  myCurrentResturant?: CreatedResturant;
};
type DefaultValueProps = {
  menu: { name: string; price: string }[];
  cuisineItems: string[];
  details: {
    name: string;
    city: string;
    country: string;
    deliveryPrice: string;
    deliveryTime: string;
  };
  imageUrl: string;
};
export default function ManageResturant({ myCurrentResturant }: Props) {
  const {
    mutate: createMyResturant,
    isPending: isCreatingResturant,
    error: createResturantError,
  } = useCreatMyResturant(notify);
  const {
    mutate: updateMyResturant,
    isPending: isUpdatingResturant,
    error: updateResturantError,
  } = useUpdateMyResturant(notify);

  const form = useForm<ManageResturantForm>({
    resolver: zodResolver(ManageResturantSchema),
    defaultValues: {
      menu: [{ name: "", price: "" }],
      cuisineItems: ["american"],
    },
    mode: "onChange",
  });
  const {
    formState: { isDirty, isValid, isSubmitSuccessful },
    reset,
  } = form;
  const onSubmit: SubmitHandler<ManageResturantForm> = (data) => {
    console.log(data);
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("cuisineItems", JSON.stringify(data.cuisineItems));
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
    if (myCurrentResturant !== undefined) {
      updateMyResturant(formData);
      console.log("update");
    } else {
      console.log("created");
      createMyResturant(formData);
    }
  };
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [reset, isSubmitSuccessful]);
  useEffect(() => {
    if (myCurrentResturant) {
      const resetValues: DefaultValueProps = {
        menu: myCurrentResturant.menu,
        cuisineItems: myCurrentResturant.cuisineItems,
        details: {
          name: myCurrentResturant.name,
          city: myCurrentResturant.city,
          country: myCurrentResturant.country,
          deliveryPrice: myCurrentResturant.deliveryPrice.toString(),
          deliveryTime: myCurrentResturant.deliveryTime.toString(),
        },
        imageUrl: myCurrentResturant.image,
      };
      reset(resetValues);
    }
  }, [reset, myCurrentResturant]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-10 bg-white text-black px-10 py-4 rounded-lg"
      >
        <DetailsForm />
        <Separator orientation="vertical" className="bg-black w-full h-px" />
        <CuisinesForm />
        <Separator orientation="vertical" className="bg-black w-full h-px" />
        <MenuForm />
        <Separator orientation="vertical" className="bg-black w-full h-px" />
        <ImageUploadForm
          isPending={isCreatingResturant || isUpdatingResturant}
        />

        <SubmitButton
          disabled={
            !isDirty || !isValid || isCreatingResturant || isUpdatingResturant
          }
        >
          {isCreatingResturant || isUpdatingResturant ? (
            <span className="flex gap-1">
              <LoaderCircle className="animate-spin h-4 w-4" />
              Submitting
            </span>
          ) : (
            "Submit"
          )}
        </SubmitButton>
        {createResturantError && (
          <div className="text-red-500">{createResturantError.message}</div>
        )}
        {updateResturantError && (
          <div className="text-red-500">{updateResturantError.message}</div>
        )}
      </form>
    </Form>
  );
}
