"use client";
import React, {useState } from "react";
import { generateInvoice } from "../../../../actions/generateInvoice";
import GenerateInvoiceButton from "../buttons/GenerateInvoiceButton";
import type { Lesson } from "../../../utils/types";

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
          className="flex items-start m-4 gap-8 bg-slate-100 p-4 md:min-w-60"
        >
          <div className="flex-[0_0_30%]">
            <ol>
              <li className="mb-2 font-semibold">{customer.name}</li>
              <li className="mb-2">{customer.street}</li>
              <li className="mb-2">{customer.plz}</li>
              <li className="mb-2">{customer.mail}</li>
            </ol>
          </div>
          <div>
            {customer.lessons.map((lesson: Lesson) => (
              <ol
                key={lesson.id}
                className={`flex gap-4 border-b p-1 relative hover:bg-orange-200 ${
                  lessonIds.includes(lesson.id.toString()) ? "bg-orange-300" : "bg-transparent"
                }`}
              >
                <li>{lesson.date.toDateString()}</li>
                <li>LessonId {lesson.id}</li>
                <div className="absolute w-full h-full">
                  <label
                    htmlFor={`lesson-checkbox-${lesson.id}`}
                    className="w-full h-full absolute cursor-pointer"
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
          <div className="ml-auto mr-4 my-auto">
                 <GenerateInvoiceButton />
            </div>  
     
        </form>
      ))}
    </div>
  );
}
