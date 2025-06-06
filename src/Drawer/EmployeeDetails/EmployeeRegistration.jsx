/* eslint-disable no-unused-vars */
import { useEmpAllMutation, useEpmUpdateDataMutation } from '@/service/Employee.services';
import EmpDetailsSchema from '@/Validation/EmployeeValidation/EmployeeDetailsValidations';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { IoIosClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const EmployeeForm = ({ showForm, setShowFrom, editTable }) => {
    const fileRefs = useRef({});

    const [EmpAllData, { isLoading }] = useEmpAllMutation();
    const [EpmUpdateData] = useEpmUpdateDataMutation()


    const {
        handleBlur, handleSubmit, handleChange, resetForm,
        touched, errors, values, setFieldValue
    } = useFormik({
        initialValues: editTable || {
            Designation: '', Department: '', Address: '', salary: '',
            photo: "", pancard: '', aadhaar: '', Driving_Licance: '', Voter_Id: '',
            UAN_number: '', Back_Name: '', Bank_Account: '', IFSC_Code: '', Bank_Proof: "",
        },
        validationSchema: EmpDetailsSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, value);
                });

                if (editTable) {
                   
                    await EpmUpdateData(values).unwrap();
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
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10 overflow-y-auto max-h-[90vh] relative border border-indigo-100">

                <button
                    className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 transition"
                    onClick={() => setShowFrom(false)}
                    aria-label="Close"
                >
                    <IoIosClose size={32} />
                </button>

                <h2 className="text-4xl font-bold text-center text-gray-700 mb-10">Employee Information Form</h2>

                <form onSubmit={handleSubmit} className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[

                            { label: 'Designation', name: 'Designation' },
                            { label: 'Department', name: 'Department' },
                            { label: 'Salary', name: 'salary', type: 'number' }
                        ].map(({ label, name, type = 'text' }) => (
                            <div key={name}>
                                <label className="block mb-1 font-medium text-gray-700">{label}</label>
                                <input
                                    type={type}
                                    name={name}
                                    value={values[name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
                                />
                                {touched[name] && errors[name] && (
                                    <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Address</label>
                        <textarea
                            name="Address"
                            rows="3"
                            value={values.Address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 shadow-sm"
                        />
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: 'Photo', name: 'photo' },
                            { label: 'Bank Proof (Cheque/Passbook)', name: 'Bank_Proof' },
                            { label: 'Aadhaar Number', name: 'aadhaar' },
                            { label: 'PAN Card', name: 'pancard' },
                            { label: 'Driving Licence', name: 'Driving_Licance' },
                            { label: 'Voter ID', name: 'Voter_Id' }
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
                                {touched[name] && errors[name] && (
                                    <p className="text-sm text-red-500 mt-1">{errors[name]}</p>
                                )}
                            </div>
                        ))}
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
