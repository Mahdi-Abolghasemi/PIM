import React, { useState } from "react";
import { useRouter } from "next/router";
import { Contact_service } from "@/services/phonebook/contact_service";
import Link from "next/link";

export default function Details() {
  const router = useRouter();
  const [id, setId] = useState(Number(router.query.id));
  const [objContact, setobjContact] = useState(new Contact_service());
  const [item, setItem] = useState(objContact.Get(id));

  return (
    <div>
      <div>
        <table className="w-full text-left border-collapse border border-gray-400">
          <caption className="bg-blue-500 text-white text-center h4 p-2 text-xl font-bold">
            Details Contact
          </caption>
          <thead className="border-b-2 size-8">
            <tr className="grid grid-cols-2">
              <th className="border border-gray-300 pl-1 py-2">Title</th>
              <th className="border border-gray-300 pl-1 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid grid-cols-2 bg-gray-100">
              <td className="border border-gray-300 pl-1 py-2.5">First Name</td>
              <td className="border border-gray-300 pl-1 font-bold">
                {item?.firstName}
              </td>
            </tr>
            <tr className="grid grid-cols-2 bg-white">
              <td className="border border-gray-300 pl-1 py-2.5">Last Name</td>
              <td className="border border-gray-300 pl-1 font-bold">
                {item?.lastName}
              </td>
            </tr>
            {item?.details.map((i) => (
              <tr
                className={`grid grid-cols-2 ${
                  i.id % 2 == 1 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <td className="border border-gray-300 pl-1 py-2.5">
                  {i.contactType}
                </td>
                <td className="border border-gray-300 pl-1 font-bold">
                  {i.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        <Link
          className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded"
          href="/phonebook"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
