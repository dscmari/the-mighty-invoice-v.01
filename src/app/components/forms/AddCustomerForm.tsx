"use client";
import React, { useState } from "react";
import { addCustomer } from "../../../../actions/addCustomerAction";
import AddCustomerButton from "../buttons/AddCustomerButton";

export default function AddCustomerForm() {
  const [isActive, setIsActive] = useState(false);
  const handleChange = () => {
    setIsActive((prev) => !prev);
    console.log(isActive);
  };

  const fields = ["Name", "Strasse", "PLZ", "Mail", "Tel"];

  return (
    <div>
      <div onClick={handleChange} className="w-50 py-2 ml-4 px-2 flex gap-2 border-slate-100 cursor-pointer hover:bg-slate-100">
        <p>Kunde hinzufügen</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </div>
      <form
        id="add-customer-form"
        action={addCustomer}
        className={`bg-slate-100 flex flex-col gap-4 w-90 overflow-hidden transition-all duration-500 ease-out ${
          isActive ? "max-h-screen p-4 m-4" : "max-h-0 ml-4 pl-4"
        }`}
      >
        <h1>Kundendaten</h1>
        {fields.map((field: string) => (
          <div key={field} className="flex items-center">
            <label htmlFor={field} className="w-30">
              {field}:{" "}
            </label>
            <input
              type={field === "mail" ? "email" : "text"}
              id={field}
              name={field}
              placeholder={field}
              className="bg-white p-2 rounded"
              required
            />
          </div>
        ))}
        <AddCustomerButton />
      </form>
    </div>
  );
}
