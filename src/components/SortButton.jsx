import React, { useState } from "react";

const SortButton = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSort = (column, direction) => {
    onSort(column, direction);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 
          transition-colors duration-300 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Sort Table</span>
        <i className="fas fa-sort"></i>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg py-2 z-10">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-300"
            onClick={() => handleSort("name", "asc")}
          >
            Sort by Name <i className="fas fa-sort-alpha-down ml-2"></i>
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-300"
            onClick={() => handleSort("name", "desc")}
          >
            Sort by Name <i className="fas fa-sort-alpha-up ml-2"></i>
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-300"
            onClick={() => handleSort("country", "asc")}
          >
            Sort by Country <i className="fas fa-sort-alpha-down ml-2"></i>
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-300"
            onClick={() => handleSort("country", "desc")}
          >
            Sort by Country <i className="fas fa-sort-alpha-up ml-2"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default SortButton;
