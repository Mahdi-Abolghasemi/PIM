import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import Link from "next/link";
import { contact_type } from "@/types/phonebook/contacts_type";

type TableProps = {
  dataSource: contact_type[];
  columns: string[];
  deleteCallBack: (id: string) => void;
};

export default function Table({
  dataSource,
  columns,
  deleteCallBack,
}: TableProps) {
  return (
    <div className="ml-3 mr-3 mx-auto">
      <table className="w-full text-left border-collapse border border-gray-400">
        <caption className="bg-blue-500 text-white text-center h4 p-2 text-xl font-bold">
          Contacts
        </caption>
        <thead className="border-b-2 size-8">
          <tr>
            {columns.map((value, index) => (
              <th className="border border-gray-300 pl-1" key={index}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((value, index) => (
            <tr
              className={`size-12 ${
                index % 2 == 1 ? "bg-gray-100" : "bg-white"
              }`}
              key={index}
            >
              <td className="border border-gray-300 pl-1">{value.firstName}</td>
              <td className="border border-gray-300 pl-1">{value.lastName}</td>
              <td>
                <Link
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded m-2"
                  href={{
                    pathname: "/phonebook/details",
                    query: { id: value.id },
                  }}
                  as={"/phonebook/details"}
                >
                  Details
                </Link>
                <Link
                  className="bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 px-2 rounded"
                  href={{
                    pathname: "/phonebook/addOrEdit",
                    query: { id: value.id },
                  }}
                  as="/phonebook/addOrEdit"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded ml-2"
                  onClick={() => deleteCallBack(value.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <Link
          className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-2 rounded mr-2"
          href={{
            pathname: "/phonebook/addOrEdit",
            query: { id: "" },
          }}
          as="/phonebook/addOrEdit"
        >
          Add
        </Link>
        <Link
          className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded mr-2"
          href="/dashboard"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
