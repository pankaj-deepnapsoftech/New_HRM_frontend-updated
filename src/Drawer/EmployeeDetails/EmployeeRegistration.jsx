/* eslint-disable no-unused-vars */
import { useGetAllEmpDataQuery, useGetAllEmpDataWithoutPaginatioQuery } from '@/service/EmpData.services';
import { useEmpAllMutation, useEpmUpdateDataMutation } from '@/service/Employee.services';
import EmpDetailsSchema from '@/Validation/EmployeeValidation/EmployeeDetailsValidations';
import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const EmployeeForm = ({ showForm, setShowFrom, editTable }) => {
    const fileRefs = useRef({});
    const [EmpAllData, { isLoading }] = useEmpAllMutation();
    const [EpmUpdateData] = useEpmUpdateDataMutation()
    const { data: EmpData } = useGetAllEmpDataWithoutPaginatioQuery()
 
    const {
        handleBlur, handleSubmit, handleChange, resetForm,setFieldValue,
        touched, errors, values
    } = useFormik({
        initialValues: { 
            photo: editTable?.photo || "", pancard: editTable?.pancard || '', aadhaar: editTable?.aadhaar || '', Driving_Licance: editTable?.Driving_Licance || '', Voter_Id: editTable?.Voter_Id || '',
            UAN_number: editTable?.UAN_number ||  '', Back_Name:editTable?.Back_Name ||  '', Bank_Account:editTable?.Bank_Account || '', IFSC_Code:editTable?.IFSC_Code || '', Bank_Proof:editTable?.Bank_Proof || "",
            education_proof: editTable?.education_proof || '', experience_letter: editTable?.experience_letter || '', previous_salary_slips: editTable?.previous_salary_slips || '', resignation_acceptance: editTable?.resignation_acceptance || '', Emp_id: editTable?.Emp_id?._id || '', 
        },
        validationSchema: EmpDetailsSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                // Build FormData, but only append file fields if a new File is selected
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    const isFileField = ['aadhaar','pancard','Driving_Licance','Voter_Id','Bank_Proof','photo','education_proof','experience_letter','previous_salary_slips','resignation_acceptance'].includes(key);
                    if (isFileField) {
                        if (value && typeof value !== 'string') {
                            formData.append(key, value);
                        }
                    } else {
                        formData.append(key, value ?? '');
                    }
                });

                if (editTable) {
                    
                    formData._id = values._id;
                    await EpmUpdateData(formData).unwrap();
                    toast.success("Employee updated successfully");
                } else {
                    const res = await EmpAllData(formData).unwrap();
                    toast.success(res?.message || "Employee registered successfully");
                }
                setShowFrom(false)
                resetForm();
                Object.keys(fileRefs.current).forEach((key) => {
                    if (fileRefs.current[key]) {
                        fileRefs.current[key].value = "";
                    }
                });
            } catch (error) {  
                console.log(error);
            }
        }
    });





    return (
        <section className={`${showForm ? "opacity-100 visible" : "opacity-0 invisible"} fixed inset-0 bg-black/40 flex items-start justify-center pt-10 transition-opacity duration-500 ease-in-out z-50`}>
           <div className="w-full max-w-xl bg-white rounded-sm shadow-xl p-10 overflow-y-auto max-h-[90vh] relative border border-indigo-100 custom-scrollbar">

                <button
                    className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
                    onClick={() => setShowFrom(false)}
                    aria-label="Close"
                >
                    <IoIosClose size={32}/>
                </button>

                <h2 className="text-2xl font-bold text-center text-gray-700 mb-10">Employee Information Form</h2>

                <form onSubmit={handleSubmit} className="space-y-8">


                    <select
                        id="Emp_id"
                        name="Emp_id"
                        value={values.Emp_id} 
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedEmp = EmpData?.data?.find(emp => emp._id === selectedId);

                            if (selectedEmp) {
                                setFieldValue("Emp_id", selectedEmp._id || "");
                                setFieldValue("_id", selectedEmp._id);
                            } else {
                                setFieldValue("Emp_id", "");
                                setFieldValue("_id", "");
                            }
                        }}
                        className="block w-full  px-4 py-3 text-md font-medium text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                        aria-label="Select Employee"
                    >
                        <option  className="text-gray-400">
                            Select a user
                        </option>
                        {EmpData?.data?.map((emp) => (
                            <option
                                key={emp._id}
                                value={emp._id}
                                className="hover:bg-indigo-100 "
                            >
                                {emp.fname}
                            </option>
                        ))} 
                    </select>


               


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            
                            { label: 'Bank Proof (Cheque/Passbook)', name: 'Bank_Proof' },
                            { label: 'Aadhaar Number', name: 'aadhaar' },
                            { label: 'PAN Card', name: 'pancard' },
                            { label: 'Driving Licence (Optional)', name: 'Driving_Licance' },
                            { label: 'Voter ID (Optional)', name: 'Voter_Id' },
                            { label: 'Education Proof (Optional)', name: 'education_proof' },
                            { label: 'Photo', name: 'photo' }
                        ].map(({ label, name }) => (
                            <div key={name}>
                                <label className="block mb-1 font-medium text-gray-700">{label}</label>
                                <input
                                    type="file"
                                    name={name}
                                    ref={(el) => (fileRefs.current[name] = el)}
                                    onChange={(event) => {
                                        setFieldValue(name, event.currentTarget.files[0]);
                                    }}
                                    onBlur={handleBlur}
                                    className="w-full border border-gray-300 p-2 rounded-md file:bg-indigo-100 file:text-indigo-700 file:px-4 file:py-1 file:rounded-md"
                                />
                                {editTable && typeof values[name] === 'string' && values[name] && (
                                    <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                                        <span>Current file:</span>
                                        <a
                                            href={values[name]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 underline"
                                        >
                                            View
                                        </a>
                                    </div>
                                )}
                                {touched[name] && errors[name] && (
                                    <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Others Section */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Others (Optional)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: 'Experience Letter (Optional)', name: 'experience_letter' },
                                { label: 'Previous Salary Slips (Optional)', name: 'previous_salary_slips' },
                                { label: 'Resignation Acceptance (Optional)', name: 'resignation_acceptance' }
                            ].map(({ label, name }) => (
                                <div key={name}>
                                    <label className="block mb-1 font-medium text-gray-700">{label}</label>
                                    <input
                                        type="file"
                                        name={name}
                                        ref={(el) => (fileRefs.current[name] = el)}
                                        onChange={(event) => {
                                            setFieldValue(name, event.currentTarget.files[0]);
                                        }}
                                        onBlur={handleBlur}
                                        className="w-full border border-gray-300 p-2 rounded-md file:bg-indigo-100 file:text-indigo-700 file:px-4 file:py-1 file:rounded-md"
                                    />
                                    {editTable && typeof values[name] === 'string' && values[name] && (
                                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                                            <span>Current file:</span>
                                            <a
                                                href={values[name]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 underline"
                                            >
                                                View
                                            </a>
                                        </div>
                                    )}
                                    {touched[name] && errors[name] && (
                                        <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">UAN Number</label>
                        <input
                            type="text"
                            name="UAN_number"
                            value={values.UAN_number}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
                        />
                        {touched.UAN_number && errors.UAN_number && (
                            <p className="text-sm text-red-500 mt-1">{errors.UAN_number}</p>
                        )}
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: 'Bank Name', name: 'Back_Name' },
                            { label: 'Bank Account Number', name: 'Bank_Account' },
                            { label: 'IFSC Code', name: 'IFSC_Code' }
                        ].map(({ label, name }) => (
                            <div key={name}>
                                <label className="block mb-1 font-medium text-gray-700">{label}</label>
                                <input
                                    type="text"
                                    name={name}
                                    value={values[name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
                                />
                                {touched[name] && errors[name] && (
                                    <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                                )}
                            </div>
                        ))}
                    </div>


                    <div className="text-center pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-2 rounded-xl text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50"
                        >
                            {isLoading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EmployeeForm;
