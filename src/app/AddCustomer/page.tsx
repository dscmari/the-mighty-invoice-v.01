"use client";
import Link from "next/link";
import { useState } from "react";

type Customer = {
  name: string;
  address: string;
  mail: string;
};

export default function Page() {
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    address: "",
    mail: "",
  });

  const fields: Array<keyof Customer> = ["name", "address", "mail"];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      if (!res.ok) {
        const error = await res.json();
        alert(new Error(error.message || "Failed to add customer on server."));
        throw new Error(error.message || "Failed to add customer on server.");
      } else {
        alert(`Kunde ${customer.name} wurde hinzugefügt`);
      }
      setCustomer({ name: "", address: "", mail: "" });
    } catch (error) {
      console.log("POST request failed: ", error);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    if (typeof str !== "string" || str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <h1>Kunde hinzufügen</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 flex flex-col gap-4 max-w-90"
      >
        {fields.map((field) => (
          <div key={field} className="flex">
            <label htmlFor={field} className="w-30">
              {capitalizeFirstLetter(field)}:{" "}
            </label>
            <input
              type={field === "mail" ? "email" : "text"}
              id={field}
              placeholder={capitalizeFirstLetter(field)}
              value={customer[field]}
              onChange={(event) =>
                setCustomer({
                  ...customer,
                  [field]: event.target.value,
                })
              }
              className="bg-white p-2 rounded"
              required
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-white rounded py-2 px-4 w-1/3 m-auto cursor-pointer hover:shadow-md"
        >
          Hinzufügen
        </button>
      </form>
      <Link href={"/CustomerHistory"}>
        <div className="mt-20 py-2 px-4 underline">
          <p>CUSTOMER HISTORY</p>
        </div>
      </Link>
    </div>
  );
}
