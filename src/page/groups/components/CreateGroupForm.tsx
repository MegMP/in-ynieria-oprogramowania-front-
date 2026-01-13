import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GroupSchema } from "../zod/GroupSchema";
import { useCreateGroup } from "../hooks/useCreateGroup";
import { useTopics } from "../../topics/hooks/useTopics";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";

type FormData = z.infer<typeof GroupSchema>;

export const CreateGroupForm = () => {
  const createGroupMutation = useCreateGroup();
  const { data: topics } = useTopics();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      name: "",
      topicId: "",
    },
  });

  const onSubmit = (data: FormData) => {
    createGroupMutation.mutate(data, {
      onSuccess: () => {
        setIsOpen(false);
        form.reset();
      },
    });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-pink-500 hover:bg-pink-600 text-white gap-2"
      >
        <Plus className="w-4 h-4" />
        Create New Group
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-md border-pink-200 shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-gray-800">
          Create New Group
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
                    <Input placeholder="Enter group name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topicId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {topics?.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                          {topic.name}
                        </option>
                      ))}
                    </select>
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
                className="bg-pink-500 hover:bg-pink-600"
                disabled={createGroupMutation.isPending}
              >
                {createGroupMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
