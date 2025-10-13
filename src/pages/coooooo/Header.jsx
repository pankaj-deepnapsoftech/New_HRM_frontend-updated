import { useState } from "react";
import { ImMenu3, ImMenu4 } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = ({ showAuthenticationMenu, setShowAuthenticationMenu }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showUserDetailsMenu, setShowUserDetailsMenu] = useState(false);
  const auth = useSelector((state) => state.subscription_auth);

  return (
    <div className="fixed w-full top-0 lg:top-[1rem] left-0 z-30">
      <div
        style={{
          background: "linear-gradient(to right, #2563eb, #1c4dba, #163f9c)",
        }}
        className="flex justify-between items-center border border-[#2563eb] w-full lg:w-[80%] mx-auto lg:rounded-full px-4 lg:px-16"
      >
        <Link to="/">
          <img
            className="w-[8rem] h-[5rem] object-cover invert"
            src="/logo.png"
            alt="logo"
          ></img>
        </Link>
        <ul className="hidden lg:flex flex-1 gap-8 ml-10">
          <Link to="/">
            <li className="subscription-font text-lg font-light hover:underline cursor-pointer text-white">
              Home
            </li>
          </Link>
          <Link to="/pricing">
            <li className="subscription-font text-lg font-light hover:underline cursor-pointer text-white">
              Pricing & Features
            </li>
          </Link>
          <Link to="/contact">
            <li className="subscription-font text-lg font-light hover:underline cursor-pointer text-white">
              Support
            </li>
          </Link>
        </ul>
        <div className="hidden lg:block space-x-2">
          {(auth?.account?.account_type === "subscription" ||
            (auth?.account?.account_type === "trial" &&
              auth?.account?.trial_started)) && (
            <Link to={"/sign-in"}>
              <button className="subscription-font px-4 py-2 border border-white rounded-full bg-white text-black ease-in-out duration-500 hover:bg-transparent hover:text-white">
                Dashboard
              </button>
            </Link>
          )}
          {!auth?.id && (
            <Link to={"/sign-in"}>
              <button className="subscription-font px-4 py-2 border border-white rounded-full bg-white text-black ease-in-out duration-500 hover:bg-transparent hover:text-white">
                Employee Login
              </button>
            </Link>
          )}
        </div>

        <div className="visible flex-1 flex justify-end lg:hidden text-white text-4xl cursor-pointer">
          <div onClick={() => setShowMenu((prev) => !prev)}>
            {showMenu ? <ImMenu4 /> : <ImMenu3 />}
          </div>
        </div>

        {!auth?.id && (
          <div className="ml-4 cursor-pointer">
            <Link to={"/sign-in"}>
              <button className="subscription-font px-4 py-2 border border-white rounded-full bg-white text-black ease-in-out duration-500 hover:bg-transparent hover:text-white">
                Admin Login
              </button>
            </Link>
          </div>
        )}
        {auth?.id && (
          <div
            className="ml-4 cursor-pointer"
            onClick={() => setShowUserDetailsMenu((prev) => !prev)}
          >
            <FaUserCircle color="white" size="40px" />
          </div>
        )}
      </div>

      {showMenu && (
        <div className="visible lg:hidden">
          <ul className="bg-white w-full flex flex-col gap-2 px-5 py-5">
            <Link to="/">
              <li className="subscription-font text-lg cursor-pointer hover:underline">
                Home
              </li>
            </Link>
            <Link to="/pricing">
              <li className="subscription-font text-lg cursor-pointer hover:underline">
                Pricing & Features
              </li>
            </Link>
            <Link to="/contact">
              <li className="subscription-font text-lg cursor-pointer hover:underline">
                Support
              </li>
            </Link>
            {(auth?.account?.account_type === "subscription" ||
              (auth?.account?.account_type === "trial" &&
                auth?.account?.trial_started)) && (
              <Link to={process.env.REACT_APP_CRM_URL}>
                <li className="subscription-font text-lg cursor-pointer hover:underline">
                  Dashboard
                </li>
              </Link>
            )}
            {!auth?.id && (
              <Link to={"/crm"}>
                <button className="subscription-font px-4 py-2 border border-white rounded-full bg-white text-black ease-in-out duration-500 hover:bg-transparent hover:text-white">
                  Employee Login
                </button>
              </Link>
            )}
          </ul>
        </div>
      )}

      {showAuthenticationMenu && (
        <Authentication hideModal={() => setShowAuthenticationMenu(false)} />
      )}
      {showUserDetailsMenu && (
        <UserDetails hideModal={() => setShowUserDetailsMenu(false)} />
      )}
    </div>
  );
};

export default Header;
