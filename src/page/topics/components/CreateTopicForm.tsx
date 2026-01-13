import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TopicSchema } from "../zod/TopicSchema";
import { useCreateTopic } from "../hooks/useCreateTopic";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea"; // Need to handle textarea or just use Input
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

type FormData = z.infer<typeof TopicSchema>;

export const CreateTopicForm = () => {
  const createTopicMutation = useCreateTopic();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(TopicSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: FormData) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found");
      return;
    }

    createTopicMutation.mutate(
      { ...data, userId },
      {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
        },
      }
    );
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-pink-500 hover:bg-pink-600 text-white gap-2"
      >
        <Plus className="w-4 h-4" />
        Create New Topic
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-md border-pink-200 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-gray-800">
          Create New Topic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter topic name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter topic description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-end mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createTopicMutation.isPending}
                className="bg-pink-500 hover:bg-pink-600"
              >
                {createTopicMutation.isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
