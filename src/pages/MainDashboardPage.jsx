import React from "react";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, Title);

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
    label: "Total Employees",
    value: "1.2K",
    iconBg: "bg-blue-200",
    iconColor: "text-red-500",
    icon: "👤",
    change: "+147%",
    changeColor: "text-green-500",
  },
  {
    label: "Total Enrollments",
    value: "1.52K",
    iconBg: "bg-green-200",
    iconColor: "text-green-500",
    icon: "⭐",
    change: "+53%",
    changeColor: "text-green-500",
  },
  {
    label: "Absent",
    value: "4.53%",
    iconBg: "bg-red-200",
    iconColor: "text-black-500",
    icon: "🚫",
    change: "-10.7%",
    changeColor: "text-red-500",
  },
  {
    label: "Present",
    value: "5.47%",
    iconBg: "bg-yellow-200",
    iconColor: "text-yellow-500",
    icon: "🕒",
    change: "+29%",
    changeColor: "text-green-500",
  },
];

  // const attendanceCards = [
  //   { label: "Total Enrollments", value: "4", bg: "from-cyan-300 to-blue-400" },
  //   { label: "Total Projects", value: "1", bg: "from-pink-400 to-purple-400"  },
  //   { label: "Present", value: "0", bg: "from-indigo-300 to-violet-400" },
  //   { label: "Absent", value: "0", bg: "from-rose-400 to-red-400" },
  // ];
  const data = {
    labels: ['Employees', 'On Leave', 'Contractors', 'Interns'],
    datasets: [
      {
        label: 'HRM Distribution',
        data: [120, 15, 30, 10],
        backgroundColor: [
          '#34d399', 
          '#f87171', 
          '#fbbf24', 
          '#a78bfa', 
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#374151', 
        },
      },
      title: {
        display: true,
        text: 'HRM Dashboard',
        color: '#111827', 
        font: {
          size: 18,
        },
        
      },
    },
  };

  return (
    <main className="flex-1 font-sans p-10">
     
  <section className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-[#82479e] to-[#B19CD9] text-white rounded-3xl px-10 py-8 mb-10 shadow-xl transition hover:shadow-2xl">
    <div>
      <p className="text-sm mb-2 opacity-80">{today}</p>
      <h1 className="text-4xl font-extrabold mb-1">
        Welcome back, <span className="text-white">John</span> 👋
      </h1>
      <p className="text-sm text-white/80">
        Here’s what’s happening today in your portal.
      </p>
    </div>
    <img
      src="/Hand coding-amico.png"
      alt="Welcome Illustration"
      className=" w-[150px] md:w-[200px] mt-6 sm:mt-0"
    />
</section>


  {/* Cards and Chart in Single Row */}
  <div className=" bg-gray-100 flex flex-col lg:flex-row gap-2  pt-3 md:pt-10  md:pb-6 items-start">
    <div className="flex  flex-wrap  gap-2 md:gap-4 ml-3 md:ml-2 ">
    {statsCards.map((card, i) => (
      <div
        key={i}
        className="bg-white rounded-sm shadow-md w-80 h-48 md:w-60 md:h-40 p-6 mb-3 flex flex-col gap-5 text-gray-800"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg md:text-md text-gray-700 font-semibold">{card.label}</p>
            <p className="text-xl pt-5 md:pt-1 font-bold">{card.value}</p>
          </div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-full ${card.iconBg}`}>
            <span className={`text-lg ${card.iconColor}`}>{card.icon}</span>
          </div>
        </div>
        <p className={`text-sm ${card.changeColor}`}>
          {card.change} <span className=" text-gray-400">vs prev. 28 days</span>
        </p>
      </div>
    ))}
  </div>

  {/* Pie Chart Container */}
  <div className="w-2xl md:w-full lg:w-auto lg:mr-4 mt-4 lg:mt-0">
    <div className="flex max-w-sm bg-white p-6 md:p-2 rounded-sm shadow-md">
      <Pie data={data} options={options} />
    </div>
  </div>
</div>
    </main>
  );
};

export default MainDashboardPage;
