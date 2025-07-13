import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-xl font-semibold my-8">
        Welcome to The Mighty Invoice
      </h1>
      <p>What kind of invoice do you want to create?</p>
      <div className="flex gap-16 justify-center my-8 font-semibold">
        <Link
          href={"/Lessons"}
          className="px-4 py-2 bg-[#71b572] text-white rounded hover:shadow-lg"
        >
          PROGRAMMING LESSONS
        </Link>
        <Link
          href={"#"}
          className="px-4 py-2 bg-[#71b572] text-white rounded hover:shadow-lg cursor-not-allowed"
        >
          NAMASTE-WEBSITES
        </Link>
      </div>
    </div>
  );
}
