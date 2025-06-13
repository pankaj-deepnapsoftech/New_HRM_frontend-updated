import React from "react";
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { useSelector } from "react-redux";
import { useGetAllEmpDataQuery } from "@/service/EmpData.services"; 

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const MainDashboardPage = () => {

  const userName = useSelector((state) => state.Auth.username);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const { data, isLoading } = useGetAllEmpDataQuery();
  const employees = data?.data || [];

 
  const departmentCounts = employees.reduce((acc, emp) => {
    const dept = emp.department || "Unknown";
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(departmentCounts);
  const counts = Object.values(departmentCounts);

  
  const colors = [
    '#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF6384', '#36A2EB'
  ];

  const dataPie = {
    labels,
    datasets: [
      {
        label: 'Employee Distribution by Department',
        data: counts,
        backgroundColor: colors.slice(0, labels.length),
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
        text: 'Department Distribution',
        color: '#111827',
        font: {
          size: 18,
        },
      },
    },
  };

  const statsCards = [
    {
      label: "Total Employees",
      value: employees.length,
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

  return (
    <main className="flex-1 font-sans p-4 md:p-8">
      <section className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-[#82479e] to-[#B19CD9] text-white rounded-3xl px-10 py-8 mb-10 shadow-xl transition hover:shadow-2xl">
        <div>
          <p className="text-sm mb-2 opacity-80">{today}</p>
          <h1 className="text-4xl font-extrabold mb-1">
            Welcome back, <span className="text-white ">{userName.charAt(0).toUpperCase() + userName.slice(1)}</span> 👋
          </h1>
          <p className="text-sm text-white/80">
            Here’s what’s happening today in your portal.
          </p>
        </div>
        <img
          src="/Hand coding-amico.png"
          alt="Welcome Illustration"
          className="w-[150px] md:w-[200px] mt-6 sm:mt-0"
        />
      </section>

      {/* Cards and Chart in Single Row */}
      <div className="w-full bg-gray-100 flex flex-col lg:flex-row gap-4 pt-4 md:pt-10 md:pb-6 px-3 md:px-6">
        {/* Cards Container */}
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {statsCards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-sm shadow-md w-full sm:w-72 md:w-60 h-auto p-5 flex flex-col gap-4 text-gray-800"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg md:text-md text-gray-700 font-semibold">{card.label}</p>
                  <p className="text-2xl pt-2 md:pt-1 font-bold">{card.value}</p>
                </div>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${card.iconBg}`}>
                  <span className={`text-lg ${card.iconColor}`}>{card.icon}</span>
                </div>
              </div>
              <p className={`text-sm ${card.changeColor}`}>
                {card.change} <span className="text-gray-400">vs prev. 28 days</span>
              </p>
            </div>
          ))}
        </div>

        {/* Pie Chart Container */}
        <div className="w-full lg:w-[350px] mt-6 lg:mt-0 lg:ml-auto">
          <div className="flex justify-center bg-white p-4 rounded-sm shadow-md">
            <div className="w-full max-w-xs md:max-w-sm">
              {isLoading ? (
                <p className="text-center">Loading chart...</p>
              ) : (
                <Pie data={dataPie} options={options} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainDashboardPage;
