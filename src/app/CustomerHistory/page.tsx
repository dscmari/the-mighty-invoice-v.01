import prisma from "../../../lib/prisma";

type Customer = {
  id: number;
  name: string;
  address: string;
  mail: string;
};

export default async function Page() {
  const customers = await prisma.customer.findMany();
  console.log(customers);
  return (
    <div>
      <h1 className="m-4">Customer History</h1>
      <div className="flex flex-col gap-4 m-4">
        {customers.map((user) => (
          <ol key={user.id} className="bg-slate-100 p-4">
            <li className="mb-2">Id: {user.id}</li>
            <li className="mb-2">Name: {user.name}</li>
            <li className="mb-2">Adresse: {user.address}</li>
            <li className="mb-2">Mail: {user.mail}</li>
          </ol>
        ))}
      </div>
    </div>
  );
}
