import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TypeOptions, toast } from "react-toastify";
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
import { useUpdateProfie } from "@/hooks/auth";
import { LoaderCircle } from "lucide-react";
import { User } from "@/types/userInfo";
import SubmitButton from "../ui/submitButton";

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
type Props = {
  currentUser: User;
};
export default function Profile({ currentUser }: Props) {
  const { error, mutate, isPending } = useUpdateProfie(
    (message: string, type: TypeOptions) => {
      toast.success(message, {
        type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  );

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileSchema),
    mode: "onChange",
    defaultValues: currentUser,
  });
  const {
    reset,
    formState: { isSubmitSuccessful, isDirty, isValid },
  } = form;
  useEffect(() => {
    if (isSubmitSuccessful) reset(currentUser);
  }, [reset, isSubmitSuccessful, currentUser]);
  useEffect(() => {
    reset(currentUser);
  }, [currentUser, reset]);
  const onSubmit: SubmitHandler<ProfileFormType> = (currentUser) => {
    mutate(currentUser);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mx-4 text-black font-semibold border px-8 py-8 bg-white rounded-lg"
      >
        <div>
          <h2 className="text-3xl font-bold mb-1">User Profile</h2>
          <p className="text-sm text-black/55">
            View and Change your profile information here
          </p>
        </div>
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
        <div className="flex flex-col gap-6  md:flex-row">
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

        <div className="flex flex-col gap-6 md:flex-row">
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
        <SubmitButton disabled={!isDirty || !isValid || isPending}>
          {isPending && (
            <span className="flex gap-1">
              <LoaderCircle className="animate-spin h-4 w-4" />
              Submitting
            </span>
          )}
          {!isPending && "Submit"}
        </SubmitButton>
        {error && <div className="text-red-500">{error.message}</div>}
      </form>
    </Form>
  );
}
