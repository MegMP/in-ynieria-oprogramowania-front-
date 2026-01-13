import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUserData } from "../hooks/useUserData";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserUpdateSchema } from "../zod/UserUpdateSchema";
import { z } from "zod";

import { Loader2, AlertCircle } from "lucide-react";

type FormData = z.infer<typeof UserUpdateSchema>;

export const UserUpdateForm = () => {
  const { data, isLoading, isError } = useUserData();
  const updateUserMutation = useUpdateUser();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        login: data.login,
        email: data.email,
      });
    }
  }, [data, form]);

  const onSubmit = async (data: FormData) => {
    updateUserMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        navigate("/profile");
      },
      onError: (error: any) => {
        const errors = error.response?.data;
        Object.entries(errors).forEach(([field, message]) => {
          form.setError(field as any, { message: message as string });
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center gap-2 p-4 text-red-600 bg-red-50 rounded-lg">
        <AlertCircle className="w-5 h-5" />
        <p>Failed to load user data</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email"
                  {...field}
                  className="transition-colors border-gray-300 focus:border-pink-300 focus:ring-pink-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-800">Login</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter login"
                  {...field}
                  className="transition-colors border-gray-300 focus:border-pink-300 focus:ring-pink-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full cursor-pointer bg-pink-300 hover:bg-pink-400 text-gray-800 font-semibold"
          disabled={updateUserMutation.isPending}
        >
          {updateUserMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};
