import React, { useState, useEffect } from "react";
import { Contact_service } from "@/services/phonebook/contact_service";
import Table from "@/components/phonebook/table";
import Search from "@/components/phonebook/search";
import PaginationControls from "@/components/phonebook/paginationControls";
import { contact_type } from "@/types/phonebook/contacts_type";
import { search_type } from "@/types/phonebook/search_type";

export default function Main() {
  const objContact: Contact_service = new Contact_service();
  const [allData, setAllData] = useState<contact_type[]>([]);
  const fields = ["First Name", "Last Name"];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(5);
  const pageSizes: number[] = [5, 10, 25, 100];
  const [sort, setSort] = useState<string>("First Name");
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    objContact.GetAll().then((res) => setAllData(res));
  }, []);

  const sliceData = (): contact_type[] => {
    return allData.slice(offset, offset + perPage);
  };

  const deleteData = (id: string): void => {
    objContact.Delete(id);
    setAllData(allData.filter((i) => i.id !== id));
  };

  const search = (name: string, details: string): void => {
    const searchData: search_type = { name, details };
    objContact.Search(searchData).then((res) => setAllData(res));
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
          a.firstName < b.firstName ? 1 : b.firstName < a.firstName ? -1 : 0,
        ),
      );
    }

    if (sort === "Last Name") {
      setAllData(
        allData.sort((a, b) =>
          a.lastName < b.lastName ? 1 : b.lastName < a.lastName ? -1 : 0,
        ),
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
