import React from 'react';
import { IoIosClose } from 'react-icons/io';

const BankAccountDetails = ({ BankVerifyPage, setBankVerifyPage }) => {
    return (
        <section className={` ${ BankVerifyPage ? "opacity-100 visible" : "opacity-0 invisible"} fixed left-0 top-0 h-full w-full bg-black/40 transition-opacity duration-500 ease-in-out`}>
            <div className="flex items-center justify-center min-h-screen ">
                <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
                    <button
                        className=" text-gray-800 flex justify-end w-full hover:text-red-500 transition cursor-pointer"
                        onClick={() => setBankVerifyPage(false)}
                        aria-label="Close"
                    >
                        <IoIosClose size={32} />
                    </button>
                    <h2 className="text-xl mt-2 font-semibold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
                        Bank Account Verification
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-blue-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 2L2 6v2h16V6l-8-4zM4 10v6h12v-6H4zm2 2h2v2H6v-2zm4 0h2v2h-2v-2z" />
                        </svg>
                    </h2>

                    <form className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Account Holder's Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Account Holder's Name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Account Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Account Number"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Bank Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Bank Name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                IFSC Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter IFSC Code"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex justify-between items-center mt-6">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                            >
                                Submit
                            </button>
                         
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default BankAccountDetails;