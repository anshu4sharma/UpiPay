import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="w-full z-10">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center  mx-6  justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <h1 className=" font-bold text-xl cursor-pointer">
                  <Link href={"/"}>
                    Upi<span className="text-teal-500">Pay</span>
                  </Link>
                </h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    activeClass="Home"
                    href="/"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer text-teal-600 font-semibold px-3 py-2 text-md hover:font-black"
                  >
                    Home
                  </Link>
                  <Link
                    activeClass="about"
                    href="/"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-teal-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </Link>

                  <Link
                    activeClass="Services"
                    href="/signup"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer hover:bg-teal-600 text-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Signup
                  </Link>

                  <Link
                    activeClass="contact"
                    href="/login"
                    smooth={true}
                    offset={50}
                    duration={500}
                    className="cursor-pointer bg-teal-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-black"
                  >
                    Login
                  </Link>
                </div>
              </div>
            </div>
            <div className="mr-6 flex md:hidden ">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-teal-600 inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div
                ref={ref}
                className="bg-white px-2 pt-2 pb-3 space-y-1 sm:px-3"
              >
                <Link
                  href="/"
                  activeClass="home"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-teal-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Link
                  href="/genlink"
                  activeClass="about"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-teal-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Crate Payment Link
                </Link>

                <Link
                  href="/signup"
                  activeClass="services"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-teal-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Signup
                </Link>

                <Link
                  href="/contact"
                  activeClass="work"
                  smooth={true}
                  offset={50}
                  duration={500}
                  className="cursor-pointer hover:bg-teal-600 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;
