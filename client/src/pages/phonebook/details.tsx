import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Contact_service } from "@/services/phonebook/contact_service";
import Link from "next/link";
import { contact_type } from "@/types/phonebook/contacts_type";
import { contactType_enum } from "@/enumerations/phonebook/contactType_enum";

export default function Details() {
  const router = useRouter();
  const id: string = String(router.query.id);
  const objContact: Contact_service = new Contact_service();

  const [item, setItem] = useState<contact_type>();

  useEffect(() => {
    objContact.Get(id).then((res) => setItem(res));
  }, []);

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
            {item?.details.map((value, index) => (
              <tr
                className={`grid grid-cols-2 ${
                  index % 2 == 1 ? "bg-gray-100" : "bg-white"
                }`}
                key={index}
              >
                <td className="border border-gray-300 pl-1 py-2.5">
                  {
                    Object.keys(contactType_enum)[
                      Object.values(contactType_enum).indexOf(value.contactType)
                    ]
                  }
                </td>
                <td className="border border-gray-300 pl-1 font-bold">
                  {value.value}
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
