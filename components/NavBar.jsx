import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { auth } from "../firebase-config";

const NavBar = ({ user }) => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-black fixed left-0 top-0 w-full z-10 ease-in duration-300">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center px-4 py-4 text-white md:py-3">
        <Link href="/">
          <h1 className="font-bold lg:text-4xl md:text-2xl cursor-pointer">
            Blogify
          </h1>
        </Link>
        <ul className="hidden sm:flex text-xl font-medium items-center justify-center">
          <li className="lg:p-4 lg:text-2xl hover:scale-110 md:px-2 pt-auto md:text-xl">
            <Link href="/">Home</Link>
          </li>
          {/* <li className="lg:p-4 lg:text-2xl hover:scale-110 md:px-2 md:pt-4 md:text-xl">
            <Link href="/trending">Trending</Link>
          </li>
          <li className="lg:p-4 lg:text-2xl hover:scale-110 md:px-2 md:pt-4 md:text-xl">
            <Link href="/latest">Latest</Link>
          </li> */}
          <li className="lg:p-4 lg:text-2xl hover:scale-110 md:px-2 pt-auto md:text-xl">
            <Link href="/categories/technology">Technology</Link>
          </li>
          <li className="lg:p-4 lg:text-2xl hover:scale-110 md:px-2 pt-auto md:text-xl">
            <Link href="/categories/health">Health</Link>
          </li>
          <li className="lg:p-4 lg:text-2xl hover:scale-110 md:px-2 pt-auto md:text-xl">
            <Link href="/categories/sports">Sports</Link>
          </li>
        </ul>
        <ul className="hidden sm:flex items-center justify-center">
          {user ? (
            <>
              <Link
                href="/createpost"
                className="px-4 hover:scale-110 bg-white text-black rounded-md font-bold md:p-2 md:text-xl lg:py-3 lg:text-2xl mr-5 cursor-pointer"
              >
                Create Blog
              </Link>
              <Link
                href="/"
                className="px-4 hover:scale-110 bg-white text-black rounded-md font-bold md:p-2 md:text-xl lg:py-3 lg:text-2xl"
                onClick={() => auth.signOut()}
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 hover:scale-110 bg-white text-black rounded-md font-bold md:p-2 md:text-xl lg:py-3 lg:text-2xl"
              >
                Login
              </Link>
            </>
          )}
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <ul>
            <li onClick={handleNav} className="p-4 text-4xl">
              <Link href="/">Home</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl">
              <Link href="/categories/technology">Technology</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl">
              <Link href="/categories/health">Health</Link>
            </li>
            <li onClick={handleNav} className="p-4 text-4xl">
              <Link href="/categories/sports">Sports</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
