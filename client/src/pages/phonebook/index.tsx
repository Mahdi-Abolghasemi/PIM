import React, { useState } from "react";
import { Contact_service } from "@/services/phonebook/contact_service";
import Table from "@/components/phonebook/table";
import Search from "@/components/phonebook/search";
import PaginationControls from "@/components/phonebook/paginationControls";

export default function Main() {
  const [objContact, setobjContact] = useState(new Contact_service());
  const [objData, setData] = useState(objContact.GetAll());
  const [allData, setAllData] = useState(objData);
  const fields = ["First Name", "Last Name"];
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const pageSizes: number[] = [5, 10, 25, 100];
  const [sort, setSort] = useState("First Name");
  const [offset, setOffset] = useState(0);

  const sliceData = (): any[] => {
    return allData.slice(offset, offset + perPage);
  };

  const deleteData = (id: number): void => {
    setData(objData.filter((i) => i.id !== id));
    setAllData(allData.filter((i) => i.id !== id));
  };

  const search = (name: string, details: string): void => {
    if (name !== "") {
      setAllData(
        objData.filter((i) => i.firstName.concat(" ", i.lastName).match(name))
      );
      setOffset(0);
      setCurrentPage(1);
    } else if (details !== "") {
      let contatId = [0];
      objData.map((i) =>
        i.details.map((j) =>
          j.value === details ? contatId.push(j.contactId) : 0
        )
      );

      setAllData(objData.filter((i) => contatId.includes(i.id)));
      setOffset(0);
      setCurrentPage(1);
    } else {
      setAllData(objData);
      setOffset(0);
      setCurrentPage(1);
    }
  };

  const getPageCount = (): number => {
    return Math.ceil(allData.length / perPage);
  };

  const setPageSize = (value: number): void => {
    setPerPage(value);
  };

  const sortData = (value: string): void => {
    setSort(value);
    compar();
  };

  const compar = (): void => {
    if (sort === "First Name") {
      setAllData(
        allData.sort((a, b) =>
          a.firstName < b.firstName ? 1 : b.firstName < a.firstName ? -1 : 0
        )
      );
    }

    if (sort === "Last Name") {
      setAllData(
        allData.sort((a, b) =>
          a.lastName < b.lastName ? 1 : b.lastName < a.lastName ? -1 : 0
        )
      );
    }
  };

  const selectedPage = (value: number): void => {
    setOffset((value - 1) * perPage);
    setCurrentPage(value);
  };

  return (
    <div>
      <Search searchCallBack={search} />
      <Table
        dataSource={sliceData()}
        columns={fields}
        deleteCallBack={deleteData}
      />
      <PaginationControls
        keys={["First Name", "Last Name"]}
        currentPage={currentPage}
        pageCount={getPageCount()}
        pageSizes={pageSizes}
        sortCallBack={sortData}
        pageSizeCallBack={setPageSize}
        selectedPageCallBack={selectedPage}
      />
    </div>
  );
}
