import React from "react";
import prisma from "@/lib/prisma";

export default async function DisplayAddedlatestCustomer() {
  const latestCustomer = await prisma.customer.findFirst({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="bg-slate-100 p-4 md:min-w-60">
      <h2 className="mb-4">Letzter hinzugefügter Kunde</h2>
      <ol key={latestCustomer?.id}>
        <li className="mb-2">Id: {latestCustomer?.id}</li>
        <li className="mb-2">Name: {latestCustomer?.name}</li>
        <li className="mb-2">Adresse: {latestCustomer?.street}</li>
        <li className="mb-2">Adresse: {latestCustomer?.plz}</li>
        <li className="mb-2">Mail: {latestCustomer?.mail}</li>
      </ol>
    </div>
  );
}
