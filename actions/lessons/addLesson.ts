"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { AddLesson } from "@/utils/types";

export const addLesson = async (formData: FormData) => {
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const studentIdInput =  formData.get("customerId")
    const dateInput = formData.get("date")
    const lessonDescription = formData.get("lessonDescription")

    if (
        typeof studentIdInput !== "string" || !studentIdInput
        ||
        typeof dateInput !== "string" || !dateInput
        ||
        typeof lessonDescription !== "string"
    ) {
        throw new Error("Missing or invalid customer data.");
    }

    const studentId = parseInt(studentIdInput);
    const date = new Date(dateInput);

    const newLesson: AddLesson = {
        studentId: studentId,
        date: date,
        description: lessonDescription,
        invoiceId: null
  };

    await prisma.lesson.create({
    data: newLesson,
  });

   revalidatePath("/AddLesson")
}