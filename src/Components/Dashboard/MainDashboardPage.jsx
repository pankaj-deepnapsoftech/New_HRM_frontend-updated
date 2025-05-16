import React from "react";

const MainDashboardPage = () => {
    const today = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="flex min-h-screen font-sans bg-gray-50 text-gray-800">
      
            <aside className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white flex flex-col px-6 py-8 rounded-r-3xl shadow-lg">
                <h2 className="text-3xl font-extrabold mb-8 tracking-wide">DASHBOARD </h2>
                <nav className="flex flex-col space-y-4 font-medium">
                    {[
                        "Dashboard",
                        "Payment Info",
                        "Registration",
                        "Courses",
                        "Drop Semester",
                        "Result",
                        "Notice",
                        "Schedule",
                        "Logout"
                    ].map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            className={`px-4 py-3 rounded-lg transition duration-300 ${index === 0
                                    ? "bg-purple-900 shadow"
                                    : "hover:bg-purple-700"
                                }`}
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                {/* Search & Greeting */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">{today}</p>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back, <span className="text-purple-600">John</span> 👋</h1>
                        <p className="text-gray-600 mt-1">Here’s what’s happening today in your portal.</p>
                    </div>
                    <input
                        type="search"
                        placeholder="Search anything..."
                        className="border border-gray-300 rounded-full py-2 px-5 w-72 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Info Banner */}
                <section className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-3xl px-10 py-8 mb-10 shadow-lg">
                    <div>
                        <p className="opacity-80 text-sm mb-1">Important Notice</p>
                        <h2 className="text-2xl font-semibold">Stay updated with your course and finance!</h2>
                    </div>
                    <img
                        src="https://static.vecteezy.com/system/resources/thumbnails/022/952/927/small/male-brand-designer-with-idea-3d-character-illustration-png.png"
                        alt="Welcome Illustration"
                        className="w-[180px]"
                    />
                </section>

                <div className="flex flex-wrap gap-8">
                    {/* Left Section */}
                    <section className="flex-1 min-w-[60%] flex flex-col gap-8">
                        {/* Finance Summary */}
                        <div className="grid grid-cols-3 gap-6">
                            {[
                                { label: "Total Payable", value: "$10,000", bg: "bg-purple-100" },
                                { label: "Total Paid", value: "$15,000", bg: "bg-white border-2 border-purple-600" },
                                { label: "Other Fees", value: "300", bg: "bg-purple-100" },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`rounded-3xl text-center font-semibold p-6 ${item.bg} text-purple-900 shadow`}
                                >
                                    <p>{item.label}</p>
                                    <p className="text-3xl mt-2">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Enrolled Courses */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-purple-700">Your Courses</h3>
                                <a href="#" className="text-sm font-semibold text-purple-600 hover:underline">See all</a>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    "Object Oriented Programming",
                                    "Fundamentals of Database Systems"
                                ].map((course, i) => (
                                    <div key={i} className="bg-purple-200 p-6 rounded-3xl flex flex-col justify-between shadow-sm">
                                        <h4 className="font-bold text-purple-800 mb-4">{course}</h4>
                                        <button className="bg-purple-700 text-white rounded-full py-2 px-6 font-semibold hover:bg-purple-800 transition">
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Right Aside Section */}
                    <aside className="w-80 bg-purple-100 p-6 rounded-3xl space-y-8 text-sm text-purple-800 self-start shadow-md">
                        {/* Instructors */}
                        <div>
                            <h4 className="font-bold mb-3">Course Instructors</h4>
                            <div className="flex space-x-3">
                                {[10, 15, 20].map(id => (
                                    <img
                                        key={id}
                                        src={`https://i.pravatar.cc/40?img=${id}`}
                                        alt={`Instructor ${id}`}
                                        className="rounded-full border-2 border-white shadow-sm"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Notices */}
                        <div>
                            <h4 className="font-bold mb-2">Daily Notices</h4>
                            <div className="space-y-4">
                                <div>
                                    <b>📌 Prelim Payment Due</b>
                                    <p className="mt-1 text-gray-700">Ensure your prelim dues are cleared before 20th May.</p>
                                    <a href="#" className="text-purple-700 font-semibold hover:underline">Learn more</a>
                                </div>
                                <div>
                                    <b>📝 Exam Schedule Released</b>
                                    <p className="mt-1 text-gray-700">The exam schedule for Semester II is now available.</p>
                                    <a href="#" className="text-purple-700 font-semibold hover:underline">Check now</a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default MainDashboardPage;
