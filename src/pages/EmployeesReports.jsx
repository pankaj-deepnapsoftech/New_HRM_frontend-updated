import React, { useEffect, useRef, useState } from "react";
import { useGetAllEmpDataQuery } from "@/service/EmpData.services";
import * as XLSX from "xlsx";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from "react-toastify";
import Pagination from "./Pagination/Pagination";
mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}`;
const EmployeesReports = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data: data } = useGetAllEmpDataQuery({ page, limit });
  const employees = data?.data || [];
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapData] = useState({
    lng: 0,
    lat: 0,
    place: "",
  });

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (showMap && mapContainer.current && mapData.lng && mapData.lat) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [mapData.lng, mapData.lat],
        zoom: 12,
      });

      new mapboxgl.Marker()
        .setLngLat([mapData.lng, mapData.lat])
        .addTo(map.current);

      return () => map.current?.remove();
    }
  }, [showMap, mapData]);
  const handleLocationClick = async (location) => {
    try {
      const query = encodeURIComponent(location);
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data?.features?.length > 0) {
        const [lng, lat] = data.features[0].center;
        setMapData({ lng, lat, place: location });
        setShowMap(true);
      } else {
        toast("Location not found on map.");
      }
    } catch (error) {
      console.error("Error fetching map data:", error);
    }
  };

  const handleExport = () => {
    const exportData = employees.map((emp) => ({
      Name: emp.fname || "NA",
      Location: emp.location || "NA",
      Department: emp.department || "NA",
      Designation: emp.designation || "NA",
      Salary: emp.salary ? emp.salary.toLocaleString() : "NA",
      Assets:
        emp.assets && emp.assets.length > 0 ? emp.assets.join(", ") : "NA",
      PresentDays: emp.attendance ? emp.attendance.length : "NA",
      GatePass: emp.gatePassRequests ? emp.gatePassRequests.length : "NA",
      Status: emp.Empstatus || "NA",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Report");

    XLSX.writeFile(workbook, "Employee_Report.xlsx");
  };

  console.log(data);

  return (
    <div className="p-2 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text text-center mx-4 md:mx-10 py-4 my-6 rounded-md shadow-md shadow-gray-400">
        <h2 className="text-xl font-[500]">Employees Report</h2>
      </div>
      <div className="flex justify-end mr-10 mb-4">
        <button
          onClick={handleExport}
          className="bg-gradient-to-br from-slate-400 to bg-slate-600 cursor-pointer hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200"
        >
          EXPORT
        </button>
      </div>
      <div className="overflow-x-scroll scrollbar-visible rounded-t-sm md:rounded-t-xl shadow-md mx-4 md:mx-6 mb-8">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 whitespace-nowrap text-gray-700 text-left">
              <th className="font-[600] py-4 px-4">Name</th>
              <th className="font-[600] py-4 px-4">Location</th>
              <th className="font-[600] py-4 px-4">Department</th>
              <th className="font-[600] py-4 px-4">Designation</th>
              <th className="font-[600] py-4 px-4">Salary</th>
              <th className="font-[600] py-4 px-4">Assets</th>
              <th className="font-[600] py-4 px-2">Present Days</th>
              <th className="font-[600] py-4 px-4">Gate Pass</th>
              <th className="font-[600] py-4 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="whitespace-nowrap">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-6 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              employees.map((emp, index) => (
                <tr
                  key={emp._id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-3 px-3">{emp.fname || "NA"}</td>
                  <td
                    className="p-2 px-3 text-blue-600 hover:underline cursor-pointer"
                    onClick={() => handleLocationClick(emp.location)}
                  >
                    {emp.location || "NA"}
                  </td>
                  <td className="py-3 px-4 capitalize">
                    {emp.department || "NA"}
                  </td>
                  <td className="py-3 px-4 capitalize">
                    {emp.designation || "NA"}
                  </td>
                  <td className="py-3 px-4">
                    {emp.salary ? emp.salary : "NA"}
                  </td>
                  <td className=" py-3 px-4">
                    <div className="flex gap-2 flex-wrap">
                      {emp.assets?.length > 0 ? (
                        emp.assets.map((asset, i) => (
                          <span
                            key={i}
                            className="bg-blue-100 text-blue-700 text-xs px-2 py-2 rounded-full"
                          >
                            {asset}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {emp.attendance ? emp.attendance.length : "NA"}
                  </td>
                  <td className="py-3 px-4">
                    {emp.gatePassRequests ? emp.gatePassRequests.length : "NA"}
                  </td>
                  <td
                    className={`my-5 py-4 px-4 font-semibold text-sm rounded-full h-8 flex items-center justify-center w-fit ${
                      emp.Empstatus === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {emp.Empstatus || "NA"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
          <div className="relative bg-white p-4 rounded-lg w-[90%] max-w-3xl shadow-xl transform transition-transform duration-300 animate-scaleIn">
            <h3 className="text-lg font-semibold mb-2">
              Location: {mapData.place}
            </h3>
            <div
              ref={mapContainer}
              className="w-full h-96 rounded-lg overflow-hidden shadow-inner"
            />
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-all duration-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease forwards;
        }
      `}</style>

      <Pagination
        page={page}
        setPage={setPage}
        hasNextPage={employees?.length === 10}
      />
    </div>
  );
};

export default EmployeesReports;
