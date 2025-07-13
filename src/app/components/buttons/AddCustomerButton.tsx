"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function AddCustomerButton() {
  const { pending } = useFormStatus();

  return (
    <button
      form="add-customer-form"
      type="submit"
      className="mx-auto my-4 rounded py-2 px-4 h-10 w-44 cursor-pointer hover:shadow-md bg-[#71b572] font-semibold text-white"
    >
      {pending ? "Adding..." : "ADD CUSTOMER"}
    </button>
  );
}