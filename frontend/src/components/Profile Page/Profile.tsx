import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useGetAuthUser, useUpdateProfie } from "@/hooks/auth";

const ProfileSchema = z.object({
  email: z.string({ message: "email is required" }).email({
    message: "Invalid email provided",
  }),
  firstname: z
    .string({ message: "first name is required" })
    .min(1, {
      message: "last name must not be longer than 1 characters",
    })
    .max(10, {
      message: "first name must not be longer than 10 characters",
    }),
  lastname: z
    .string({ message: "last name is required" })
    .min(1, {
      message: "last name must not be longer than 1 characters",
    })
    .max(10, {
      message: "first name must not be longer than 10 characters",
    }),
  address: z.string({ message: "address is required" }).min(1, {
    message: "Invalid Address provided",
  }),
  city: z.string({ message: "city is required" }).min(1, {
    message: "Invalid City provided",
  }),
  country: z.string({ message: "country is required" }).min(1, {
    message: "Invalid Country provided",
  }),
});
export type ProfileFormType = z.infer<typeof ProfileSchema>;

export default function Profile() {
  const { data } = useGetAuthUser();
  const getDefaultValues = () => {
    if (data?.address && data.city && data.country) {
      return data;
    }
  };
  const { error, mutate } = useUpdateProfie(() => {
    toast.success("Profile Created Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  });

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: getDefaultValues(),
  });
  const {
    reset,
    formState: { isSubmitSuccessful, isDirty, isValid },
  } = form;
  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [reset, isSubmitSuccessful]);
  const onSubmit: SubmitHandler<ProfileFormType> = (data) => {
    mutate(data);
  };
  return (
    <Form {...form}>
      <ToastContainer />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mx-4 text-black  border px-8 py-8 bg-white rounded-lg"
      >
        <FormField
          control={form.control}
          name="email"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input className="bg-[#c5d8f9]" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" gap-4 space-y-6 md:space-y-0  md:flex">
          <FormField
            control={form.control}
            name="firstname"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">FirstName</FormLabel>
                <FormControl>
                  <Input className="bg-[#c5d8f9]" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">LastName</FormLabel>
                <FormControl>
                  <Input className="bg-[#c5d8f9]" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6 md:space-y-0 md:gap-4 md:flex">
          <FormField
            control={form.control}
            name="address"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Address Line 1</FormLabel>
                <FormControl>
                  <Input className="bg-[#c5d8f9]" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">City</FormLabel>
                <FormControl>
                  <Input className="bg-[#c5d8f9]" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Country</FormLabel>
                <FormControl>
                  <Input className="bg-[#c5d8f9]" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={!isDirty || !isValid}
          className="py-6 px-6 bg-transparent text-white border-2 bg-black hover:bg-transparent
           hover:text-black hover:border-2 hover:border-[#75AAF0] transition-all ease-in "
          type="submit"
        >
          Submit
        </Button>
        {error && <div className="text-red-500">{error.message}</div>}
      </form>
    </Form>
  );
}
