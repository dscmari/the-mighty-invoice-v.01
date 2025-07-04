"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type Customer = {
  name: string,
  street: string,
  plz: string,
  mail: string,
  tel: string
}

export const addCustomer = async (formData: FormData) => {
  const name = formData.get("Name");
  const street = formData.get("Strasse");
  const plz = formData.get("PLZ")
  const mail = formData.get("Mail");
  const tel = formData.get("Tel");

 await new Promise(resolve => setTimeout(resolve, 1000));

  if (
    typeof name !== "string" ||
    !name ||
    typeof street !== "string" ||
    !street ||
    typeof plz !== "string" ||
    !plz ||
    typeof mail !== "string" ||
    !mail ||
    typeof tel !== "string" || 
    !tel
  ) {
    throw new Error("Missing or invalid customer data.");
  }

  const newCustomer: Customer = {
    name: name,
    street: street,
    plz: plz,
    mail: mail,
    tel: tel
  };

  await prisma.customer.create({
    data: newCustomer,
  });

  revalidatePath("/AddCustomer")
};
