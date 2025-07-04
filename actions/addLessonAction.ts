"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


type Lesson = {
    studentId: number,
    date: Date
}


export const addLesson = async (formData: FormData) => {
    const studentIdInput =  formData.get("customerId")
    const dateInput = formData.get("date")

    if (
        typeof studentIdInput !== "string" ||
        !studentIdInput ||
        typeof dateInput !== "string" ||
        !dateInput
    ) {
        throw new Error("Missing or invalid customer data.");
    }

    const studentId = parseInt(studentIdInput);
    const date = new Date(dateInput);

    const newLesson: Lesson = {
        studentId: studentId,
        date: date
  };

    await prisma.lesson.create({
    data: newLesson,
  });

   revalidatePath("/AddLesson")
}