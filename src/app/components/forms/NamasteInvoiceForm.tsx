"use client";
import React, { useEffect, useState } from "react";
import GenerateInvoiceButton from "../buttons/GenerateInvoiceButton";
import { generateInvoice } from "../../../../actions/generateInvoice";
import type { Customer } from "../../../utils/types";

type CustomerProps = {
  customers: Customer[];
};

export default function NamasteInvoiceForm({ customers }: CustomerProps) {
  const [rows, setRows] = useState([
    {
      position: 1,
      description: "",
      date: "",
      quantity: "0",
      price: "0",
      total: "0.00", // Example initial total
    },
  ]);

  const handleChange = (pos: number, field: string, value: any) => {
    setRows((prevRows) => {
      return prevRows.map((row) => {
        if (row.position === pos) {
          const updatedRow = { ...row, [field]: value };
          return updatedRow;
        } else return row;
      });
    });
  };

  const handleAddRow = () => {
    setRows((prevRows) => {
      const newPosition = prevRows[prevRows.length - 1].position + 1;
      return [
        ...prevRows,
        {
          position: newPosition,
          description: "",
          date: "",
          quantity: "0",
          price: "0",
          total: "0.00",
        },
      ];
    });
  };

  return (
    <form action={generateInvoice} className="m-4 flex flex-col items-center">
      <div className="">
        <div className="bg-slate-100 pl-2 py-4">
          <label htmlFor="customer-select" className="text-xl">
            Kunde:{" "}
          </label>
          <select
            id="customer-select"
            name="customerId"
            className="px-2 py-1 cursor-pointer text-xl font-semibold"
          >
            {customers.length === 0 && (
              <option value="">No customers available</option>
            )}
            {customers.map((customer: Customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <table className="p-20">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-2 font-medium">Position</th>
              <th className="p-2 font-medium">Beschreibung</th>
              <th className="p-2 font-medium">Datum</th>
              <th className="p-2 font-medium">Menge</th>
              <th className="p-2 font-medium">Preis</th>
              <th className="p-2 font-medium">Gesamt</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.position}>
                <td className="text-center border">{row.position}</td>
                <td className="text-right border">
                  <input
                    type="text"
                    placeholder="Beschreibung"
                    name="description"
                    className="w-full p-2 text-center"
                    value={row.description}
                    onChange={(e) =>
                      handleChange(row.position, "description", e.target.value)
                    }
                  />
                </td>
                <td className="text-center border">
                  <input
                    type="date"
                    name="date"
                    className="w-full p-2"
                    value={row.date}
                    onChange={(e) =>
                      handleChange(row.position, "date", e.target.value)
                    }
                  />
                </td>
                <td className="text-center border">
                  <input
                    type="number"
                    placeholder="0"
                    name="quantity"
                    className="w-20 text-center"
                    value={row.quantity}
                    onChange={(e) =>
                      handleChange(row.position, "quantity", e.target.value)
                    }
                  />
                </td>
                <td className="text-right border">
                  <input
                    type="text"
                    placeholder="0.00"
                    name="price"
                    className="w-20 text-center"
                    value={row.price}
                    onChange={(e) =>
                      handleChange(row.position, "price", e.target.value)
                    }
                  />
                </td>
                <td className="text-right border px-2">
                  {parseFloat(row.price) * parseInt(row.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={handleAddRow}
          className="bg-slate-100 rounded py-2 px-4 m-4 ml-0 cursor-pointer hover:bg-slate-300"
        >
          WEITERER POSTEN
        </button>
      </div>

      <div className="mt-8">
        <GenerateInvoiceButton />
      </div>
    </form>
  );
}
