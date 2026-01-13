import { useGroups } from "./hooks/useGroups";
import { useDeleteGroup } from "./hooks/useDeleteGroup";
import { CreateGroupForm } from "./components/CreateGroupForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Users2, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Groups = () => {
  const { data: groups, isLoading, isError } = useGroups();
  const deleteGroupMutation = useDeleteGroup();

  const handleDelete = (groupId: string) => {
    if (confirm("Are you sure you want to delete this group?")) {
      deleteGroupMutation.mutate(groupId);
    }
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
          <p className="font-semibold">Failed to load groups</p>
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
              <Users2 className="w-6 h-6 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Groups</h1>
          </div>
          <CreateGroupForm />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {groups?.map((group) => (
            <Card
              key={group.id}
              className="hover:shadow-md transition-shadow bg-white border-pink-100 flex flex-col justify-between"
            >
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">
                  {group.name}
                </CardTitle>
              </CardHeader>
              <CardContent>{/* Minimal content as requested */}</CardContent>
              <CardFooter className="flex justify-end pt-0 pb-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-500 hover:bg-red-50"
                  onClick={() => handleDelete(group.id)}
                  disabled={deleteGroupMutation.isPending}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
          {groups?.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              No groups found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
