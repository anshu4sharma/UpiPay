import Image from "next/image";
import Link from "next/link";
import banner from "../assets/banner.webp";
const Hero = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-10 py-4 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="inline-block title-font clear-both mt-0 mb-8 py-1 px-4 text-center bg-[#e6f7ff] rounded-xl">
            Upi Pay Payment Links
          </h1>
          <h1 className="font-extrabold title-font sm:text-5xl text-3xl mb-4  text-gray-900">
            Collect Online Payments from anywhere in India.
          </h1>
          <h1 className="font-extrabold leading-10 sm:text-5xl text-3xl mb-4 text-[#277dfd]">
            No Coding Required.
          </h1>
          <Link
            className=" bg-[#002970] text-white cursor-pointer font-bold rounded-3xl	 inline-flex py-5 pl-12 pr-16 no-underline whitespace-no-wrap"
            href={"/genlink"}
          >
            Get Payment Link
          </Link>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 ">
          <Image alt="hero" src={banner} height="500" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
