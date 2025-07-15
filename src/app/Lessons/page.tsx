import React from "react";
import AddLessonForm from "../components/forms/AddLessonForm";
import prisma from "@/lib/prisma";
import GenerateInvoiceForm from "../components/forms/StudentInvoiceForm"
import AddCustomerForm from "../components/forms/AddCustomerForm";

export default async function Page() {
  const customers = await prisma.customer.findMany({
    include: {
      lessons: true,
    },
  });

  return (
    <div>
      <div className="p-2">
        <p className="m-4 text-xl ">Add Customer </p>
        <AddCustomerForm />
      </div>
      <div className="p-2">
        <p className="m-4 text-xl ">Add Lesson </p>
        <AddLessonForm customers={customers} />
      </div>
      <div className="p-2">
        <p className="m-4 text-xl">Customers</p>
        <GenerateInvoiceForm customers={customers} />
      </div>
    </div>
  );
}
