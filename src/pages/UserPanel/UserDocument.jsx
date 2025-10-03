import { useLogedInuserQuery } from "@/service/Auth.services";
import { useGetEmployeeDocumentDetailsQuery } from "@/service/Employee.services";
import React from "react";

const UserDocument = () => {
  const { data: userData } = useLogedInuserQuery();
  const userId = userData?.data?._id;

  const { data: empDocument, isLoading } = useGetEmployeeDocumentDetailsQuery(
    userId,
    {
      skip: !userId,
    }
  );

  const empDoc = empDocument?.data;

  if (isLoading) {
    return <p className="text-center py-10 text-lg">Loading...</p>;
  }

  const DocCard = ({ title, value }) => (
    <div className="border rounded-lg p-4 flex justify-between shadow-sm bg-gray-50">
      <h3 className="font-semibold text-gray-600">{title}</h3>
      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          View Document
        </a>
      ) : (
        <p className="text-gray-500 italic">Not Uploaded</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="bg-gray-400 rounded-xl shadow-md text-white py-4 px-6 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-wide">Employee Documents</h1>
      </div>

      {!empDoc ? (
        <p className="text-center text-xl font-semibold">Document Not Added</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Document Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DocCard title="Aadhaar" value={empDoc?.aadhaar} />
            <DocCard title="Pancard" value={empDoc?.pancard} />
            <DocCard title="Driving License" value={empDoc?.Driving_Licance} />
            <DocCard title="Voter ID" value={empDoc?.Voter_Id} />
            <DocCard title="UAN Number" value={empDoc?.UAN_number} />
            <DocCard title="Bank Account" value={empDoc?.Bank_Account} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDocument;
