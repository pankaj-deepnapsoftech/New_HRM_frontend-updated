import React, { useState } from "react";

const initialEmployees = [
  {
    name: "Nitish",
    dept: "IT",
    designation: "Developer",
    assets: ["Bike", "keyboard"],
    selectedAsset: "",
  },
  {
    name: "abhi",
    dept: "IT",
    designation: "Manager",
    assets: [],
    selectedAsset: "",
  },
  {
    name: "komal",
    dept: "sale",
    designation: "manager",
    assets: ["Laptop"],
    selectedAsset: "",
  },
  {
    name: "Deepak",
    dept: "Sales",
    designation: "Boss",
    assets: [],
    selectedAsset: "",
  },
];

const assetOptions = ["Laptop", "Bike", "Mobile", "Headset"];

const AssignAssets = () => {
  const [employees, setEmployees] = useState(initialEmployees);

  const handleAssetChange = (index, value) => {
    const updated = [...employees];
    updated[index].selectedAsset = value;
    setEmployees(updated);
  };

  const handleAddAsset = (index) => {
    const updated = [...employees];
    const selected = updated[index].selectedAsset;
    if (selected && !updated[index].assets.includes(selected)) {
      updated[index].assets.push(selected);
      updated[index].selectedAsset = "";
      setEmployees(updated);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden">
      <div className="bg-purple-600 text-white text-lg font-semibold text-center py-3">
        Assign Assets
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-t border-gray-500 text-sm">
          <thead className="bg-purple-300 text-gray-700 uppercase">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Added Assets</th>
              <th className="p-3 text-left">Assets</th>
              <th className="p-3 text-left">Add</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={index}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="p-3">{emp.name}</td>
                <td className="p-3">{emp.dept}</td>
                <td className="p-3">{emp.designation}</td>
                <td className="p-3 space-x-2">
                  {emp.assets.map((asset, i) => (
                    <span
                      key={i}
                      className="bg--100 text-blue-700 bg-blue-200 px-2 py-1 rounded-full text-xs"
                    >
                      {asset}
                    </span>
                  ))}
                </td>
                <td className="p-3">
                  <select
                    value={emp.selectedAsset}
                    onChange={(e) => handleAssetChange(index, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 appearance-none bg-white  pr-8 focus:outline-none"
                  >
                    <option value="">Assign or add assets</option>
                    {assetOptions.map((asset, i) => (
                      <option key={i} value={asset}>
                        {asset}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleAddAsset(index)}
                    className="bg-[#39D39F] text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    ADD
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignAssets;
