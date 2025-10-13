import {
  AiFillYoutube,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

const Footer = () => {
  const socialLinks = [
    { icon: <BsFacebook />, to: "https://www.facebook.com/deepnapsoftech" },
    {
      icon: <AiFillInstagram />,
      to: "https://www.instagram.com/deepnapsoftech/",
    },
    { icon: <AiFillTwitterCircle />, to: "https://twitter.com/deepnapsoftech" },
    { icon: <AiFillYoutube />, to: "https://www.youtube.com/@deepnap_softech" },
  ];

  const developmentLinks = [
    { label: "Website Design", to: "/web-design" },
    { label: "Logo Design", to: "/logo-development" },
    { label: "Web Development", to: "/web-development" },
    { label: "Software Development", to: "/software" },
    { label: "App Development", to: "/app-dev" },
    { label: "CRM Development", to: "/crm-dev" },
  ];

  const marketingLinks = [
    { label: "Meta Ads", to: "/meta-ads" },
    { label: "Google Ads", to: "/google-ads" },
    { label: "Email Marketing", to: "/email-marketing" },
    { label: "Content Marketing", to: "/content-Marketing" },
    { label: "SEO & SEM", to: "/seo&smo" },
    { label: "PPC", to: "/ppc" },
  ];

  const brandLinks = [
    { label: "Brand Building", to: "/brand" },
    { label: "Public Relations", to: "/public-relation" },
    { label: "ORM", to: "/orm" },
    { label: "Digital Marketing", to: "/digital-marketing" },
    { label: "Influencer Marketing", to: "/influence" },
    { label: "Social Media Presence", to: "/socialmedia" },
  ];

  const legalLinks = [
    { label: "Book Demo", to: "/contact" },
    { label: "Privacy Policy", to: "/policy" },
    { label: "Terms & Conditions", to: "/terms" },
  ];

  return (
    <footer
      id="footer"
      style={{
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
      }}
      className="text-white border-t-2 px-6 pt-10 pb-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Logo & Social */}
        <div>
          <img
            src="/logo.png"
            alt="logo"
            className="w-36 h-auto mb-4 filter invert"
          />
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
          <p className="text-xs">© 2023 Deepnap Softech</p>
        </div>

        {/* Link Sections */}
        {renderLinksSection("DEVELOPMENT", developmentLinks, "development")}
        {renderLinksSection(
          "DIGITAL MARKETING",
          marketingLinks,
          "digital-marketing"
        )}
        {renderLinksSection("BECOME BRAND", brandLinks, "become-a-brand")}
        {renderLinksSection("LEGAL", legalLinks)}
      </div>

      <div className="border-t mt-8 pt-3 text-center text-sm">
        All rights reserved: <b>Deepnap Softech</b> Powered By{" "}
        <b>Dryish ERCS</b>
      </div>
    </footer>
  );
};

export default Footer;

const renderLinksSection = (title, links, parentRoute) => (
  <div>
    <p className="font-semibold text-lg mb-2">{title}</p>
    <nav className="flex flex-col space-y-2 text-sm">
      {links.map((link, index) => (
        <a
          key={index}
          target="_blank"
          rel="noreferrer"
          className="hover:opacity-75"
          href={
            parentRoute
              ? `https://www.deepnapsoftech.com/service/${parentRoute}${link.to}`
              : link.to
          }
        >
          {link.label}
        </a>
      ))}
    </nav>
  </div>
);
