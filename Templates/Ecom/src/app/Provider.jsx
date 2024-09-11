"use client";

import Sidebar from "@/_components/Sidebar";

export default function Provider({ children }) {
  return (
    <div className="wrapper relative">
      <Sidebar />
      <main
        className={`ml-0 sm:ml-[--w-side-small] md:ml-[--w-side-md] lg:ml-[--w-side]`}
      >
        <div
          className={`m-auto max-w-[935px] px-2 sm:px-5 pb-14
          `}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
