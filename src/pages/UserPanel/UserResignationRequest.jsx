import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
    useCreateResignationRequestMutation,
    useGetEmployeeResignationRequestsQuery,
    useCancelResignationRequestMutation
} from '../../service/ResignationRequest.services.js';
import { motion } from 'framer-motion';

const UserResignationRequest = () => {
    const [formData, setFormData] = useState({
        resignationDate: '',
        lastWorkingDate: '',
        reason: '',
        noticePeriod: 30,
        handoverNotes: ''
    });
    const [showExistingRequests, setShowExistingRequests] = useState(false);

    // RTK Query hooks
    const { data: existingRequestsData, refetch: refetchRequests } = useGetEmployeeResignationRequestsQuery();
    const [createResignationRequest, { isLoading: isCreating }] = useCreateResignationRequestMutation();
    const [cancelResignationRequest] = useCancelResignationRequestMutation();

    const existingRequests = existingRequestsData?.data || [];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateLastWorkingDate = (resignationDate, noticePeriod) => {
        if (!resignationDate || !noticePeriod) return '';
        
        const resDate = new Date(resignationDate);
        const lastWorkingDate = new Date(resDate.getTime() + (noticePeriod * 24 * 60 * 60 * 1000));
        return lastWorkingDate.toISOString().split('T')[0];
    };

    const handleNoticePeriodChange = (e) => {
        const noticePeriod = parseInt(e.target.value);
        setFormData(prev => {
            const newData = { ...prev, noticePeriod };
            if (prev.resignationDate) {
                newData.lastWorkingDate = calculateLastWorkingDate(prev.resignationDate, noticePeriod);
            }
            return newData;
        });
    };

    const handleResignationDateChange = (e) => {
        const resignationDate = e.target.value;
        setFormData(prev => ({
            ...prev,
            resignationDate,
            lastWorkingDate: calculateLastWorkingDate(resignationDate, prev.noticePeriod)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.resignationDate || !formData.lastWorkingDate || !formData.reason.trim()) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (new Date(formData.lastWorkingDate) <= new Date(formData.resignationDate)) {
            toast.error('Last working date must be after resignation date');
            return;
        }

        try {
            await createResignationRequest(formData).unwrap();
            toast.success('Resignation request submitted successfully');
            setFormData({
                resignationDate: '',
                lastWorkingDate: '',
                reason: '',
                noticePeriod: 30,
                handoverNotes: ''
            });
            refetchRequests();
        } catch (error) {
            toast.error(error.data?.message || error.message || 'Failed to submit resignation request');
        }
    };

    const handleCancelRequest = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this resignation request?')) {
            return;
        }

        try {
            await cancelResignationRequest(id).unwrap();
            toast.success('Resignation request cancelled successfully');
            refetchRequests();
        } catch (error) {
            toast.error(error.data?.message || error.message || 'Failed to cancel resignation request');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Resignation Request</h1>
                    <p className="text-gray-600">Submit your resignation request to HR department</p>
                </div>

                {/* Existing Requests Toggle */}
                {existingRequests.length > 0 && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowExistingRequests(!showExistingRequests)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {showExistingRequests ? 'Hide' : 'Show'} Previous Requests ({existingRequests.length})
                        </button>
                    </div>
                )}

                {/* Existing Requests */}
                {showExistingRequests && existingRequests.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-white rounded-lg shadow-sm border mb-6 p-6"
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Requests</h3>
                        <div className="space-y-4">
                            {existingRequests.map((request, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                Request #{index + 1}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Submitted: {new Date(request.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-medium">Resignation Date:</span> {new Date(request.resignationDate).toLocaleDateString()}
                                        </div>
                                        <div>
                                            <span className="font-medium">Last Working Date:</span> {new Date(request.lastWorkingDate).toLocaleDateString()}
                                        </div>
                                        <div className="md:col-span-2">
                                            <span className="font-medium">Reason:</span> {request.reason}
                                        </div>
                                        {request.adminComments && (
                                            <div className="md:col-span-2">
                                                <span className="font-medium">Admin Comments:</span> {request.adminComments}
                                            </div>
                                        )}
                                    </div>
                                    {request.status === 'pending' && (
                                        <div className="mt-3">
                                            <button
                                                onClick={() => handleCancelRequest(request._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
                                            >
                                                Cancel Request
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Resignation Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm border p-6"
                >
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit New Resignation Request</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="resignationDate" className="block text-sm font-medium text-gray-700 mb-2">
                                    Resignation Date *
                                </label>
                                <input
                                    type="date"
                                    id="resignationDate"
                                    name="resignationDate"
                                    value={formData.resignationDate}
                                    onChange={handleResignationDateChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="noticePeriod" className="block text-sm font-medium text-gray-700 mb-2">
                                    Notice Period (Days) *
                                </label>
                                <select
                                    id="noticePeriod"
                                    name="noticePeriod"
                                    value={formData.noticePeriod}
                                    onChange={handleNoticePeriodChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value={15}>15 days</option>
                                    <option value={30}>30 days</option>
                                    <option value={45}>45 days</option>
                                    <option value={60}>60 days</option>
                                    <option value={90}>90 days</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastWorkingDate" className="block text-sm font-medium text-gray-700 mb-2">
                                Last Working Date *
                            </label>
                            <input
                                type="date"
                                id="lastWorkingDate"
                                name="lastWorkingDate"
                                value={formData.lastWorkingDate}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                This date is automatically calculated based on resignation date and notice period
                            </p>
                        </div>

                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                                Reason for Resignation *
                            </label>
                            <textarea
                                id="reason"
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Please provide a detailed reason for your resignation..."
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="handoverNotes" className="block text-sm font-medium text-gray-700 mb-2">
                                Handover Notes (Optional)
                            </label>
                            <textarea
                                id="handoverNotes"
                                name="handoverNotes"
                                value={formData.handoverNotes}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Any important notes for handover process..."
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    resignationDate: '',
                                    lastWorkingDate: '',
                                    reason: '',
                                    noticePeriod: 30,
                                    handoverNotes: ''
                                })}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Reset
                            </button>
                            <button
                                type="submit"
                                disabled={isCreating}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {isCreating ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Important Notice */}
                <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                            <div className="mt-2 text-sm text-yellow-700">
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Please ensure all required fields are filled accurately</li>
                                    <li>Your request will be reviewed by HR department</li>
                                    <li>You will be notified about the approval status</li>
                                    <li>Make sure to complete all pending work before your last working day</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserResignationRequest;
