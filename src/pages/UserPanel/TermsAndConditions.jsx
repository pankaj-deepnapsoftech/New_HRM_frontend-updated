import React, { useState } from "react";
import { FaFileContract, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useGetActiveAnnouncementsQuery } from "@/service/Announcements.services";
import { useSubmitTermsAndConditionsMutation, useGetEmployeeTermsStatusQuery } from "@/service/TermsAndConditions.services";
import { useSelector } from "react-redux";

const TermsAndConditions = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [submitTermsAndConditions, { isLoading }] = useSubmitTermsAndConditionsMutation();
  const { Auth } = useSelector((state) => state);
  const employeeCode = Auth.user?.empCode || Auth.user?.employeeId;
  const { data: myTerms, isLoading: termsLoading } = useGetEmployeeTermsStatusQuery(employeeCode, {
    skip: !employeeCode,
  });
  const { data: activeAnnouncements } = useGetActiveAnnouncementsQuery();

  const handleSubmit = async () => {
    if (!isAgreed) {
      toast.error("Please agree to the terms and conditions first");
      return;
    }
    
    try {
      const result = await submitTermsAndConditions({
        employeeId: Auth.user?.empCode || Auth.user?.employeeId,
        agreementText: "I agree to all the terms and conditions outlined above",
        version: "1.0"
      }).unwrap();
      
      toast.success(result.message || "Terms and conditions accepted successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit terms and conditions");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 px-6 rounded-xl shadow-lg mb-8">
          <div className="flex items-center gap-4">
            <FaFileContract className="text-4xl" />
            <div>
              <h1 className="text-3xl font-bold">Terms and Conditions</h1>
              <p className="text-blue-100 mt-2">Please read and accept our terms and conditions</p>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Employee Terms and Conditions</h2>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Employment Agreement</h3>
                <p className="leading-relaxed">
                  By accepting this employment, you agree to abide by all company policies, procedures, 
                  and guidelines as outlined in the employee handbook and any subsequent updates.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Confidentiality</h3>
                <p className="leading-relaxed">
                  You acknowledge that you will have access to confidential and proprietary information 
                  belonging to the company. You agree to maintain the confidentiality of such information 
                  both during and after your employment.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Code of Conduct</h3>
                <p className="leading-relaxed">
                  You agree to conduct yourself in a professional manner at all times, treating colleagues, 
                  clients, and stakeholders with respect and dignity. Any form of harassment, discrimination, 
                  or inappropriate behavior will not be tolerated.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">4. Attendance and Punctuality</h3>
                <p className="leading-relaxed">
                  You are expected to maintain regular attendance and punctuality. Any absences must be 
                  reported in advance through the proper channels, and leave requests must be submitted 
                  through the HRM system.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">5. Data Security</h3>
                <p className="leading-relaxed">
                  You are responsible for maintaining the security of company data and systems. This includes 
                  using strong passwords, not sharing login credentials, and reporting any security incidents 
                  immediately.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">6. Intellectual Property</h3>
                <p className="leading-relaxed">
                  Any work, inventions, or creative works developed during your employment using company 
                  resources or during work hours belong to the company and must be disclosed to the appropriate 
                  department.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">7. Termination</h3>
                <p className="leading-relaxed">
                  Either party may terminate this employment relationship with appropriate notice as per 
                  company policy and applicable labor laws. Upon termination, you must return all company 
                  property and maintain confidentiality obligations.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">8. Compliance</h3>
                <p className="leading-relaxed">
                  You agree to comply with all applicable laws, regulations, and company policies. 
                  Violation of these terms may result in disciplinary action, up to and including termination.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* HR Announcements - shown below Terms & Conditions */}
        {activeAnnouncements?.data?.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">HR Announcements</h3>
            <div className="space-y-2">
              {activeAnnouncements.data.map((a) => (
                <div key={a._id} className="text-yellow-900">
                  • {a.message}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agreement Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-start gap-4 mb-6">
            <input
              type="checkbox"
              id="agreement"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="agreement" className="text-lg text-gray-700 cursor-pointer">
              I have read and understood all the terms and conditions outlined above. 
              I agree to abide by these terms and conditions during my employment with the company.
            </label>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={!isAgreed || isLoading || termsLoading || myTerms?.data?.termsStatus?.submitted}
              className={`flex items-center gap-3 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform ${
                isAgreed && !isLoading && !termsLoading && !myTerms?.data?.termsStatus?.submitted
                  ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:scale-105 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FaCheckCircle className="text-xl" />
              {termsLoading
                ? "Loading..."
                : myTerms?.data?.termsStatus?.submitted
                ? "Already Submitted"
                : isLoading
                ? "Submitting..."
                : "Submit Agreement"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
