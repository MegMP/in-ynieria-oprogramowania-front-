import { useUserData } from "./hooks/useUserData";

export const Home = () => {
  const { data: user } = useUserData();

  return (
    <div className="flex-1 min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 to-gray-100 p-4 sm:p-8 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 animate-in fade-in duration-700">
        Welcome back {user?.login ?? ""}!
      </h1>
    </div>
  );
};
