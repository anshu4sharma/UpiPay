import Link from "next/link";
import HeaderLogo from "./HeaderLogo";
function Navbar() {
  return (
    <div className=" py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
         <div className="hidden sm:block m-0 p-0">
         <Link href={'/'}  className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <HeaderLogo/>
          </Link>
         </div>
          <nav className="md:ml-auto flex flex-wrap text-black items-center text-base justify-center">
            <Link href={'/'} className="mr-4 sm:mr-5 hover:text-gray-900 sm:font-bold">Home</Link>
            <Link href={'/genlink'} className="mr-4 sm:mr-5 hover:text-gray-900 sm:font-bold">Create Link</Link>
            <Link href={'/links'} className="mr-4 sm:mr-5 hover:text-gray-900 sm:font-bold">Payment Links</Link>
            <Link href={'/contact'} className="mr-4 sm:mr-5 hover:text-gray-900 sm:font-bold">Contact Us</Link>
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
