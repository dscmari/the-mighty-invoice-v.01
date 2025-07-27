"use client";
import React, { useRef, useState, startTransition, useEffect } from "react";
import type { Lesson } from "../../../utils/types";
import GenerateInvoiceButton from "../buttons/GenerateInvoiceButton";
import { generateInvoice } from "../../../../actions/generateInvoice";
import { deleteLesson } from "../../../../actions/lessons/deleteLesson";
import NoInvoiceLessons from "../NoInvoiceLessons";
import TotalLessons from "../TotalLessons";

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
  const deleteRef = useRef<HTMLFormElement>(null);
  const hiddenLessonIdInputRef = useRef<HTMLInputElement>(null);
  const [isTotalCustomerLessons, setIsTotalCustomerLessons] = useState(false);
  const [openLessonId, setOpenLessonId] = useState<number | null>(null);

  useEffect(() => {
    console.log(lessonIds);
  }, [lessonIds]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedLessonId = event.target.value;
    console.log(checkedLessonId);
    if (event.target.checked) {
      setLessonIds([...lessonIds, checkedLessonId]);
    } else {
      setLessonIds(lessonIds.filter((lessonId) => lessonId != checkedLessonId));
    }
  };

  const handleDeleteLesson = (lessonId: number) => {
    console.log("handleDeleteLesson called");
    console.log(lessonId);
    //now i wnat the lesson id to be part of the data of the deleteRef form
    if (hiddenLessonIdInputRef.current) {
      hiddenLessonIdInputRef.current.value = lessonId.toString();
    }
    deleteRef.current?.requestSubmit();
  };

  const toggleLessonOptions = (lessonId: number) => {
    setOpenLessonId(prevId => (prevId === lessonId ? null : lessonId));
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
            <p className="pb-4">LESSONS</p>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setIsTotalCustomerLessons(true)}
                className={`px-2 border-1 w-28 ${
                  isTotalCustomerLessons
                    ? "text-blue-500 border-blue-500 font-semibold"
                    : "text-slate-500 border-slate-500"
                }`}
              >
                Total
              </button>

              <button
                type="button"
                onClick={() => setIsTotalCustomerLessons(false)}
                className={`px-2 border-1 w-28 ${
                  isTotalCustomerLessons
                    ? "text-slate-500 border-slate-500"
                    : "text-blue-500 border-blue-500 font-semibold"
                }`}
              >
                No Invoice
              </button>
            </div>

            {customer.lessons.map((lesson: Lesson) => (
              <div key={lesson.id}>
                {isTotalCustomerLessons ? (
                  <TotalLessons
                    lesson={lesson}
                    lessonIds={lessonIds}
                    handleChange={handleChange}
                    handleDeleteLesson={handleDeleteLesson}
                    showLessonOptions={openLessonId === lesson.id}
                    handleShowLessonOptions = {() => toggleLessonOptions(lesson.id)}
                  />
                ) : (
                  <NoInvoiceLessons
                    lesson={lesson}
                    lessonIds={lessonIds}
                    handleChange={handleChange}
                    handleDeleteLesson={handleDeleteLesson}
                    showLessonOptions={openLessonId === lesson.id}
                    handleShowLessonOptions = {() => toggleLessonOptions(lesson.id)}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Hidden input to pass the customer ID with this form */}
          <input type="hidden" name="customerId" value={customer.id} />
          <div className="ml-auto mr-4 my-auto">
            <GenerateInvoiceButton lessonIds={lessonIds} />
          </div>
        </form>
      ))}
      <form action={deleteLesson} ref={deleteRef}>
        <input type="hidden" name="lessonId" ref={hiddenLessonIdInputRef} />
        <button>submit</button>
      </form>
    </div>
  );
}
