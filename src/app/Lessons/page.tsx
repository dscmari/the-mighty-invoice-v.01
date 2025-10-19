import React from "react";
import prisma from "@/lib/prisma";
import AddCustomerForm from "../components/forms/AddCustomerForm";
import AddLessonForm from "../components/forms/AddLessonForm";
import StudentInvoiceForm from "../components/forms/StudentInvoiceForm";

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
        <StudentInvoiceForm customers={customers} />
      </div>
    </div>
  );
}
