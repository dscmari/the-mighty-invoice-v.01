"use client";
import React, { useEffect, useState } from "react";
import { generateInvoice } from "../../../actions/generatePDFAction";
import GenerateInvoiceButton from "./buttons/GenerateInvoiceButton";
import type { Lesson } from "../../types";

type Customer = {
  id: number;
  name: string;
  street: string;
  plz: string;
  mail: string;
  tel: string;
  lessons: Lesson[];
};

type CustomerProps = {
  customers: Customer[];
};

export default function Page({ customers }: CustomerProps) {
  const [lessonIds, setLessonIds] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedLessonId = event.target.value;
    console.log(checkedLessonId);
    if (event.target.checked) {
      setLessonIds([...lessonIds, checkedLessonId]);
    } else {
      setLessonIds(lessonIds.filter((lessonId) => lessonId != checkedLessonId));
    }
  };

  return (
    <div>
      {customers.map((customer: Customer) => (
        <form
          action={generateInvoice}
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
              <ol
                key={lesson.id}
                className={`flex gap-2 border-b py-1 relative ${
                  lessonIds.includes(lesson.id.toString()) ? "bg-red-500" : "bg-transparent"
                }`}
              >
                <li>Date {lesson.date.toDateString()}</li>
                <li>StudentId {lesson.studentId}</li>
                <li>LessonId {lesson.id}</li>
                <div className="absolute w-full h-full">
                  <label
                    htmlFor={`lesson-checkbox-${lesson.id}`}
                    className={`w-full h-full absolute `}
                  >
                    <input
                      type="checkbox"
                      id={`lesson-checkbox-${lesson.id}`}
                      checked={lessonIds.includes(lesson.id.toString())}
                      value={lesson.id}
                      onChange={handleChange}
                      className="hidden"
                      name = "lessonIds"
                    />
                  </label>
                </div>
              </ol>
            ))}
          </div>

          {/* Hidden input to pass the customer ID with this form */}
          <input type="hidden" name="customerId" value={customer.id} />

          <GenerateInvoiceButton />
        </form>
      ))}
    </div>
  );
}
