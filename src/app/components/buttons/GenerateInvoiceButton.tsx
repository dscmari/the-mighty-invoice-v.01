"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function GenerateInvoiceButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-white rounded my-auto py-2 px-4 cursor-pointer hover:shadow-md h-10 w-44 text-center"
    >
      {pending ? "Erstellen..." : "Erstelle Rechnung"}
    </button>
  );
}