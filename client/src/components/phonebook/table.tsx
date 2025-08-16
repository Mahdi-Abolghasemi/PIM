import React, { useState } from "react";
import { Contact_service } from "@/services/phonebook/contact_service";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Link from "next/link";

type TableProps = {
  dataSource: any[];
  columns: any[];
  deleteCallBack: (id: number) => void;
};

export default function Table({
  dataSource,
  columns,
  deleteCallBack,
}: TableProps) {
  const [objContact, setobjContact] = useState(new Contact_service());

  function deleteData(id: number): void {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            if (objContact.Delete(id)) deleteCallBack(id);
          },
        },
        {
          label: "No",
        },
      ],
    });
  }

  return (
    <div className="ml-3 mr-3 mx-auto">
      <table className="w-full text-left border-collapse border border-gray-400">
        <caption className="bg-blue-500 text-white text-center h4 p-2 text-xl font-bold">
          Contacts
        </caption>
        <thead className="border-b-2 size-8">
          <tr>
            {columns.map((i) => (
              <th className="border border-gray-300 pl-1">{i}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((i) => (
            <tr
              className={`size-12 ${
                i.id % 2 == 1 ? "bg-gray-100" : "bg-white"
              }`}
            >
              <td className="border border-gray-300 pl-1">{i.firstName}</td>
              <td className="border border-gray-300 pl-1">{i.lastName}</td>
              <td>
                <Link
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded m-2"
                  href={{
                    pathname: "/phonebook/details",
                    query: { id: i.id },
                  }}
                  as={"/phonebook/details"}
                >
                  Details
                </Link>
                <Link
                  className="bg-yellow-400 hover:bg-yellow-500 text-black py-2.5 px-2 rounded"
                  href={{
                    pathname: "/phonebook/addOrEdit",
                    query: { id: i.id },
                  }}
                  as="/phonebook/addOrEdit"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded ml-2"
                  onClick={() => deleteData(i.id)}
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
            query: { id: 0 },
          }}
          as="/phonebook/addOrEdit"
        >
          Add
        </Link>
      </div>
    </div>
  );
}
