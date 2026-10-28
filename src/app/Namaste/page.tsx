import React from "react";
import NamasteInvoiceForm from "../components/forms/NamasteInvoiceForm";
import AddCustomerForm from "../components/forms/AddCustomerForm";
import prisma from "@/lib/prisma";
import MonthlyPayment from "../components/forms/MonthlyPayment";

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
      <p className="m-4 text-xl">Neue namaste-websites Rechnung erstellen</p>
      <NamasteInvoiceForm customers={customers} />
      <p className="m-4 text-xl">Monatliche Rechung erstellen</p>
      <div className="">
            <MonthlyPayment customers={customers} />
      </div>
    </div>
  );
}
