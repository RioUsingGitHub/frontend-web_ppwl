import React from "react";

const Table = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
              Country
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
              ID
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4">{row.name}</td>
              <td className="px-6 py-4">{row.country}</td>
              <td className="px-6 py-4">{row.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
