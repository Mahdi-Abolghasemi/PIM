import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Contact_service } from "@/services/phonebook/contact_service";
import { contactType_enum } from "@/enumerations/phonebook/contactType_enum";

export default function AddOrEdit() {
  const router = useRouter();
  const [id, setId] = useState(Number(router.query.id));
  const [pageTitle, setPageTitle] = useState(
    id > 0 ? "Edit Contact" : "Create New Contact"
  );
  const [objContact, setobjContact] = useState(new Contact_service());
  const [item, setItem] = useState(objContact.Get(id));
  const [formData, setFormData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    details: [{ id: 0, contactId: 0, contactType: "", value: "" }],
  });

  const [details, setDetails] = useState({
    id: 0,
    contactId: 0,
    contactType: "",
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
    if (item != null) {
      setFormData(item);
    } else {
      setFormData({ ...formData, details: [] });
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
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    switch (event.target.name) {
      case "contactType":
        setDetails({ ...details, contactType: event.target.value });
        break;
    }
  };

  const addDetails = (): void => {
    let error = 0;
    let _fieldValidationsDetails = {
      type: true,
      value: true,
    };

    if (details.contactType === "") {
      _fieldValidationsDetails.type = false;
      error++;
    }

    if (details.value === "") {
      _fieldValidationsDetails.value = false;
      error++;
    }

    setFieldValidationsDetails(_fieldValidationsDetails);

    if (error === 0) {
      const baseId =
        formData.details.length > 0
          ? formData.details[formData.details.length - 1].id
          : 0;
      let newId = baseId + 1;

      setDetails({ ...details, id: newId, contactId: formData.id });
      setFormData({
        ...formData,
        details: formData.details.concat(details),
      });
    }
  };

  const deleteItem = (id: number): void => {
    setFormData({
      ...formData,
      details: formData.details.filter((i) => i.id !== id),
    });
  };

  const save = (): void => {
    let error = 0;
    let _fieldValidations = {
      firstName: true,
      lastName: true,
    };

    let _fieldValidationsDetails = {
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
      if (id > 0) {
        objContact.Edit(formData);
      } else {
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
              {Object.values(contactType_enum).map((i) => (
                <option value={i}>{i}</option>
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
                details.contactType === contactType_enum.EMAIL
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
              {formData.details.map((i) => (
                <tr className="flex">
                  <td className="text-center border border-gray-300 pl-1 py-2.5 w-3/5">
                    {i.contactType}
                  </td>
                  <td className="text-center border border-gray-300 pl-1 py-2.5 w-3/5">
                    {i.value}
                  </td>
                  <td className="border border-gray-300 w-1/5 flex justify-center">
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-2 rounded m-2"
                      onClick={() => deleteItem(i.id)}
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
