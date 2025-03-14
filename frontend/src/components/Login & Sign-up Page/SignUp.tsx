import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";

import baratieIcon from "../../assets/Images/Baratie-icon.png";
import { Eye, EyeOff, Check } from "lucide-react";
import GoogleLogin from "./GoogleLogin";
import { useSignUpUser } from "@/hooks/auth";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email provided",
  }),
  firstname: z
    .string()
    .min(1, {
      message: "First name must be between 1 and 10 characters",
    })
    .max(10, {
      message: "First name must be between 1 and 10 characters",
    }),
  lastname: z
    .string()
    .min(1, {
      message: "Last name must be between 1 and 10 characters",
    })
    .max(10, {
      message: "Last name must be between 1 and 10 characters",
    }),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof formSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const { data, mutate, error } = useSignUpUser(() => {
    navigate("/");
  });
  const [hidePassword, setHidePassword] = useState(false);
  console.log(data, error);
  const form = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });
  const {
    formState: { isSubmitSuccessful },
    reset,
  } = form;
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    mutate(data);
  };
  const setGoogleLoginError = () => {
    form.setError("root", {
      message: "Email and/or Password do not exist, please Sign up",
    });
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 text-white max-w-[500px] mx-auto flex-1 border py-8 px-8"
      >
        <div className="flex flex-col gap-4">
          <img
            className="w-20 hover:scale-110 transition-all ease-in-out delay-75 cursor-pointer"
            src={baratieIcon}
            alt=""
          />
          <p className="font-bold text-lg">
            ようこそ, New to Baratie?!, Please Sign Up!
          </p>
        </div>
        <div className="space-x-2">
          <span>Have an Account?</span>
          <Link className="text-[#75aaf0] font-bold" to="/login-page">
            Login In
          </Link>
        </div>
        <GoogleLogin setGoogleLoginError={setGoogleLoginError} />
        <div className="flex justify-center items-center gap-2">
          <Separator
            orientation="horizontal"
            className="bg-white w-full h-px"
          />
          <p className="text-sm tracking-tight min-w-max font-bold text-[#75aaf0] ">
            Or Sign up with email and password
          </p>
          <Separator
            orientation="horizontal"
            className="bg-white w-full h-px"
          />
        </div>
        <FormField
          defaultValue=""
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg tracking-tight">
                First Name
              </FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} />
                  <Eye opacity={0} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue=""
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg tracking-tight">
                Last Name
              </FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} />
                  <Eye opacity={0} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue=""
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg tracking-tight">
                Email Address
              </FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} />
                  <Eye opacity={0} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          defaultValue=""
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg tracking-tight">Password</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    {...field}
                    type={hidePassword ? "password" : "text"}
                    onChange={(e) => {
                      form.setValue("password", e.target.value);
                      if (e.target.value.length < 1) {
                        form.clearErrors("password");
                      } else {
                        form.trigger("password");
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setHidePassword((prev) => !prev)}
                  >
                    {!hidePassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </FormControl>
              <FormDescription>
                <span
                  className={`flex gap-1 ${
                    !form.formState.errors.password && field.value.length > 1
                      ? " text-green-600"
                      : field.value.length < 1
                      ? "text-gray-700"
                      : "text-red-500"
                  } `}
                >
                  <Check size={20} />
                  <span>Must be 8 characters long</span>
                </span>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            !form.getValues("password")
          }
          className="bg-white border text-black font-bold hover:bg-transparent hover:text-white hover:border-white px-6"
          type="submit"
          aria-label="signup"
        >
          Sign Up
        </Button>
        {form.formState.errors.root && (
          <div className="text-red-500">
            {form.formState.errors.root.message}
          </div>
        )}
        {error && <div className="text-red-500">{error.message}</div>}
      </form>
    </Form>
  );
}
