import Link from "next/link";

export default function Home() {
  return (
    <div className="bodyHome">
      <div className="flex items-center justify-center">
        <h1 className="py-12 text-2xl font-bold text-white">Dashboard</h1>
      </div>

      <div className="ml-8">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <Link href="/phonebook">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Phone Book
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are all of the my contacts.
          </p>
        </div>
      </div>
    </div>
  );
}
