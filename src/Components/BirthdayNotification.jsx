import React from 'react';
import { useGetTodayBirthdaysQuery } from '../service/EmpData.services.js';
import { motion } from 'framer-motion';
import { FaBirthdayCake, FaTimes } from 'react-icons/fa';

const BirthdayNotification = () => {
    const { data: birthdaysData, isLoading, error } = useGetTodayBirthdaysQuery();
    const todaysBirthdays = birthdaysData?.data || [];

    if (isLoading || error || todaysBirthdays.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="bg-gradient-to-r from-pink-100 to-purple-100 border-l-4 border-pink-500 rounded-lg p-4 mb-6 shadow-lg"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-500 rounded-full">
                        <FaBirthdayCake className="text-white text-xl" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                            🎉 Today's Birthdays!
                        </h3>
                        <p className="text-sm text-gray-600">
                            {todaysBirthdays.length === 1 
                                ? '1 colleague is celebrating their birthday today' 
                                : `${todaysBirthdays.length} colleagues are celebrating their birthdays today`
                            }
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {todaysBirthdays.map((employee, index) => (
                    <motion.div
                        key={employee._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-3 shadow-sm border border-pink-200 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                {employee.avatar ? (
                                    <img 
                                        src={employee.avatar} 
                                        alt={employee.fname}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-pink-300"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center border-2 border-pink-300">
                                        <span className="text-white font-bold text-lg">
                                            {employee.fname?.charAt(0)?.toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-semibold text-gray-900 truncate">
                                    {employee.fname} {employee.lastName}
                                </h4>
                                <p className="text-xs text-gray-600 truncate">
                                    {employee.designation}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {employee.department}
                                </p>
                            </div>
                        </div>
                        <div className="mt-2 flex items-center justify-center">
                            <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-medium">
                                🎂 Happy Birthday!
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    🎈 Wishing them a wonderful day filled with joy and happiness!
                </p>
            </div>
        </motion.div>
    );
};

export default BirthdayNotification;
