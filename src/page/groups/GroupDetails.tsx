import { useParams, Link } from "react-router-dom";
import { useGroup } from "./hooks/useGroup";
import { useAddMember } from "./hooks/useAddMember";
import { useRemoveMember } from "./hooks/useRemoveMember";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, ArrowLeft, Trash2, UserPlus, Users } from "lucide-react";
import { AlertCircle } from "lucide-react";

export const GroupDetails = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data: group, isLoading, isError } = useGroup(groupId);
  const addMemberMutation = useAddMember(groupId!);
  const removeMemberMutation = useRemoveMember(groupId!);
  const [newUserId, setNewUserId] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUserId) {
      addMemberMutation.mutate(newUserId, {
        onSuccess: () => setNewUserId(""),
      });
    }
  };

  const handleRemoveMember = (userId: string) => {
    if (
      window.confirm(
        "Are you sure you want to remove this user from the group?"
      )
    ) {
      removeMemberMutation.mutate(userId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100">
        <Loader2 className="w-10 h-10 animate-spin text-pink-400" />
      </div>
    );
  }

  if (isError || !group) {
    return (
      <div className="flex-1 min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-pink-50 to-gray-100">
        <div className="flex flex-col items-center gap-2 text-red-500 bg-white p-6 rounded-xl shadow-lg">
          <AlertCircle className="w-10 h-10" />
          <p className="font-semibold">Failed to load group details</p>
          <Link to="/groups">
            <Button variant="outline">Back to Groups</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 to-gray-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/groups">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded-lg">
              <Users className="w-6 h-6 text-pink-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">{group.name}</h1>
          </div>
        </div>

        <Card className="border-pink-100 shadow-md">
          <CardHeader>
            <CardTitle>Add Member</CardTitle>
            <CardDescription>
              Enter User ID to add to this group
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMember} className="flex gap-2">
              <Input
                placeholder="User ID"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                className="max-w-xs"
              />
              <Button
                type="submit"
                disabled={addMemberMutation.isPending || !newUserId}
              >
                {addMemberMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4 mr-2" />
                )}
                Add
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-pink-100 shadow-md">
          <CardHeader>
            <CardTitle>Members</CardTitle>
            <CardDescription>Users belonging to this group</CardDescription>
          </CardHeader>
          <CardContent>
            {group.users && group.users.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Login</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        {user.login}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleRemoveMember(user.id)}
                          disabled={removeMemberMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-gray-500 py-4">
                No members in this group yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
