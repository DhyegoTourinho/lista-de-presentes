import {Avatar, AvatarIcon} from "@heroui/react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="flex items-center">
      <Link to="/login">
        <Avatar
          classNames={{
            base: "bg-linear-to-br from-[#FFB457] to-[#FF705B] cursor-pointer hover:scale-110 transition-transform",
            icon: "text-black/80",
          }}
          icon={<AvatarIcon />}
        />
      </Link>
    </div>
  );
}