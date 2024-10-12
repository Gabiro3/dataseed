'use client';
import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
const formSchema = z.object({
  nationalId: z
    .string()
    .min(8, { message: 'National ID must be at least 8 characters' }),
  farmLocation: z
    .string()
    .min(3, { message: 'Farm location must be at least 3 characters' }),
  farmSize: z.coerce
    .number()
    .positive({ message: 'Farm size must be a positive number' }),
  phoneNumber: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  capitalRequired: z.coerce
    .number()
    .positive({ message: 'Capital required must be a positive number' })
});
type FarmerFormValues = z.infer<typeof formSchema>;

export const FarmerForm: React.FC<{ initialData: any | null }> = ({
  initialData
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Farmer' : 'Create Farmer';
  const description = initialData ? 'Edit a farmer.' : 'Add a new farmer';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData
    ? initialData
    : {
        nationalId: '',
        farmLocation: '',
        farmSize: 0,
        phoneNumber: '',
        capitalRequired: 0
      };

  const form = useForm<FarmerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: FarmerFormValues) => {
    try {
      setLoading(true);
      // Handle submit logic here (e.g., API call)
      router.push(`/dashboard/farmers`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="nationalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National ID</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="National ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="farmLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Location</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Farm Location"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="farmSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Farm Size (acres)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Farm Size"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Phone Number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capitalRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capital Required ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={loading}
                    placeholder="Capital Required"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
