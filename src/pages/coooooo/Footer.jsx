import {
  AiFillYoutube,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  const socialLinks = [
    { icon: <BsFacebook />, to: "https://www.facebook.com/deepnapsoftech" },
    { icon: <AiFillInstagram />, to: "https://www.instagram.com/deepnapsoftech/" },
    { icon: <AiFillTwitterCircle />, to: "https://twitter.com/deepnapsoftech" },
    { icon: <AiFillYoutube />, to: "https://www.youtube.com/@deepnap_softech" },
  ];

  const hrmLinks = [
    { label: "Employee Management", to: "/hrm-employee-management" },
    { label: "Payroll Processing", to: "/hrm-payroll" },
    { label: "Attendance & Leave", to: "/hrm-attendance" },
    { label: "Performance Reviews", to: "/hrm-performance" },
    { label: "Document Generation", to: "/hrm-documents" },
    { label: "HR Analytics", to: "/hrm-analytics" },
    { label: "ESS Portal", to: "/hrm-ess" },
  ];

  const resourceLinks = [
    { label: "Book HR Demo", to: "/contact" },
    { label: "Why Deepnap HRM?", to: "/why-hrm" },
    { label: "Implementation", to: "/hrm-implementation" },
    { label: "FAQs", to: "/hrm-faq" },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Privacy Policy", to: "/policy" },
  ];

  return (
    <footer
      id="footer"
      style={{ background: "linear-gradient(to right, #2563eb, #1c4dba, #163f9c)" }}
      className="text-white border-t-2 px-6 pt-10 pb-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo & Social */}
        <div>
          <img src="/logo.png" alt="logo" className="w-36 h-auto mb-4 filter invert" />
          <div className="flex space-x-4 text-2xl mb-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.to}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition"
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className="text-xs mb-1">Deepnap HRM &ndash; Simplifying HR, Payroll & Compliance for Modern Teams.</p>
          <p className="text-xs">HRM platform by Deepnap Softech</p>
        </div>

        {/* HRM Features */}
        <LinksSection title="HRM FEATURES" links={hrmLinks} />
        <LinksSection title="RESOURCES" links={resourceLinks} />
        <LinksSection title="LEGAL" links={legalLinks} />
      </div>

      <div className="border-t mt-8 pt-3 text-center text-sm">
        &copy; {new Date().getFullYear()} Deepnap Softech. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

const LinksSection = ({ title, links }) => (
  <div>
    <p className="font-semibold text-lg mb-2">{title}</p>
    <nav className="flex flex-col space-y-2 text-sm">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.to}
          className="hover:opacity-75"
          target={link.to.startsWith('http') ? '_blank' : undefined}
          rel={link.to.startsWith('http') ? 'noreferrer' : undefined}
        >
          {link.label}
        </a>
      ))}
    </nav>
  </div>
);
