import { useLogin } from "./hooks/useAuthenticate";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import type { AuthResponse } from "./types/AuthResponse";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { loginSchema } from "./zod/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { AlertCircle, Loader2 } from "lucide-react";

type FormData = {
  login: string;
  password: string;
};

export const Login = () => {
  const { loginMutation, error, isSuccess, isError } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
      onError: (error: any) => {
        const errors = error.response?.data;
        console.log(error.response?.data);
        Object.entries(errors).forEach(([field, message]) => {
          form.setError(field as any, { message: message as string });
        });
      },
    });
  };

  if (isSuccess === true) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-gray-300 bg-white">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          {isError &&
            error?.response?.data &&
            ((
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-medium">Login failed</p>
                  <p className="mt-1">
                    {typeof error.response?.data === "string"
                      ? error.response?.data
                      : "Please check your credentials and try again"}
                  </p>
                </div>
              </div>
            ) as any)}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Login</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your login"
                        {...field}
                        disabled={loginMutation.isPending}
                        className="transition-colors border-gray-300 focus:border-pink-300 focus:ring-pink-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-gray-800">Password</FormLabel>
                      <Link
                        to="#"
                        className="text-xs text-gray-500 hover:text-pink-500 transition-colors"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                        disabled={loginMutation.isPending}
                        className="transition-colors border-gray-300 focus:border-pink-300 focus:ring-pink-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full cursor-pointer transition-all bg-pink-300 hover:bg-pink-400 text-gray-800 font-semibold"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        <Separator className="bg-pink-200" />

        <CardFooter className="justify-center py-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-pink-500 hover:text-pink-600 underline underline-offset-2 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
