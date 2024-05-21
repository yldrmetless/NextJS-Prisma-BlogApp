import { BookOpenText } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg py-4 px-28">
      <div className="flex-1">
        <Link href={"/"} className="font-semibold text-xl flex items-center gap-x-2">
        <BookOpenText/>HOME
        </Link>
      </div>
      <div className="flex-none">
        <Link href={"/create"} className="btn btn-primary text-white">Create Post</Link>
      </div>
    </div>
  );
};

export default Navbar;
