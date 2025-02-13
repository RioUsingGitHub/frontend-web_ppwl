import React from "react";

const MenuItem = ({ icon, text, color, isActive, isOpen, onClick }) => {
  return (
    <li
      className={`list-item relative cursor-pointer transition-all duration-300 px-4 py-3
        ${isActive ? "transform translate-x-2" : ""}`}
      onClick={onClick}
      style={{ "--color": color }}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300
            ${isActive ? "text-white" : "text-gray-600"}`}
          style={{ backgroundColor: isActive ? color : "transparent" }}
        >
          <i className={`fas fa-${icon} text-xl`}></i>
        </div>
        <span
          className={`text-gray-700 whitespace-nowrap transition-all duration-300
            ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        >
          {text}
        </span>
      </div>
      {isActive && (
        <div className="absolute inset-0 bg-gray-50 rounded-xl -z-10"></div>
      )}
    </li>
  );
};

export default MenuItem;
