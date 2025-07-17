import React from "react";
import NamasteInvoiceForm from "../components/forms/NamasteInvoiceForm";
import AddCustomerForm from "../components/forms/AddCustomerForm";
import prisma from "@/lib/prisma";

export default async function Namaste() {

    const customers = await prisma.customer.findMany({
    include: {
      lessons: true,
    },
  });
  
  return (
    <div>
      <div>
        <p className="m-4 text-xl ">Add Customer </p>
        <AddCustomerForm />
      </div>
      <p className="m-4 text-xl">Namaste-Websites Rechnung erstellen</p>
      <NamasteInvoiceForm customers={customers} />
    </div>
  );
}
