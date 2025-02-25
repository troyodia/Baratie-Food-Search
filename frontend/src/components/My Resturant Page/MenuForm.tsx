import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function MenuForm() {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "menu",
  });
  return (
    <div className="space-y-2">
      <div className="space-y-2">
        <h2 className="text-black font-bold text-2xl tracking-tight">Menu</h2>
        <p className="text-gray-500 text-sm">
          Create your menu annd give each item a name and price!. You must have
          at least one item in your menu
        </p>
      </div>
      {fields.map(({ id }, index) => {
        return (
          <div key={id} className="text-black flex gap-3 items-end ">
            <FormField
              defaultValue=""
              control={form.control}
              name={`menu.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-end gap-1">
                    <span>Name</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#c5d8f9] text-black max-w-40 sm:max-w-full"
                      placeholder="Ramen"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              //   defaultValue=""
              control={form.control}
              name={`menu.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-end gap-1">
                    <span>Price ($)</span>
                    <FormMessage />
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#c5d8f9] text-black max-w-40 sm:max-w-full"
                      placeholder="8.00"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {index > 0 && (
              <Button
                className="bg-transparent text-black border-2 border-red-700  hover:border-red-900 hover:bg-transparent transition-colors ease-in-out"
                onClick={() => {
                  remove(index);
                }}
              >
                Remove
              </Button>
            )}
          </div>
        );
      })}
      <Button
        type="button"
        className=" border-2 bg-transparent text-black border-[#75AAF0] hover:border-[#b6cff7] hover:bg-transparent transition-colors ease-in-out"
        onClick={() => {
          append({ name: "", price: "" });
        }}
      >
        Add Menu Item
      </Button>
    </div>
  );
}
