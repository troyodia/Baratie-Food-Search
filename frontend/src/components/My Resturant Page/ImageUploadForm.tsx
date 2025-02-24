import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useFormContext } from "react-hook-form";

export default function ImageUploadForm() {
  const form = useFormContext();
  const [fileDataUrl, setFileDataUrl] = useState<string | ArrayBuffer | null>(
    null
  );
  const imageUrl: string = form.watch("imageUrl");
  const previewImage = form.watch("image");
  useEffect(() => {
    if (previewImage) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setFileDataUrl(fileReader.result);
      };
      fileReader.readAsDataURL(previewImage);
    }
  }, [previewImage]);
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-white font-bold text-2xl tracking-tight">Image</h2>
        <p className="text-gray-500 text-sm">
          Add an image that will be displayed on your resturant listing in the
          seacrh results. Adding a new image will overwrite the existing one
        </p>
        {imageUrl && !previewImage && (
          <div className="w-full max-w-[600px] ">
            <AspectRatio ratio={16 / 9}>
              <img
                alt=""
                src={imageUrl}
                className="w-full h-full object-cover rounded-lg"
              ></img>
            </AspectRatio>
          </div>
        )}
        {previewImage && (
          <div className="w-full max-w-[600px] ">
            <AspectRatio ratio={16 / 9}>
              <img
                alt=""
                src={fileDataUrl as string}
                className="w-full h-full object-cover rounded-lg"
              ></img>
            </AspectRatio>
          </div>
        )}
      </div>
      <FormField
        control={form.control}
        name="image"
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
