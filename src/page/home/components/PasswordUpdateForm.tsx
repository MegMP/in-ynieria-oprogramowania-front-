import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUpdatePassword } from "../hooks/useUpdatePassword";
import { PasswordUpdateSchema } from "../zod/PasswordUpdateSchema";

type FormData = z.infer<typeof PasswordUpdateSchema>;

export const PasswordUpdateForm = () => {
  const updateUserPassword = useUpdatePassword();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof PasswordUpdateSchema>>({
    resolver: zodResolver(PasswordUpdateSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    updateUserPassword.mutate(data, {
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

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
