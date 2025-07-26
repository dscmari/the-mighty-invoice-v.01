"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const deleteLesson = async (formData : FormData) => {
  
    const lessonIdString = formData.get("lessonId")

    if(!lessonIdString || typeof lessonIdString !== "string") {
         throw new Error("Missing or invalid customer data.");
    }

    const lessonId = parseInt(lessonIdString)

    const deletedLesson = await prisma.lesson.delete({
        where : {
            id : lessonId
        }
    })
    console.log("Successfully deleted lesson record: ", deletedLesson);

    revalidatePath('/')
}
