import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col w-60 gap-4">
        <Link href={"/AddCustomer"}>
          <div className="py-2 px-4 flex gap-4 border-2 border-slate-100 rounded cursor-pointer hover:bg-green-500 hover:text-slate-100">
            <p>ADD CUSTOMER</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
        </Link>
        <Link href={"/DeleteCustomer"}>
          <div className="py-2 px-4 flex gap-4 border-2 border-slate-100 rounded cursor-pointer hover:bg-red-500 hover:text-slate-100">
            <p>DELETE CUSTOMER</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </div>
        </Link>
        <Link href={"/CustomerHistory"}>
          <div className="py-2 px-4 underline">
            <p>CUSTOMER HISTORY</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
