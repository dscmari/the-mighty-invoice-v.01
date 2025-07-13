"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();

  return (
    <nav className="">
      <div className="p-4 flex justify-between items-center">
        <Link href={"/"}>
          <div className="py-2 px-4">
            <p className="text-xl font-bold text-[#71b572]">
              The Mighty Invoice
            </p>
          </div>
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link href={"/Namaste"}>
              <p>Namaste</p>
            </Link>
          </li>
          <li>
            <Link href={"/Lessons"}>
              <p>Programmierschüler</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
