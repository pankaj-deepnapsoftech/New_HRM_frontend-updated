import React from "react";

const MainDashboardPage = () => {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="flex-1">
      <section className="p-8">
        {/* Header Welcome Card */}
        <section className="flex justify-between items-center bg-gradient-to-r from-[#545a68b4] to-[#6a7282c0] text-white rounded-3xl px-12 py-8 mb-10 shadow-lg">
          <div>
            <p className="text-sm mb-3">{today}</p>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span>John</span> 👋
            </h1>
            <p>Here’s what’s happening today in your portal.</p>
          </div>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/022/952/927/small/male-brand-designer-with-idea-3d-character-illustration-png.png"
            alt="Welcome Illustration"
            className="w-[180px]"
          />
        </section>

        {/* Stats Cards */}
        <div className="flex flex-wrap gap-8 mb-10">
          <section className="flex-1 min-w-[60%] flex flex-col gap-6">
            <div className="flex gap-8 justify-center flex-wrap">
              {[
                {
                  label: "Total Enrollments",
                  value: "4",
                  bg: "bg-[#6a7282c0]",
                },
                {
                  label: "Total Projects",
                  value: "1",
                  bg: "bg-[#6a7282c0]",
                },
                { label: "Present", value: "0", bg: "bg-[#6a7282c0]" },
                { label: "Absent", value: "0", bg: "bg-[#6a7282c0]" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`rounded-3xl w-[180px] text-center font-semibold p-6 ${item.bg} hover:scale-110 hover:shadow-lg text-white shadow-2xl transition-all duration-300`}
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
