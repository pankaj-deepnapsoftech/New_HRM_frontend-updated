import React from "react";
import { useGetActiveAnnouncementsQuery } from "@/service/Announcements.services";
import { FaBullhorn } from "react-icons/fa";

const UserAnnouncements = () => {
  const { data, isLoading } = useGetActiveAnnouncementsQuery();
  const announcements = data?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-6 rounded-xl shadow-lg mb-6">
          <div className="flex items-center gap-3">
            <FaBullhorn className="text-3xl" />
            <div>
              <h1 className="text-2xl font-bold">Announcements</h1>
              <p className="text-indigo-100 mt-1">Latest messages from HR</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-10">Loading announcements…</div>
        ) : announcements.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-sm text-gray-600 text-center">
            No announcements right now.
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a._id} className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="text-gray-900">{a.message}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {a.createdAt ? new Date(a.createdAt).toLocaleString() : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAnnouncements;


