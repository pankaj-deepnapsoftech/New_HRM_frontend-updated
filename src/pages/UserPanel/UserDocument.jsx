import { useGetEmployeeDocumentDetailsQuery } from '@/service/Employee.services'
import React, { useEffect } from 'react'

const UserDocument = () => {
  const { data: GetEmpDocument } = useGetEmployeeDocumentDetailsQuery()

  useEffect(() => {

  }, [])
  return (
    <div className='min-h-screen bg-gray-100 p-10'>
      <div className="bg-gray-400 rounded-xl shadow-md text-white py-4 px-6 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-wide">Employee Document</h1>
      </div>
      <p className="text-center text-xl font-semibold"> Document Not Added</p>
    </div>
  )
}
export default UserDocument