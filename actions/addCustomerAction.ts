"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Customer = {
  name: string,
  address: string,
  mail: string
}

export const addCustomer = async (formData: FormData) => {
  const name = formData.get("Name");
  const address = formData.get("Address");
  const mail = formData.get("Mail");

 await new Promise(resolve => setTimeout(resolve, 1000));

  if (
    typeof name !== "string" ||
    !name ||
    typeof address !== "string" ||
    !address ||
    typeof mail !== "string" ||
    !mail
  ) {
    throw new Error("Missing or invalid customer data.");
  }

  const newCustomer: Customer = {
    name: name,
    address: address,
    mail: mail,
  };

  await prisma.customer.create({
    data: newCustomer,
  });

  revalidatePath("/AddCustomer")
};
