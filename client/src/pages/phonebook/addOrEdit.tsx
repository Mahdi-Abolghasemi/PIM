import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Contact_service } from "@/services/phonebook/contact_service";
import { contact_type, contactDetails } from "@/types/phonebook/contacts_type";
import { contactType_enum } from "@/enumerations/phonebook/contactType_enum";
import { v4 } from "uuid";

export default function AddOrEdit() {
  const router = useRouter();
  const pageTitle: string =
    router.query.id !== "" ? "Edit Contact" : "Create New Contact";
  const objContact: Contact_service = new Contact_service();

  const [formData, setFormData] = useState<contact_type>({
    id: "",
    firstName: "",
    lastName: "",
    details: [],
  });

  const [details, setDetails] = useState<contactDetails>({
    id: "",
    contactId: "",
    contactType: 0,
    value: "",
  });

  const [fieldValidations, setFieldValidations] = useState({
    firstName: true,
    lastName: true,
  });

  const [fieldValidationsDetails, setFieldValidationsDetails] = useState({
    type: true,
    value: true,
  });

  useEffect(() => {
    if (router.query.id !== "") {
      objContact.Get(String(router.query.id)).then((res) => setFormData(res));
    }
  }, []);

  const changeData = (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case "firstName":
        setFormData({ ...formData, firstName: event.target.value });
        break;
      case "lastName":
        setFormData({ ...formData, lastName: event.target.value });
        break;
      case "contactValue":
        setDetails({ ...details, value: event.target.value });
        break;
    }
  };

  const changeDataSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    switch (event.target.name) {
      case "contactType":
        setDetails({ ...details, contactType: Number(event.target.value) });
        break;
    }
  };

  const addDetails = (): void => {
    let error: number = 0;
    const _fieldValidationsDetails = {
      type: true,
      value: true,
    };

    if (details.contactType === 0) {
      _fieldValidationsDetails.type = false;
      error++;
    }

    if (details.value === "") {
      _fieldValidationsDetails.value = false;
      error++;
    }

    setFieldValidationsDetails(_fieldValidationsDetails);

    if (error === 0) {
      if (router.query.id !== "") {
        setDetails({
          ...details,
          id: v4(),
          contactId: String(router.query.id),
        });
        setFormData({
          ...formData,
          details: formData.details.concat(details),
        });
      } else {
        setFormData({
          ...formData,
          details: formData.details.concat(details),
        });
      }
    }
  };

  const deleteItem = (id: string): void => {
    setFormData({
      ...formData,
      details: formData.details.filter((i) => i.id !== id),
    });
  };

  const save = (): void => {
    let error: number = 0;
    const _fieldValidations = {
      firstName: true,
      lastName: true,
    };

    const _fieldValidationsDetails = {
      type: true,
      value: true,
    };

    if (formData.firstName === "") {
      _fieldValidations.firstName = false;
      error++;
    }

    if (formData.lastName === "") {
      _fieldValidations.lastName = false;
      error++;
    }

    if (formData.details.length === 0) {
      _fieldValidationsDetails.type = false;
      _fieldValidationsDetails.value = false;
      error++;
    }

    setFieldValidations(_fieldValidations);
    setFieldValidationsDetails(_fieldValidationsDetails);

    if (error === 0) {
      if (router.query.id !== "") {
        objContact.Edit(formData);
      } else {
        const id: string = v4();
        const contact: contact_type = formData;
        contact.id = id;
        contact.details.map((i) => ((i.id = v4()), (i.contactId = id)));
        setFormData(contact);
        objContact.Add(formData);
      }
      router.push("/phonebook");
    }
  };

  return (
    <div className="bodyContact">
      <div className="formContact">
        <div className="text-center h4 p-2">{pageTitle}</div>
        <hr />
        <form className="grid grid-cols-2 gap-4">
          <div className="mt-2">
            <label className="mb-2">First Name:</label>
            <input
              className={`mt-2 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                fieldValidations.firstName
                  ? "border border-gray-400 text-gray-700"
                  : "border-2 border-red-500 text-red-500"
              }`}
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={changeData}
              placeholder="Enter First Name"
              aria-label="First Name"
            />
            <p
              className="text-red-500 italic py-2 px-3 text-sm"
              style={{
                display: fieldValidations.firstName ? "none" : "inline",
              }}
            >
              Please fill out this field.
            </p>
          </div>
          <div className="mt-2">
            <label className="mb-2">Last Name:</label>
            <input
              className={`mt-2 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                fieldValidations.lastName
                  ? "border border-gray-400 text-gray-700"
                  : "border-2 border-red-500 text-red-500"
              }`}
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={changeData}
              placeholder="Enter Last Name"
              aria-label="Last Name"
            />
            <p
              className="text-red-500 italic py-2 px-3 text-sm"
              style={{
                display: fieldValidations.lastName ? "none" : "inline",
              }}
            >
              Please fill out this field.
            </p>
          </div>
          <div className="mt-2">
            <label className="mb-2">Contact Type:</label>
            <select
              className={`mt-2 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                fieldValidationsDetails.type
                  ? "border border-gray-400 text-gray-700"
                  : "border-2 border-red-500 text-red-500"
              }`}
              name="contactType"
              value={details.contactType}
              onChange={changeDataSelect}
              aria-label="Contact Type"
            >
              <option value=""></option>
              {Object.keys(contactType_enum).map((key, index) => (
                <option
                  value={
                    Object.values(contactType_enum)[
                      Object.keys(contactType_enum).indexOf(key)
                    ]
                  }
                  key={index}
                >
                  {key}
                </option>
              ))}
            </select>
            <p
              className="text-red-500 italic py-2 px-3 text-sm"
              style={{
                display: fieldValidationsDetails.type ? "none" : "inline",
              }}
            >
              Please select a item.
            </p>
          </div>
          <div className="mt-2">
            <label className="mb-2">Contact Value:</label>
            <input
              className={`mt-2 shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${
                fieldValidationsDetails.value
                  ? "border border-gray-400 text-gray-700"
                  : "border-2 border-red-500 text-red-500"
              }`}
              name="contactValue"
              type={
                details.contactType === contactType_enum.Email
                  ? "text"
                  : "number"
              }
              value={details.value}
              onChange={changeData}
              placeholder="Enter Contact Value"
              aria-label="Contact Value"
            />
            <p
              className="text-red-500 italic py-2 px-3 text-sm"
              style={{
                display: fieldValidationsDetails.value ? "none" : "inline",
              }}
            >
              Please fill out this field.
            </p>
          </div>
        </form>
        <div className="mt-2">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-2 rounded mr-2"
            aria-label="Add"
            onClick={addDetails}
          >
            Add
          </button>
        </div>
        <div className="mt-2 mb-2">
          <table className="w-full text-left border-collapse border border-gray-400">
            <caption className="bg-blue-500 text-white text-center h4 p-2 text-xl font-bold">
              Details Contact
            </caption>
            <thead className="border-b-2 size-8">
              <tr className="flex">
                <th className="border text-center border-gray-300 pl-1 py-2 w-3/5">
                  Type
                </th>
                <th className="border text-center border-gray-300 pl-1 py-2 w-3/5">
                  Value
                </th>
                <th className="border border-gray-300 w-1/5"></th>
              </tr>
            </thead>
            <tbody>
              {formData.details.map((item, index) => (
                <tr className="flex" key={index}>
                  <td className="text-center border border-gray-300 pl-1 py-2.5 w-3/5">
                    {
                      Object.keys(contactType_enum)[
                        Object.values(contactType_enum).indexOf(
                          item.contactType,
                        )
                      ]
                    }
                  </td>
                  <td className="text-center border border-gray-300 pl-1 py-2.5 w-3/5">
                    {item.value}
                  </td>
                  <td className="border border-gray-300 w-1/5 flex justify-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded m-2"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-2 rounded mr-2"
            aria-label="Save"
            onClick={() => save()}
          >
            Save
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded"
            aria-label="Cancel"
            onClick={() => router.push("/phonebook")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
