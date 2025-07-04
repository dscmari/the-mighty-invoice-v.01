"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function AddCustomerButton() {
  const { pending } = useFormStatus();

  return (
    <button
      form="add-customer-form"
      type="submit"
      className={`bg-white rounded py-2 px-4 my-8 m-auto cursor-pointer hover:shadow-md ${pending? "w-full" : "w-1/3"}`}
    >
      {pending ? "Kunde wird hinzugefügt" : "Hinzufügen"}
    </button>
  );
}