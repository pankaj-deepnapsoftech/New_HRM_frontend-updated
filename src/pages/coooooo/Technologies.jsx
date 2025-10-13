const Technologies = () => {
  return (
    <div className="my-24 px-10">
      <h1 className="subscription-font text-3xl font-medium text-[#262544] text-center">
        Technologies Used
      </h1>

      <div className="mt-10 flex flex-col lg:flex-row items-center lg:gap-16 justify-center">
        <img
          className="h-[10rem] lg:h-auto lg:w-[7rem] object-contain aspect-square"
          src="/mongodb.png"
        />
        <img
          className="h-[10rem] lg:h-auto lg:w-[10rem] object-contain aspect-square"
          src="/expressjs.png"
        />
        <img
          className="h-[10rem] lg:h-auto lg:w-[7rem] object-contain aspect-square mb-10 lg:mb-0"
          src="/reactjs.png"
        />
        <img
          className="h-[10rem] lg:h-auto lg:w-[7rem] object-contain aspect-square"
          src="/nodejs.png"
        />
        <img
          className="h-[12rem] lg:h-auto lg:w-[15rem] object-contain aspect-square -mt-8 lg:mt-0"
          src="/tailwindcss.png"
        />
      </div>
    </div>
  );
};

export default Technologies;
