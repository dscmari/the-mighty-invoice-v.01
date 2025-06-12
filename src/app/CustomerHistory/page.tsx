import prisma from "@/lib/prisma";

type Customer = {
  id: number,
  name: string,
  address: string,
  mail: string
}


export default async function Page() {
  const customers = await prisma.customer.findMany();
  return (
    <div>
      <h1 className="m-4">Customer History</h1>
      <div className="flex flex-wrap gap-4 m-4">
        {customers.map((customer:Customer) => (
          <ol key={customer.id} className="bg-slate-100 p-4 md:min-w-60">
            <li className="mb-2">Id: {customer.id}</li>
            <li className="mb-2">Name: {customer.name}</li>
            <li className="mb-2">Adresse: {customer.address}</li>
            <li className="mb-2">Mail: {customer.mail}</li>
          </ol>
        ))}
      </div>
    </div>
  );
}
