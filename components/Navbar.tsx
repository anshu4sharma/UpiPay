import Link from "next/link";
import HeaderLogo from "./HeaderLogo";
function Navbar() {
  return (
    <div className=" py-5 mx-auto sm:max-w-xl md:max-w-full md:px-14">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap sm:p-5 flex-col md:flex-row items-center">
          <div className="hidden sm:block m-0 p-0">
            <Link href={'/'} className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <HeaderLogo />
            </Link>
          </div>
          <nav className="md:ml-auto gap-2 font-bold flex flex-wrap text-black items-center text-base justify-center">
            <Link href={'/'} className="sm:mr-5 hover:text-gray-900 sm:font-bold">Home</Link>
            <Link href={'/genlink'} className="sm:mr-5 hover:text-gray-900 sm:font-bold">Create Link</Link>
            <Link href={'/links'} className="sm:mr-5 hover:text-gray-900 sm:font-bold">Payment Links</Link>
            <Link href={'/contact'} className=" sm:mr-5 hover:text-gray-900 sm:font-bold">Contact Us</Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
