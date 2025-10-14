import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="subscription-font hero flex flex-col-reverse md:flex-row items-center md:items-start gap-10 relative py-36 justify-center bg-white px-3 md:px-10">
      <div className="w-full md:w-[40rem]">
        <h1 className="subscription-font font-bold text-3xl md:text-4xl text-[#2563eb]">
          HR Managment Software
        </h1>
        <p className="subscription-font mt-3 md:mt-6 text-lg">
          This is our HR software. It help manage employees and do HR task. You
          can use it for you're company to handle employee informations.
        </p>
        <div className="subscription-font mt-4 space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <span className="w-2 h-2 bg-[#2563eb] rounded-full"></span>
            <span>Calculate salarys</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="w-2 h-2 bg-[#2563eb] rounded-full"></span>
            <span>Track attendence</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <span className="w-2 h-2 bg-[#2563eb] rounded-full"></span>
            <span>Employee datas</span>
          </div>
        </div>
        <div className="space-x-2 mt-6">
          <Link to="/sign-in">
            <button
              style={{
                background:
                  "linear-gradient(to right, #2563eb, #1c4dba, #163f9c)",
              }}
              className="subscription-font border px-8 py-2 text-lg rounded-md text-white ease-in-out duration-500 hover:scale-105"
            >
              Get Demo
            </button>
          </Link>
        </div>
      </div>
      <div className="">
        <img
          className="h-[20rem]"
          src="https://media.licdn.com/dms/image/v2/D4D12AQFcbAZhagzjnA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1713166349321?e=2147483647&v=beta&t=HI1ywckVt7zQqkixnBKcI8wBN56CV6TeSgCVOnlhrXQ"
          alt="People analytics demo"
        />
      </div>
    </div>
  );
};

export default HeroSection;
