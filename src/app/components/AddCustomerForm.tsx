"use client";
import React from "react";
import { addCustomer } from "../../../actions/addCustomerAction";
import AddCustomerButton from "./AddCustomerButton";


export default function AddCustomerForm() {
  const fields = ["Name", "Address", "Mail"];

  return (
    <div>
      <form
        id="add-customer-form"
        action={addCustomer}
        className="bg-slate-100 flex flex-col gap-4 w-90 p-4"
      >
        <h1>Kunde hinzufügen</h1>
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
