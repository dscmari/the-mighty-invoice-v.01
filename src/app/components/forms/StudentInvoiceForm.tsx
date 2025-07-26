"use client";
import React, { useRef, useState, startTransition, useEffect } from "react";
import type { Lesson } from "../../../utils/types";
import GenerateInvoiceButton from "../buttons/GenerateInvoiceButton";
import { generateInvoice } from "../../../../actions/generateInvoice";
import { deleteLesson } from "../../../../actions/lessons/deleteLesson";

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedLessonId = event.target.value;
    console.log(checkedLessonId);
    if (event.target.checked) {
      setLessonIds([...lessonIds, checkedLessonId]);
    } else {
      setLessonIds(lessonIds.filter((lessonId) => lessonId != checkedLessonId));
    }
  };

  const handleDeleteLesson = (
    e: React.MouseEvent<HTMLButtonElement>,
    lessonId: number
  ) => {
    console.log("handleDeleteLesson called");
    console.log(lessonId);
    //now i wnat the lesson id to be part of the data of the deleteRef form
    if (hiddenLessonIdInputRef.current) {
      hiddenLessonIdInputRef.current.value = lessonId.toString();
    }
    deleteRef.current?.requestSubmit();
  };

  useEffect(() => {
    console.log("new render after delete of lesson");
  }, customers);

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
              <div className="flex" key={lesson.id}>
                <ol
                  className={`flex gap-4 border-b p-1 relative hover:bg-orange-200 ${
                    lessonIds.includes(lesson.id.toString())
                      ? "bg-orange-300"
                      : "bg-transparent"
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
                        name="lessonIds"
                      />
                    </label>
                  </div>
                </ol>
                <button
                  onClick={(e) => handleDeleteLesson(e, lesson.id)}
                  className="z-100 cursor-pointer"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-10 text-red-500 hover:bg-slate-200" // <--- Add this class
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Hidden input to pass the customer ID with this form */}
          <input type="hidden" name="customerId" value={customer.id} />
          <div className="ml-auto mr-4 my-auto">
            <GenerateInvoiceButton />
          </div>
        </form>
      ))}
      <form action={deleteLesson} ref={deleteRef}>
        <p>test</p>

        <input type="hidden" name="lessonId" ref={hiddenLessonIdInputRef} />
        <button>submit</button>
      </form>
    </div>
  );
}
