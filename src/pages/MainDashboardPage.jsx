import React from "react";
import { Doughnut } from 'react-chartjs-2';
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

  
  // Donut uses a single gradient fill across slices (see backgroundColor function below)

  const dataPie = {
    labels,
    datasets: [
      // Outer ring
      {
        label: 'Departments',
        data: counts,
        backgroundColor: (context) => {
          const gradients = [
            { from: 'rgb(52, 211, 153)', to: 'rgb(16, 185, 129)' },
            { from: 'rgb(79, 156, 249)', to: 'rgb(108, 193, 255)' },
            { from: 'rgb(232, 113, 175)', to: 'rgb(239, 68, 68)' },
            { from: 'rgb(251, 191, 36)', to: 'rgb(245, 158, 11)' },
          ];
          const { ctx, chartArea } = context.chart || {};
          const { dataIndex } = context;
          const g = gradients[dataIndex % gradients.length];
          if (!ctx || !chartArea) return g.to;
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.bottom,
            chartArea.right,
            chartArea.top
          );
          gradient.addColorStop(0, g.from);
          gradient.addColorStop(1, g.to);
          return gradient;
        },
        borderWidth: 1,
        weight: 1,
      },
      // Inner ring (lighter alpha overlay)
      {
        label: 'Departments (inner)',
        data: counts,
        backgroundColor: (context) => {
          const gradients = [
            { from: 'rgba(52, 211, 153, 0.45)', to: 'rgba(16, 185, 129, 0.45)' },
            { from: 'rgba(79, 156, 249, 0.45)', to: 'rgba(108, 193, 255, 0.45)' },
            { from: 'rgba(232, 113, 175, 0.45)', to: 'rgba(239, 68, 68, 0.45)' },
            { from: 'rgba(251, 191, 36, 0.45)', to: 'rgba(245, 158, 11, 0.45)' },
          ];
          const { ctx, chartArea } = context.chart || {};
          const { dataIndex } = context;
          const g = gradients[dataIndex % gradients.length];
          if (!ctx || !chartArea) return g.to;
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.bottom,
            chartArea.right,
            chartArea.top
          );
          gradient.addColorStop(0, g.from);
          gradient.addColorStop(1, g.to);
          return gradient;
        },
        borderWidth: 1,
        weight: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#0d4b55',
        },
      },
      title: {
        display: true,
        text: 'Department Distribution',
        color: '#0d4b55',
        font: {
          size: 18,
        },
      },
    },
    layout: { padding: 10 },
    elements: { arc: { borderColor: '#ffffff', borderWidth: 2 } },
    cutout: '55%',
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

  // Gradients for the 4 metric cards (to match the reference UI)
  const cardGradients = [
    'linear-gradient(135deg, #4f9cf9 0%, #6cc1ff 100%)', // blue
    'linear-gradient(135deg, #34d399 0%, #10b981 100%)', // green
    'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', // amber
    'linear-gradient(135deg, #f472b6 0%, #ef4444 100%)', // pink-red
  ];

  return (
    <main className="flex-1 font-sans p-4 md:p-8" style={{ backgroundColor: '#f0fbfc' }}>
      <section className="relative overflow-hidden flex flex-col sm:flex-row justify-between items-center text-white rounded-3xl px-10 py-8 mb-10 shadow-xl transition hover:shadow-2xl" style={{ backgroundColor: 'rgb(17, 85, 96)' }}>
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle at center, #ffffff, transparent 60%)' }} />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle at center, #0d4b55, transparent 60%)' }} />
        <div>
          <p className="text-sm mb-2 text-white/90">{today}</p>
          <h1 className="text-4xl font-extrabold mb-1 text-white">
            Welcome back, <br />{userName.charAt(0).toUpperCase() + userName.slice(1)} <span className="align-middle"></span>
          </h1>
          {/* <p className="text-sm text-white/90">
            Here’s what’s happening today in your portal.
          </p> */}
        </div>
        <img
          src="/Hand coding-amico.png"
          alt="Welcome Illustration"
          className="w-[150px] md:w-[200px] mt-6 sm:mt-0"
        />
      </section>

      {/* Cards and Chart in Single Row */}
      <div className="w-full flex flex-col lg:flex-row gap-4 pt-4 md:pt-10 md:pb-6 px-3 md:px-6" style={{ backgroundColor: '#e6f7f9' }}>
        {/* Cards Container */}
        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
          {statsCards.map((card, i) => (
            <div
              key={i}
              className="rounded-md shadow w-full sm:w-72 md:w-60 h-[120px] p-4 flex flex-col justify-between transition-transform hover:-translate-y-1 hover:shadow-lg"
              style={{ background: cardGradients[i % cardGradients.length], color: '#ffffff' }}
            >
              <div className="flex justify-between items-start">
                <div className="text-[12px] leading-4 opacity-90">{card.label}</div>
                <div className="text-lg font-bold">{card.value}</div>
              </div>
              <div className="flex items-center text-[12px] opacity-95">
                <span className="mr-2 text-base leading-none">{card.icon}</span>
                <span>{card.label}</span>
                <span className="ml-auto">{card.change?.replace('+','') || '301'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pie Chart Container */}
        <div className="w-full lg:w-[350px] mt-6 lg:mt-0 lg:ml-auto">
          <div className="flex justify-center p-4 rounded-sm shadow-md" style={{ backgroundColor: '#ffffff', borderTop: '4px solid #0d4b55' }}>
            <div className="w-full max-w-xs md:max-w-sm">
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-48 w-48 mx-auto rounded-full" style={{ backgroundColor: '#e6f7f9' }} />
                  <div className="h-3 w-3/4 mx-auto mt-4 rounded" style={{ backgroundColor: '#e6f7f9' }} />
                </div>
              ) : (
                <Doughnut data={dataPie} options={options} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainDashboardPage;

