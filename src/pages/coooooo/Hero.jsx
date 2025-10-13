import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="subscription-font hero flex flex-col-reverse md:flex-row items-center md:items-start gap-10 relative pt-60 justify-center bg-white px-3 md:px-10">
      <div className="w-full md:w-[40rem]">
        <h1 className="subscription-font font-bold text-3xl md:text-4xl text-[#2563eb]">
          Looking for the Best Customer Relationship Management System?
        </h1>
        <p className="subscription-font mt-3 md:mt-6 text-lg">
          Unlock your business's potential with our intuitive CRM platform.
          Whether you're a small startup or an established enterprise, our tools
          are designed to streamline your processes, enhance customer
          relationships, and drive sales growth.
        </p>
        <div className="space-x-2 mt-6">
          <Link to="/pricing">
            <button
              style={{
                background:
                  "linear-gradient(to right, #2563eb, #1c4dba, #163f9c)",
              }}
              className="subscription-font border px-8 py-2 text-lg rounded-md text-white ease-in-out duration-500 hover:scale-105"
            >
              Explore Plans
            </button>
          </Link>
          <Link to="/contact">
            <button className="subscription-font text-[#2563eb] border-[#2563eb] border px-8 py-2 text-lg rounded-md ease-in-out duration-500 hover:scale-105">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <div className="">
        <img className="h-[20rem]" src="/hero.png"></img>
      </div>
    </div>
  );
};

export default HeroSection;
