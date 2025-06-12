import Link from "next/link";
import AddCustomerForm from "../components/AddCustomerForm";
import DisplayAddedCustomer from "../components/DisplayAddedCustomer";

export default function Page() {
  return (
    <div>
      <div className="flex gap-8 flex-wrap">
        <AddCustomerForm />
        <DisplayAddedCustomer />
      </div>
      <Link href={"/CustomerHistory"}>
        <div className="mt-20 py-2 px-4 underline">
          <p>CUSTOMER HISTORY</p>
        </div>
      </Link>
    </div>
  );
}
