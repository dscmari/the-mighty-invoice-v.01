import Link from "next/link";
import React from "react";

export default function Page() {
  
  return (
    <div>
      <Link href={"/CreateInvoice"}>
        <div  className="py-2 px-4 flex gap-4 border-2 border-slate-100 rounded cursor-pointer hover:bg-green-500 hover:text-slate-100">
          Create Invoice
        </div>
      </Link>
    </div>
  );
}
