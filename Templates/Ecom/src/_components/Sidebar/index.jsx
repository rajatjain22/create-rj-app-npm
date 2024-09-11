import Link from "next/link";
import { menuItems } from "./sidebar.js";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="hidden max-w-[--w-side] sm:w-[--w-side-small] md:w-[--w-side-md] lg:w-full sm:block fixed bg-white z-10 h-screen border-r shadow-lg">
      <div className="my-2 text-3xl font-bold border-b p-3 text-center">
        <div className="relative w-full h-6">
          <Image src="" fill={true} alt="logo" />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        {menuItems.map((e, index) => (
          <Link
            key={index}
            href={e.path}
            className={`flex items-center text-md gap-2 p-2 hover:-translate-y-1 duration-300 hover:bg-[rgba(0,0,0,.05)] hover:rounded-lg ${
              e.label === "Logout" &&
              "absolute bottom-0 sm:w-[70%] md:w-[90%] bg-white"
            }`}
          >
            <span>{e.icon}</span>
            <span className="hidden md:block font-medium">{e.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
