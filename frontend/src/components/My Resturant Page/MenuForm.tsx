import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ManageResturantForm } from "./ManageResturant";
import { useFieldArray, UseFormReturn } from "react-hook-form";
type Props = {
  form: UseFormReturn<ManageResturantForm>;
};

export default function MenuForm({ form }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "menu",
  });
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <h2 className="text-white font-bold text-2xl tracking-tight">Menu</h2>
        <p className="text-gray-400 text-sm">
          Create your menu annd give each item a name and price!. You must have
          at least one item in your menu.
        </p>
      </div>
      {fields.map(({ id }, index) => {
        return (
          <div key={id} className="text-white flex gap-3 items-end">
            <FormField
              defaultValue=""
              control={form.control}
              name={`menu.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#c5d8f9] text-black"
                      placeholder="Ramen"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              defaultValue=""
              control={form.control}
              name={`menu.${index}.price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-[#c5d8f9] text-black"
                      placeholder="8.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {index > 0 && (
              <Button
                className="bg-transparent border-2 border-red-800"
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
        className=" border-2 bg-transparent border-[#75AAF0]"
        onClick={() => {
          append({ name: "", price: "" });
        }}
      >
        Add Menu Item
      </Button>
    </div>
  );
}
