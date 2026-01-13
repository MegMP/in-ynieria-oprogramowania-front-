import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, LogOut } from "lucide-react";

export const Nav = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="w-full bg-white flex flex-row justify-between p-3 border shadow-sm">
      <NavigationMenu className="flex justify-center w-full">
        <NavigationMenuList>
          <NavigationMenuLink asChild className="flex justify-center mr-2">
            <Link to="/">
              <Home size={18} className="text-pink-800" />
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/profile">Profile</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/topics">Topics</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/projects">Projects</Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link to="/groups">Groups</Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <Button variant="ghost" onClick={logout} className="cursor-pointer">
        <LogOut size={18} />
      </Button>
    </div>
  );
};
