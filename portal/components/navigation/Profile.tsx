import avator from "@/public/avatars/snail.png";
import Image from "next/image";
import { IconChevronDown } from "@tabler/icons-react";

function Profile() {
  return (
    <div className="profile-btn flex gap-2 items-center p-1 cursor-pointer">
      <span className="">
        <Image src={avator} alt="name" />
      </span>
      Name
      <IconChevronDown className="ml-auto" />
    </div>
  );
}

export default Profile;
