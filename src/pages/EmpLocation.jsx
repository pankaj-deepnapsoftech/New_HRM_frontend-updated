import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGetAllEmpDataQuery } from "@/service/EmpData.services";
import { toast } from "react-toastify";
import Pagination from "./Pagination/Pagination";

// Fix default markers icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const EmpLocation = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data } = useGetAllEmpDataQuery({ page, limit });
  const EmpLocation = data?.data || [];

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
      // Initialize Leaflet map
      map.current = L.map(mapContainer.current).setView(
        [mapData.lat, mapData.lng],
        12
      );

      // Add OpenStreetMap tile layer (completely free, no API key needed)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map.current);

      // Add marker with popup for the location
      L.marker([mapData.lat, mapData.lng])
        .addTo(map.current)
        .bindPopup(`<b>${mapData.place}</b>`)
        .openPopup();

      // Add default controls: zoom, scale, fullscreen (if supported)
      L.control.zoom({ position: "topright" }).addTo(map.current);
      L.control.scale().addTo(map.current);

      return () => {
        if (map.current) {
          map.current.remove();
        }
      };
    }
  }, [showMap, mapData]);

  const handleLocationClick = async (location) => {
    if (!location || location === "NA") {
      toast("No location available for this employee.");
      return;
    }

    try {
      // Use OpenStreetMap Nominatim API for geocoding (free, no API key, rate-limited but suitable for this use case)
      const query = encodeURIComponent(location);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1&addressdetails=1`
      );
      const results = await response.json();

      if (results.length > 0) {
        const { lat, lon } = results[0];
        setMapData({
          lng: parseFloat(lon),
          lat: parseFloat(lat),
          place: location,
        });
        setShowMap(true);
      } else {
        toast("Location not found on map. Please check the spelling.");
      }
    } catch (error) {
      console.error("Error fetching map data:", error);
      toast("Error loading map. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md max-w-5xl mx-auto mt-10">
      <div className="bg-gray-300 text-gray-600 text-center py-4 mx-2 md:mx-10 mb-10 rounded-xl shadow-md shadow-gray-400">
        <h2 className="text-xl font-bold">Employee Location</h2>
      </div>

      <div className="overflow-x-scroll scrollbar-visible rounded-t-xl shadow-md mx-2 md:mx-10 mb-8">
        <table className="w-3xl md:min-w-full shadow-lg border border-gray-200 text-sm">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4 text-left">Full Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-left">Designation</th>
              <th className="p-2 text-left">Emp-Code</th>
            </tr>
          </thead>
          <tbody>
            {EmpLocation?.map((emp, idx) => (
              <tr
                key={idx}
                className={`border-t border-gray-200 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
              >
                <td className="p-2 px-3">{emp.fname || "NA"}</td>
                <td className="p-2 px-3">{emp.email || "NA"}</td>
                <td
                  className="p-2 px-3 text-blue-600 hover:underline cursor-pointer"
                  onClick={() => handleLocationClick(emp.location)}
                >
                  {emp.location || "NA"}
                </td>
                <td className="p-2 px-3">{emp.department || "NA"}</td>
                <td className="p-2 px-3">{emp.designation || "NA"}</td>
                <td className="p-2 px-3">{emp.empCode || "NA"}</td>
              </tr>
            ))}
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
        hasNextPage={EmpLocation.length === 10}
      />
    </div>
  );
};

export default EmpLocation;
