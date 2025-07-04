import prisma from "@/lib/prisma";
import React from "react";
import GenerateInvoiceForm from "../components/GenerateInvoiceForm";

export default async function Page() {
    const customers = await prisma.customer.findMany({
    include: {
      lessons: true,
    },
  });

  return (
    <div>
        <GenerateInvoiceForm customers={customers}/>
    </div>
  );
}
