"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  lessonIds?: string []
}

export default function GenerateInvoiceButton({lessonIds}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={lessonIds?.length === 0}
      className={`bg-[#71b572] font-semibold text-white rounded my-auto py-2 px-4 hover:shadow-md h-10 w-44 text-center ${lessonIds?.length === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
    >
      {pending ? "Generating..." : "CREATE INVOICE"}
    </button>
  );
}