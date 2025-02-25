import { items } from "./myResturantFormData";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { Checkbox } from "../ui/checkbox";
import { useFormContext } from "react-hook-form";

export default function CuisinesForm() {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="cuisineItems"
      render={() => (
        <FormItem>
          <FormLabel className="text-black text-2xl tracking-tight font-bold">
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
                  name="cuisineItems"
                  render={({ field }) => (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          className="border-black data-[state=checked]:bg-black"
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value != item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm  text-black font-semibold">
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
