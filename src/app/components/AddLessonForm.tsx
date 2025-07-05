"use client";
import React from "react";
import { addLesson } from "../../../actions/addLessonAction";
import AddLessonButton from "./buttons/AddLessonButton";
import type { Customer } from "../../types";

type CustomerProps = {
  customers: Customer[];
};

export default function AddLessonForm({ customers }: CustomerProps) {
  return (
    <form action={addLesson} id="add-lesson-form" className="flex gap-8 items-center">
      <div>
        <div>
          <label htmlFor="customer-select" className="m-4">
            Select Customer:
          </label>
          <select id="customer-select" name="customerId" className="m-4">
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
        <div>
          <label htmlFor="lessonDate" className="m-4">
            Datum:
          </label>
          <input
            type="date"
            id="lessonDate"
            name="date"
            required
            className="m-4"
          />
        </div>
      </div>

      <AddLessonButton />
    </form>
  );
}
