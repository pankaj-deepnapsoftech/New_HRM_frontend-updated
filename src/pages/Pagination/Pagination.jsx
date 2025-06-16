import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ page, setPage, hasNextPage }) => {
   
    return (
        <div className="flex justify-center items-center gap-6 mt-8">
            <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                    ${page === 1
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-sky-500 text-white border-none hover:from-blue-600 hover:to-sky-600"}
                      
          `}
            >
                <FaArrowLeft />
                Prev
            </button>

            <span className="px-4 py-1 text-sm text-gray-700 bg-gray-100 rounded-full font-semibold shadow-sm">
                Page {page}
            </span>

            <button
                onClick={() => setPage(page + 1)}
                disabled={!hasNextPage}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200
                    ${!hasNextPage
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-sky-500 text-white border-none hover:from-blue-600 hover:to-sky-600"}
                      
          `}
            >
                Next
                <FaArrowRight />
            </button>
      </div>
    );
};

export default Pagination;
