"use client";

import React from "react";
import { useFormStatus } from "react-dom";

export default function AddLessonButton() {
  const { pending } = useFormStatus();

  return (
    <button
      form="add-lesson-form"
      type="submit"
      className="bg-white rounded border py-2 px-4 h-10 cursor-pointer hover:shadow-md w-44"
    >
      {pending ? "Hinzufügen..." : "Stunde hinzufügen"}
    </button>
  );
}