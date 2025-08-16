import React, { useState } from "react";

type searchProps = {
  searchCallBack: (name: string, details: string) => void;
};

export default function Search({ searchCallBack }: searchProps) {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const setValues = (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "details":
        setDetails(event.target.value);
        break;
    }
  };

  return (
    <div className="ml-3 mr-3 mx-auto p-4">
      <form className="flex">
        <div className="m-2">
          <label>Name:</label>
          <input
            className="mt-2 shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            onChange={setValues}
            type="text"
            placeholder="Enter Name"
            aria-label="Name"
          />
        </div>
        <div className="m-2">
          <label>Details:</label>
          <input
            className="mt-2 shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="details"
            onChange={setValues}
            type="text"
            placeholder="Enter Details"
            aria-label="Details"
          />
        </div>
      </form>
      <div className="m-2">
        <button
          className="bg-outline border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-2.5 px-2 rounded mr-2"
          aria-label="Search"
          onClick={() => searchCallBack(name, details)}
        >
          Search
        </button>
      </div>
      <hr className="border border-gray-400" />
    </div>
  );
}
