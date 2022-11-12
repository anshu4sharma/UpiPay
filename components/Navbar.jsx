import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../assets/logo.svg";
const Navbar = () => {
  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <Image alt="logo" src={logo} width="40" />
            <span className="ml-3 font-black text-xl"> Upi Pay</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href={"/"} className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link href={"/"} className="mr-5 hover:text-gray-900">
              Payment
            </Link>
            <Link href={"/login"} className="mr-5 hover:text-gray-900">
              Login
            </Link>
            <Link
              href={"/signup"}
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
