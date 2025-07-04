import React from "react";
import AddLessonForm from "../components/AddLessonForm";
import prisma from "@/lib/prisma";
import GenerateInvoiceForm from "../components/GenerateInvoiceForm"

export default async function Page() {
  const customers = await prisma.customer.findMany({
    include: {
      lessons: true,
    },
  });

  return (
    <div>
      <div className="p-2 border rounded">
        <p className="m-4 text-xl">Stunde hinzufügen </p>
        <AddLessonForm customers={customers} />
      </div>
      <div className="p-2 border">
        <p className="m-4 text-xl">Übersicht</p>
        <GenerateInvoiceForm customers={customers} />
        {/* <div className="flex flex-wrap gap-4 m-4">
          {customers.map((customer: Customer) => (
            <div
              key={customer.id}
              className="flex gap-8 bg-slate-100 p-4 md:min-w-60"
            >
              <div>
                <ol>
                  <li className="mb-2">Id: {customer.id}</li>
                  <li className="mb-2">Name: {customer.name}</li>
                  <li className="mb-2">Strasse: {customer.street}</li>
                  <li className="mb-2">PLZ: {customer.plz}</li>
                  <li className="mb-2">Mail: {customer.mail}</li>
                </ol>
              </div>
              <div>
                <p> Stunden</p>
                {customer.lessons.map((lesson: Lesson) => (
                  <ol key={lesson.id} className="flex gap-2 border-b py-1">
                    <li>Date {lesson.date.toDateString()}</li>
                    <li>StudentId {lesson.studentId}</li>
                  </ol>
                ))}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
