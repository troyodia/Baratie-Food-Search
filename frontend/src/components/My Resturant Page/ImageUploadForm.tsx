import { UseFormReturn } from "react-hook-form";
import { ManageResturantForm } from "./ManageResturant";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import placeholder from "../../assets/Images/food.jpg";

type Props = {
  form: UseFormReturn<ManageResturantForm>;
};

export default function ImageUploadForm({ form }: Props) {
  //   const fileRef = form.register("resturantImage");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-white font-bold text-2xl tracking-tight">Image</h2>
        <p className="text-gray-500 text-sm">
          Add an image that will be displayed on your resturant listing in the
          seacrh results. Adding a new image will overwrite the existing one
        </p>
        <div className="w-full max-w-[600px] ">
          <img
            alt=""
            src={placeholder}
            className="w-full object-contain rounded-lg"
          ></img>
        </div>
      </div>
      <FormField
        control={form.control}
        name="resturantImage"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                type="file"
                accept="image/*"
                ref={field.ref}
                name={field.name}
                onBlur={field.onBlur}
                className=" max-w-[600px] bg-[#c5d8f9] file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:border
                 file:border-solid file:border-blue-700 file:rounded-md border-blue-600 text-black cursor-pointer"
                // {...field}
                onChange={(e) => {
                  field.onChange(e.target?.files?.[0]);
                  //   console.log(e.target?.files?.[0]);
                }}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
