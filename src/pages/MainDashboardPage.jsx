import Header from "@/Components/shared/Header";
import Sidebar from "@/Components/shared/Sidebar";
import React from "react";

const MainDashboardPage = () => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="flex-1 ">
   
      {/* Search & Greeting */}
      <section className="p-8">
        {/* <div className="flex justify-between items-center mb-6 "> 
        <div className="relative w-72">
          <IoSearchSharp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-800" />
          <input
            type="search"
            placeholder="Type to search..."
            className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 shadow-[0_4px_6px_0_rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-purple-500"

          /><FaMicrophone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-800"/>
        </div>
      </div> */}

        {/* Info Banner */}
        <section className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-3xl px-12 py-8 mb-10 shadow-lg">
          <div>
            <p className="text-sm text-gray-200 mb-3">{today}</p>
            <h1 className="text-3xl font-bold text-gray-300 mb-2">
              Welcome back, <span className="text-purple-200">John</span> 👋
            </h1>
            <p className="text-gray-300 mt-1">
              Here’s what’s happening today in your portal.
            </p>
          </div>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/022/952/927/small/male-brand-designer-with-idea-3d-character-illustration-png.png"
            alt="Welcome Illustration"
            className="w-[180px]"
          />
        </section>

        <div className="flex flex-wrap gap-8 ">
          {/* Left Section */}
          <section className="flex-1 min-w-[60%] flex flex-col gap-6">
            {/* Finance Summary */}
            <div className=" flex gap-8 justify-center">
              {[
                {
                  label: "Total Enrollments",
                  value: "4",
                  bg: "bg-purple-100",

                },
                {
                  label: "Total Projects",
                  value: "1",
                  bg: "bg-purple-100",
                },
                { label: "Present", value: "0", bg: "bg-purple-100" },
                { label: "Absent", value: "0", bg: "bg-purple-100" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-3xl w-[180px]  text-center  font-semibold p-6 ${item.bg} hover:bg-purple-50   hover:shadow-lg text-purple-900 shadow hover:border-purple-900 hover:border-2  transition-all duration-300`}
                >
                  <p>{item.label}</p>
                  <p className="text-3xl mt-3">{item.value}</p>
                </div>
              ))}
            </div>

          </section>
        </div>
      </section>
    </main>
  );
};

export default MainDashboardPage;
