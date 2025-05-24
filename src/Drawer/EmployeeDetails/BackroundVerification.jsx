import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { MdVerifiedUser } from 'react-icons/md'

const BackroundVerification = ({ VerificationForm, setVerificationForm }) => {


    return (
        <section className={`${VerificationForm ? "flex" : "hidden"} h-screen w-full fixed top-0 left-0 bg-[#0000005b] backdrop-blur-sm justify-center items-center `}>
            <div>
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">

                    <div className="mb-10 text-end">
                        <button
                            className=" text-gray-800 hover:text-red-500 transition"
                            onClick={() => setVerificationForm(false)}
                            aria-label="Close"
                        >
                            <IoIosClose size={32} />
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800 flex justify-center items-center gap-2">
                            Background Verification
                            <MdVerifiedUser />
                        </h2>
                    </div>

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Aadhar Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Must be 10 digits"
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    PAN Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Format: ABCDE1234F"
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Driving Licence
                                </label>
                                <input
                                    type="text"
                                    placeholder="Format: XX00XXXXXXXX"
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Voter ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Format: ABC1234567"
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* UAN Number */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    UAN Number
                                </label>
                                <input
                                    type="text"
                                    placeholder="UAN must be in 12 digits"
                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex justify-start mt-4">
                            <button
                                type="submit"
                                className="relative left-36 bg-slate-600 text-white px-8 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                            >
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}

export default BackroundVerification