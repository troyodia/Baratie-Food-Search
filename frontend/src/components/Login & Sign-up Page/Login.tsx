import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import baratieIcon from "../../assets/Images/Baratie-icon.png";
import { Eye, EyeOff } from "lucide-react";
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
import { Link } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";

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
  const [hidePassword, setHidePassword] = useState(false);
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
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
                  <Input {...field} type={hidePassword ? "password" : "text"} />
                  <button onClick={() => setHidePassword((prev) => !prev)}>
                    {!hidePassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-x-2">
          <span>Don't have an Account?</span>
          <Link className="text-[#75aaf0] font-bold" to="/signup-page">
            Sign Up
          </Link>
        </div>
        <p>ADD LOGIN WITH GOOGLE</p>
        <div className="flex justify-center items-center gap-2">
          <Separator
            orientation="horizontal"
            className="bg-white w-full h-px"
          />
          <p className="text-sm tracking-tight min-w-max  ">
            Or with email and password
          </p>
          <Separator
            orientation="horizontal"
            className="bg-white w-full h-px"
          />
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          className="bg-white border text-black font-bold hover:bg-transparent hover:text-white hover:border-white px-6"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
