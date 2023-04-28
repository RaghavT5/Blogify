import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-white text-base">
          Created with ❤ by{" "}
          <span className="hover:font-bold hover:text-lg duration-700">
            <a
              href="https://www.raghavtuli.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Raghav
            </a>
          </span>
          . © {currentYear}{" "}
          <span className="hover:font-bold hover:text-lg duration-700">
            <a
              href="https://github.com/RaghavT5/Blogify"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blogify
            </a>
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
