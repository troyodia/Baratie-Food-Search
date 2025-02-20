import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ManageResturantForm } from "./ManageResturant";

type Props = {
  form: UseFormReturn<ManageResturantForm>;
};

function DetailsForm({ form }: Props) {
  return (
    <div className="text-white space-y-3">
      <div className="space-y-2">
        <h2 className="text-white font-bold text-2xl tracking-tight">
          Details
        </h2>
        <p className="text-gray-500 text-sm">
          Enter the details about your resturant
        </p>
      </div>
      <FormField
        control={form.control}
        name="details.name"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-bold">Name</FormLabel>
            <FormControl>
              <Input className="bg-[#c5d8f9] text-black" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-6  md:flex-row">
        <FormField
          control={form.control}
          name="details.city"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-bold">City</FormLabel>
              <FormControl>
                <Input className="bg-[#c5d8f9] text-black" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details.country"
          defaultValue=""
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel className="font-bold">Country</FormLabel>
              <FormControl>
                <Input className="bg-[#c5d8f9] text-black" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="details.deliveryPrice"
        defaultValue=""
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="font-bold">Delivery Price ($)</FormLabel>
            <FormControl>
              <Input
                className="bg-[#c5d8f9] max-w-80 text-black"
                type="number"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="details.deliveryTime"
        defaultValue=""
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel className="font-bold">
              Esitmated Delivery Time (minutes)
            </FormLabel>
            <FormControl>
              <Input
                className="bg-[#c5d8f9] max-w-80 text-black"
                type="number"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

export default DetailsForm;
