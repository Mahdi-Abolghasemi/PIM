import React, { Fragment } from "react";

type PaginationButtonsProps = {
  currentPage: number;
  pageCount: number;
  selectedPageCallBack: (value: number) => void;
};

export default function PaginationButtons({
  currentPage,
  pageCount,
  selectedPageCallBack,
}: PaginationButtonsProps) {
  const getPageNumbers = () => {
    if (pageCount < 4) {
      return [...Array(pageCount + 1).keys()].slice(1);
    } else if (currentPage <= 4) {
      return [1, 2, 3, 4, 5];
    } else if (currentPage > pageCount - 4) {
      return [...Array(5).keys()].reverse().map((v) => pageCount - v);
    } else {
      return [currentPage - 1, currentPage, currentPage + 1];
    }
  };

  return (
    <Fragment>
      <button
        onClick={() => selectedPageCallBack(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded m-2 mx-1"
      >
        Previous
      </button>
      {currentPage > 4 && (
        <Fragment>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded m-2 mx-1"
            onClick={() => selectedPageCallBack(1)}
          >
            1
          </button>
          <span className="h4">...</span>
        </Fragment>
      )}
      {getPageNumbers().map((num) => (
        <button
          className={`mx-1 ${
            num === currentPage
              ? "bg-blue-500 hover:bg-blue-600 text-white py-2.5 px-2 rounded"
              : "bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded m-2"
          }`}
          onClick={() => selectedPageCallBack(num)}
          key={num}
        >
          {num}
        </button>
      ))}
      {currentPage <= pageCount - 4 && (
        <Fragment>
          <span className="h4">...</span>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded mx-1"
            onClick={() => selectedPageCallBack(pageCount)}
          >
            {pageCount}
          </button>
        </Fragment>
      )}
      <button
        onClick={() => selectedPageCallBack(currentPage + 1)}
        disabled={currentPage === pageCount}
        className="bg-gray-500 hover:bg-gray-600 text-white py-2.5 px-2 rounded mx-1"
      >
        Next
      </button>
    </Fragment>
  );
}
