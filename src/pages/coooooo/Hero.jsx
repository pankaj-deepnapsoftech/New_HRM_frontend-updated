import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="subscription-font hero flex flex-col-reverse md:flex-row items-center md:items-start gap-10 relative pt-60 justify-center bg-white px-3 md:px-10">
      <div className="w-full md:w-[40rem]">
        <h1 className="subscription-font font-bold text-3xl md:text-4xl text-[#2563eb]">
          Manage Your Team Smarter With HRM
        </h1>
        <p className="subscription-font mt-3 md:mt-6 text-lg">
          Automated payroll, attendance, document management & compliance—free your HR team for strategic work. Trusted by businesses large and small, our HRM software centralizes employee data, improves engagement, and saves you hours.
        </p>
        <div className="space-x-2 mt-6">
          <Link to="/subscription">
            <button
              style={{
                background: "linear-gradient(to right, #2563eb, #1c4dba, #163f9c)",
              }}
              className="subscription-font border px-8 py-2 text-lg rounded-md text-white ease-in-out duration-500 hover:scale-105"
            >
              Explore HRM Plans
            </button>
          </Link>
          <Link to="/contact">
            <button className="subscription-font text-[#2563eb] border-[#2563eb] border px-8 py-2 text-lg rounded-md ease-in-out duration-500 hover:scale-105">
              Book HRM Demo
            </button>
          </Link>
        </div>
      </div>
      <div className="">
        <img className="h-[20rem]" src="/hero.png" alt="People analytics demo" />
      </div>
    </div>
  );
};

export default HeroSection;
