import { Link } from "react-router-dom";
import { footerAccountLinks, footerInformationLinks } from "../../static/data";
import {
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillPinterest,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-[#292c31] text-white pt-12">
      <div className="w-[95%] sm:w-11/12 mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
        <div>
          <h2 className="text-lg font-semibold mb-4 tracking-wide">ABOUT US</h2>
          <p className="text-gray-300 mb-6">
            Welcome to Buyno, your trusted online marketplace for a wide variety
            of quality products. We are committed to providing excellent
            customer service, secure shopping, and fast delivery.
          </p>
          <div className="flex space-x-4">
            <a href="#facebook" aria-label="Facebook">
              <AiFillFacebook
                size={24}
                className="hover:text-orange-500 transition"
              />
            </a>
            <a href="#twitter" aria-label="Twitter">
              <AiOutlineTwitter
                size={24}
                className="hover:text-orange-500 transition"
              />
            </a>
            <a href="#link" aria-label="LinkedIn">
              <AiFillLinkedin
                size={24}
                className="hover:text-orange-500 transition"
              />
            </a>
            <a href="#yt" aria-label="YouTube">
              <AiFillYoutube
                size={24}
                className="hover:text-orange-500 transition"
              />
            </a>
            <a href="#pin" aria-label="Pinterest">
              <AiFillPinterest
                size={24}
                className="hover:text-orange-500 transition"
              />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4 tracking-wide">
            QUICK LINKS
          </h2>
          <ul className="space-y-2">
            {footerInformationLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.link}
                  className="text-gray-300 hover:text-orange-500 transition text-base"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4 tracking-wide">ACCOUNT</h2>
          <ul className="space-y-2">
            {footerAccountLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.link}
                  className="text-gray-300 hover:text-orange-500 transition text-base"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4 tracking-wide">
            NEWSLETTER
          </h2>
          <form className="mb-4">
            <input
              type="email"
              placeholder="Enter E-Mail Address"
              className="w-full px-4 py-3 rounded bg-transparent border border-gray-500 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-gray-700 transition text-white font-semibold py-3 rounded"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-700 py-6 bg-[#23262a]">
        <div className="w-[95%] sm:w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Buyno. Made with
            <span className="text-orange-500"> ♥ </span>by{" "}
            <a
              href="https://ahadali.me"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline hover:text-orange-500 transition"
            >
              Ahad Ali
            </a>
            .
          </span>
          <div className="flex items-center gap-2">
            <img
              src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
              alt="Payments"
              className="h-7"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
