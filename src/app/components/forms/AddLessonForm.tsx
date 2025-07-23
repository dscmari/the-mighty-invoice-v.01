"use client";
import React from "react";
import { addLesson } from "../../../../actions/addLessonAction";
import AddLessonButton from "../buttons/AddLessonButton";
import type { Customer } from "../../../utils/types";

type CustomerProps = {
  customers: Customer[];
};

export default function AddLessonForm({ customers }: CustomerProps) {
  return (
    <form
      action={addLesson}
      id="add-lesson-form"
      className="flex gap-8 items-center bg-slate-100 p-4 m-4"
    >
      <div className="flex gap-12 items-center">
        <div className="flex flex-col">
          <label htmlFor="customer-select" className=""></label>
          <select
            id="customer-select"
            name="customerId"
            className="px-2 py-1 cursor-pointer"
          >
            {customers.length === 0 && (
              <option value="">No customers available</option>
            )}
            {customers.map((customer: Customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="lessonDate" className=""></label>
          <input
            type="date"
            id="lessonDate"
            name="date"
            className="cursor-pointer"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="lesson-description">Description:</label>
          <input type="text" id="lesson-descripton" name="lessonDescription" className="bg-white p-1 rounded" placeholder="Programmierkurs" />
        </div>
      </div>
      <div className="ml-auto mr-4">
        <AddLessonButton />
      </div>
    </form>
  );
}
