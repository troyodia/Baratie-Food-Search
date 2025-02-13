import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import baratieIcon from "../../assets/Images/Baratie-icon.png";
import { Check, Eye, EyeOff } from "lucide-react";
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
import GoogleLogin from "./GoogleLogin";
import { useLoginUser } from "@/hooks/auth";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email provided",
  }),
  password: z.string().min(8, {
    message: "Password must be atleast 8 characters",
  }),
});
type FormFields = z.infer<typeof formSchema>;

export default function Login() {
  const naviagte = useNavigate();
  const { data, mutate, error } = useLoginUser(() => {
    naviagte("/");
  });
  const [hidePassword, setHidePassword] = useState(false);
  const form = useForm<FormFields>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });
  const {
    formState: { isSubmitSuccessful },
    reset,
  } = form;

  console.log(data, error);
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
        className="space-y-8 text-white max-w-[500px] mx-auto flex-1 border py-8 px-8"
      >
        <div className="flex flex-col gap-4">
          <img
            className="w-20 hover:scale-110 transition-all ease-in-out delay-75 cursor-pointer"
            src={baratieIcon}
            alt=""
          />
          <p className="font-bold text-lg">
            ようこそ, Please Login to Conitnue to Baratie!
          </p>
        </div>
        <GoogleLogin setGoogleLoginError={setGoogleLoginError} />
        <div className="flex justify-center items-center gap-2">
          <Separator
            orientation="horizontal"
            className="bg-white w-full h-px"
          />
          <p className="text-sm tracking-tight min-w-max font-bold text-[#75aaf0] ">
            Or Log in with email and password
          </p>
          <Separator
            orientation="horizontal"
            className="bg-white w-full h-px"
          />
        </div>
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
                  <button onClick={() => setHidePassword((prev) => !prev)}>
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
              </FormDescription>{" "}
            </FormItem>
          )}
        />
        <div className="space-x-2">
          <span>Don't have an Account?</span>
          <Link className="text-[#75aaf0] font-bold" to="/signup-page">
            Sign Up
          </Link>
        </div>
        <Button
          disabled={
            !form.formState.isDirty ||
            !form.formState.isValid ||
            !form.getValues("password")
          }
          className="bg-white border text-black font-bold hover:bg-transparent hover:text-white hover:border-white px-6"
          type="submit"
        >
          Login
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
