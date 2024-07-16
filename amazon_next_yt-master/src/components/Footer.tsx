import Image from "next/image";
import logo from "../images/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-amazon_light text-gray-300 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <span className="ml-3 text-lg font-semibold">Ruth Tadesse</span>
        </div>
        <div className="flex flex-col items-center md:flex-row md:gap-4 mt-4 md:mt-0">
          <p className="text-sm">
            &copy; 2024 Ruth Tadesse. All rights reserved.
          </p>
          <div className="flex gap-3 mt-2 md:mt-0">
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:text-white"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              className="hover:text-white"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:text-white"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              className="hover:text-white"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
