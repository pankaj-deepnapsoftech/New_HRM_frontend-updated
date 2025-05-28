import React, { useState } from "react";
import Select from "react-select";

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
const formattedAssetOptions = assetOptions.map((asset) => ({
  value: asset,
  label: asset,
}));

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.375rem",
    borderColor: state.isFocused ? "#8B5CF6" : "#D1D5DB",
    boxShadow: state.isFocused ? "0 0 0 2px rgba(139, 92, 246, 0.5)" : "none",
    fontSize: "0.875rem",
    "&:hover": {
      borderColor: "#8B5CF6",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#E9D5FF" // purple-200 for selected
      : state.isFocused
      ? "#F3E8FF" // purple-100 for hover
      : "white",
    color: "black",
    cursor: "pointer",
  }),
};

const AssignAssets = () => {
  const [employees, setEmployees] = useState(initialEmployees);

  const handleAssetChange = (index, selected) => {
    const updated = [...employees];
    updated[index].selectedAsset = selected ? selected.value : "";
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
    <div className="p-4 bg-gray-50 rounded shadow-md max-w-4xl mx-auto mt-10">
      <div className="bg-gray-300 text-gray-600 text-xl font-semibold text-center rounded-md py-3 shadow-md shadow-gray-400">
        Assets
      </div>
      <div className="overflow-x-auto scrollbar-visible mt-10 rounded-t-md shadow-md">
        <table className="w-2xl md:w-full border-gray-500 text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="p-2 py-3 text-left">Name</th>
              <th className="p-2 py-3 text-left">Department</th>
              <th className="p-2 py-3 text-left">Designation</th>
              <th className="p-2 py-3 text-left">Added Assets</th>
              <th className="p-2 py-3 text-left">Assets</th>
              <th className="p-2 py-3 text-left">Add</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={index}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                <td className="p-2">{emp.name}</td>
                <td className="p-2">{emp.dept}</td>
                <td className="p-2">{emp.designation}</td>
                <td className="p-2 space-x-2">
                  {emp.assets.map((asset, i) => (
                    <span
                      key={i}
                      className="text-blue-700 bg-blue-200 px-2 py-1 rounded-full text-xs"
                    >
                      {asset}
                    </span>
                  ))}
                </td>
                <td className="p-3">
                  <Select
                    options={formattedAssetOptions}
                    value={
                      emp.selectedAsset
                        ? { value: emp.selectedAsset, label: emp.selectedAsset }
                        : null
                    }
                    onChange={(selected) => handleAssetChange(index, selected)}
                    placeholder="Assign or add assets"
                    styles={{
                      ...customStyles,
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                    menuPosition="absolute"
                    isClearable
                  />
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleAddAsset(index)}
                    className="bg-gradient-to-br from-green-400 to-green-500 text-white px-4 py-1 rounded hover:bg-gradient-to-tl"
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
