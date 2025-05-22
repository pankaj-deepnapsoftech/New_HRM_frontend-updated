import React from "react";
// Optional: Uncomment if using AOS animations
// import AOS from "aos";
// import "aos/dist/aos.css";

// Optional: Uncomment if using Heroicons
// import { UserGroupIcon, EyeIcon, ChartBarIcon } from "@heroicons/react/24/solid";

const MainDashboardPage = () => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Optional: Animation on Scroll
  // useEffect(() => {
  //   AOS.init({ duration: 1000 });
  // }, []);

  const statsCards = [
    {
      label: "Your Overall Rank",
      value: "1st",
      sub: "among creators",
      color: "text-purple-500",
    },
    {
      label: "Content Created",
      value: "245",
      sub: "1st among creators",
      badge: "18.3%",
      badgeColor: "border-purple-400",
    },
    {
      label: "New Subscribers",
      value: "137",
      sub: "+2.1%",
      subColor: "text-green-600",
    },
    {
      label: "Total Subscribers",
      value: "7,869",
      sub: "-1.2%",
      subColor: "text-red-500",
    },
    {
      label: "Content Views",
      value: "842,302",
      sub: "+2.1%",
      subColor: "text-green-600",
    },
    {
      label: "Time on Site",
      value: "1,253h",
      sub: "+3.4%",
      subColor: "text-green-600",
    },
  ];

  const attendanceCards = [
    { label: "Total Enrollments", value: "4", bg: "from-cyan-300 to-blue-400" },
    { label: "Total Projects", value: "1", bg: "from-pink-400 to-purple-400" },
    { label: "Present", value: "0", bg: "from-indigo-300 to-violet-400" },
    { label: "Absent", value: "0", bg: "from-rose-400 to-red-400" },
  ];

  return (
    <main className="flex-1 font-sans">
      <section className="p-8">

      
        <section className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-[#82479e] to-[#B19CD9] text-white rounded-3xl px-10 py-8 mb-10 shadow-xl transition hover:shadow-2xl">
          <div>
            <p className="text-sm mb-2 opacity-80">{today}</p>
            <h1 className="text-4xl font-extrabold mb-1">Welcome back, <span className="text-white">John</span> 👋</h1>
            <p className="text-sm text-white/80">Here’s what’s happening today in your portal.</p>
          </div>
          <img
            src="/Hand coding-amico.png"
            alt="Welcome Illustration"
            className="w-[200px] mt-6 sm:mt-0"
          />
        </section>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {statsCards.map((card, i) => (
            <div key={i} className="bg-[#9677b9a4] rounded-2xl p-5 shadow-md hover:shadow-lg transition">
              <p className="text-sm text-white font-[500] mb-1">{card.label}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold ${card.color || "text-white"}`}>{card.value}</p>
                  {card.sub && <p className={`text-xs ${card.subColor || "text-white"}`}>{card.sub}</p>}
                </div>
                {card.badge && (
                  <div
                    className={`w-14 h-14 rounded-full border-[6px] ${card.badgeColor} flex items-center justify-center text-sm text-gray-600 font-semibold`}
                  >
                    {card.badge}
                  </div>
                )}
              </div>
              {card.label === "New Subscribers" && (
                <div className="mt-3 h-2 rounded bg-purple-100 w-full"></div>
              )}
            </div>
          ))}
        </div>

     
        <div className="flex flex-wrap gap-6 ">
          {attendanceCards.map((item, i) => (
            <div
              key={i}
              className={`relative rounded-2xl w-[298px] h-[100px] flex  justify-between flex-wrap font-semibold p-4 bg-gradient-to-br ${item.bg} text-white overflow-hidden shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300`}
            >
              <p className="text-sm">{item.label}</p>
              <p className="text-4xl ">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainDashboardPage;
