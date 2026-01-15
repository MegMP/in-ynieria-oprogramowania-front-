import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { UserUpdateForm } from "./components/UserUpdateForm";
import { PasswordUpdateForm } from "./components/PasswordUpdateForm";
import { Separator } from "@/components/ui/separator";
import { useUserData } from "./hooks/useUserData";
import { User, Loader2, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteAccount } from "./hooks/useDeleteAccount";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { data, isLoading, isError } = useUserData();
  const deleteAccountMutation = useDeleteAccount();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (
      data?.id &&
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      deleteAccountMutation.mutate(data.id, {
        onSuccess: () => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/login");
        },
      });
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
          <p className="font-semibold">Failed to load profile data</p>
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
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 to-gray-100 p-4 sm:p-8 flex items-start justify-center">
      <Card className="w-full max-w-2xl shadow-xl border-gray-300 bg-white">
        <CardHeader className="flex flex-col items-center pb-2 pt-8">
          <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm ring-1 ring-gray-100">
            <User className="w-12 h-12 text-pink-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {data?.login}
          </CardTitle>
          <CardDescription>{data?.mail}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 px-6 sm:px-12 py-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Account Settings
              </h3>
              <h6 className="text-sm font-semibold text-gray-400">
                Change your account information and password
              </h6>
            </div>

            <div className="space-y-4">
              <UserUpdateForm />
            </div>

            <Separator className="bg-gray-100" />

            <div className="space-y-4">
              <PasswordUpdateForm />
            </div>

            <Separator className="bg-gray-100" />

            <div className="space-y-4 pt-2">
              <Button
                variant="destructive"
                className="w-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 shadow-none"
                onClick={handleDelete}
                disabled={deleteAccountMutation.isPending}
              >
                {deleteAccountMutation.isPending ? (
                  "Deleting..."
                ) : (
                  <span className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" /> Delete Account
                  </span>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
