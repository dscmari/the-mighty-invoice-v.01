"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Page() {
  const pathname = usePathname();
  const getLinkClasses = (href: string) => {
    return `
      ${
        pathname === href
          ? "py-2 px-4 rounded underline" // Styling für aktiven Link
          : "py-2 px-4 hover:bg-slate-200 rounded"
      }
    `;
  };

  return (
    <nav className="">
      <div className="p-4 flex justify-between items-center">
        <Link href={"/"}>
          <div className="py-2 px-4">
            <p className="text-xl font-bold text-[#71b572]">The Mighty Invoice</p>
          </div>
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link href={"/Customer"}>
              <p>Customer</p>
            </Link>
          </li>
                    <li>
            <Link href={"/Lessons"}>
              <p>Lessons</p>
            </Link>
          </li>
          <li>
            <Link href={"/Invoice"}>
              <p>Invoice</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
