import { useGetEmployeeDocumentDetailsQuery } from '@/service/Employee.services'
import React, { useEffect } from 'react'

const UserDocument = () => {
  const { data: GetEmpDocument } = useGetEmployeeDocumentDetailsQuery()

  useEffect(() => {

  }, [])
  return (
    <div className="mt-10 bg-gray-50 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full max-w-3xl bg-gradient-to-r from-gray-300 to-gray-400 rounded-xl shadow-lg text-gray-600 py-5 px-6 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">Employee Document</h1>
      </div>

      {/* No Document Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center w-full max-w-xl">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-200 mb-6">
          <FaFileAlt className="text-gray-400 text-4xl" />
        </div>
        <p className="text-center text-xl md:text-2xl font-semibold text-gray-700 mb-2">
          Document Not Added
        </p>
        <p className="text-center text-gray-500 text-sm md:text-base">
          No documents have been uploaded yet. Please add documents to keep your records updated.
        </p>
      </div>
    </div>
  );
};

export default UserDocument;
