import { useTopics } from "./hooks/useTopics";
import { useDeleteTopic } from "./hooks/useDeleteTopic";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, AlertCircle, BookOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { CreateTopicForm } from "./components/CreateTopicForm";

export const Topics = () => {
  const { data: topics, isLoading, isError } = useTopics();
  const deleteTopicMutation = useDeleteTopic();
  const currentUserId = localStorage.getItem("userId");

  const handleDelete = (topicId: string) => {
      deleteTopicMutation.mutate(topicId);
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-pink-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100">
        <div className="flex flex-col items-center gap-2 text-red-500 bg-white p-6 rounded-xl shadow-lg">
          <AlertCircle className="w-10 h-10" />
          <p className="font-semibold">Failed to load topics</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="cursor-pointer"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Topics</h1>
          </div>
          <CreateTopicForm />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics?.map((topic) => (
            <Card
              key={topic.id}
              className="hover:shadow-lg transition-shadow bg-white border-pink-100 relative group"
            >
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-gray-800">
                      {topic.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {topic.description}
                    </CardDescription>
                  </div>
                  {topic.userId === currentUserId && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-500 hover:bg-red-50 -mt-2 -mr-2"
                      onClick={() => handleDelete(topic.id)}
                      disabled={deleteTopicMutation.isPending}
                    >
                      {deleteTopicMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
