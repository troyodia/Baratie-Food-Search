import { items } from "./myResturantFormData";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { UseFormReturn } from "react-hook-form";
import { ManageResturantForm } from "./ManageResturant";
import { Checkbox } from "../ui/checkbox";

type Props = {
  form: UseFormReturn<ManageResturantForm>;
};
export default function CuisinesForm({ form }: Props) {
  return (
    <FormField
      control={form.control}
      name="items"
      render={() => (
        <FormItem>
          <FormLabel className="text-white text-2xl tracking-tight font-bold">
            Cuisines
          </FormLabel>
          <FormDescription>
            Select the Cuisines that your resturant serves
          </FormDescription>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {items.map((item) => {
              return (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          className="border-white data-[state=checked]:bg-black"
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value != item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm  text-white font-semibold">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              );
            })}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
