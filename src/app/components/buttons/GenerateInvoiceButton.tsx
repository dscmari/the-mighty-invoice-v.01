"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function GenerateInvoiceButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`bg-white rounded py-2 px-4 my-8 m-auto cursor-pointer hover:shadow-md "w-1/3"}`}
    >
      {pending ? "Rechnung wird erstellt" : "Erstelle Rechnung"}
    </button>
  );
}