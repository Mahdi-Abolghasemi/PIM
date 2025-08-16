import React from "react";
import PaginationButtons from "@/components/phonebook/paginationButtons";

type PaginationControlsProps = {
  keys: string[];
  currentPage: number;
  pageCount: number;
  pageSizes: number[];
  sortCallBack: (value: string) => void;
  pageSizeCallBack: (value: number) => void;
  selectedPageCallBack: (value: number) => void;
};

export default function PaginationControls({
  keys,
  currentPage,
  pageCount,
  pageSizes,
  sortCallBack,
  pageSizeCallBack,
  selectedPageCallBack,
}: PaginationControlsProps) {
  const handlePageSizeChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    pageSizeCallBack(Number(ev.target.value));
  };

  const handleSortPropertyChange = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ) => {
    sortCallBack(ev.target.value);
  };

  return (
    <div className="m-2">
      <div className="text-center m-1">
        <PaginationButtons
          currentPage={currentPage}
          pageCount={pageCount}
          selectedPageCallBack={selectedPageCallBack}
        />
      </div>
      <div className="flex justify-center">
        <div className="m-1">
          <select
            className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border border-gray-400 text-gray-700"
            onChange={handlePageSizeChange}
          >
            {pageSizes.map((s) => (
              <option value={s} key={s}>
                {s} per page
              </option>
            ))}
          </select>
        </div>
        <div className="m-1">
          <select
            className="shadow appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline border border-gray-400 text-gray-700"
            onChange={handleSortPropertyChange}
          >
            {keys.map((k) => (
              <option value={k} key={k}>
                Sort By {k}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
