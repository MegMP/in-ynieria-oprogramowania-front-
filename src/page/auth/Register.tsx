import { useForm } from "react-hook-form";
import { useRegister } from "./hooks/useRegister";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerSchema } from "./zod/registerSchema";
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
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";

type FormData = {
  login: string;
  password: string;
  email: string;
};

export const Register = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      login: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        navigate("/login");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl border-gray-300 bg-white">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Create an Account
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Sign up to get started
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pt-6">
          {registerMutation.isError &&
            registerMutation.error &&
            ((
              <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-700">
                  <p className="font-medium">Registration failed</p>
                  <p className="mt-1">
                    {(registerMutation.error as any).response?.data &&
                    typeof (registerMutation.error as any).response?.data ===
                      "string"
                      ? (registerMutation.error as any).response?.data
                      : "Please check your details and try again"}
                  </p>
                </div>
              </div>
            ) as any)}
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
                        placeholder="Enter your email"
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
                        placeholder="Enter your login"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-800">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Create a password"
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
                className="w-full cursor-pointer transition-all bg-pink-300 hover:bg-pink-400 text-gray-800 font-semibold mt-4"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending
                  ? "Creating account..."
                  : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <Separator className="bg-pink-200" />

        <CardFooter className="justify-center py-4">
          <p className="text-sm text-gray-600">
            Have an account already?{" "}
            <Link
              to="/login"
              className="font-semibold text-pink-500 hover:text-pink-600 underline underline-offset-2 transition-colors"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};
