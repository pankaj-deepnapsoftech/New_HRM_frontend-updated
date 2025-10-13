import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const HEADER_LINKS = [
  { name: "Solutions", to: "/" },
  { name: "Features", to: "/#features" },
  { name: "Pricing", to: "/subscription" },
  { name: "Contact", to: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Logo Only (no brand text) */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Deepnap HRM" className="h-16 w-auto" />
          </Link>
        </div>
        {/* Center Navigation */}
        <nav className="hidden md:flex gap-6 ml-12">
          {HEADER_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="font-medium text-blue-900 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        {/* Right Buttons */}
        <div className="flex items-center gap-2">
          <Link to="/sign-in">
            <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-700 transition">
              Admin Login
            </button>
          </Link>
          <Link to="/sign-in">
            <button className="border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded-md font-semibold bg-white hover:bg-blue-50 transition">
              Employee Login
            </button>
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-4 text-blue-700 text-3xl"
          onClick={() => setMobileOpen((m) => !m)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>
      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur border-b border-blue-50 py-4 px-4 shadow absolute top-full inset-x-0 z-50">
          <nav className="flex flex-col gap-3">
            {HEADER_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="font-medium text-blue-900 hover:text-blue-600 transition"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex gap-3 mt-4">
              <Link to="/sign-in">
                <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md font-semibold shadow hover:bg-blue-700 transition">
                  Admin Login
                </button>
              </Link>
              <Link to="/sign-in">
                <button className="border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded-md font-semibold bg-white hover:bg-blue-50 transition">
                  Employee Login
                </button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;