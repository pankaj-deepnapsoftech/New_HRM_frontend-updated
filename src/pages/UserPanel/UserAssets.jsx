import { useLogedInuserQuery } from "@/service/Auth.services";
import { useGetassetByidQuery } from "@/service/EmpData.services";
import { FaBoxOpen } from "react-icons/fa";

const UserAssets = () => {
  const { data: userData } = useLogedInuserQuery();
  const userDataId = userData?.data?._id;
  const { data: assetData } = useGetassetByidQuery(userDataId);

  const employee = assetData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-6 md:p-10">
      {/* Header */}
      <div className="w-full max-w-3xl mx-auto bg-gradient-to-r from-gray-400 to-gray-500 text-white py-6 px-8 rounded-xl shadow-xl text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-md">
           Employee Assets
        </h1>
        {employee && (
          <p className="text-lg mt-2 font-medium">
            Assigned to: <span className="font-semibold">{employee.fname}</span> ({employee.empCode})
          </p>
        )}
      </div>

      {/* Asset Card */}
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-10 transition-transform hover:scale-[1.01] duration-300 ease-in-out">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mx-auto mb-6 shadow-inner">
          <FaBoxOpen className="text-gray-600 text-4xl" />
        </div>

        {employee?.assets?.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Your Assigned Assets
            </h2>
            <ul className="space-y-3 px-6 md:px-10">
              {employee.assets.map((asset, index) => (
                <li
                  key={index}
                  className="text-lg text-gray-700 bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition"
                >
                  ✅ {asset}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              No assets assigned yet
            </h2>
            <p className="text-gray-500 text-base">
              You currently have no company-assigned assets. Please check back later or contact admin if needed.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAssets;
