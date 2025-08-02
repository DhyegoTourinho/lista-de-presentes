import {Avatar, AvatarIcon, avatarGroup} from "@heroui/react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function App() {
  const { currentUser } = useAuth();
  const isLoggedIn = !!currentUser;

  return (
    <div className="flex items-center">
      <Link to={isLoggedIn ? "/" : "/login"}>
        <Avatar
          classNames={{
        base: "bg-linear-to-br from-[#303030] to-[#b3b3b3] cursor-pointer hover:scale-120 transition-transform",
        icon: "text-black/100 hover:text-white",
          }}
          icon={<AvatarIcon />}
        />
      </Link>
    </div>
  );
}