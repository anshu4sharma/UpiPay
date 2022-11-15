import Image from "next/image";
import React from "react";
import notfound from "../assets/notfound.svg";
const NotFound = () => {
  return (
    <>
      <div className="grid h-screen place-content-center bg-white">
        <div className="text-center">
          <Image src={notfound} width="400" alt="404" />
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>
          <p className="mt-4 text-gray-500">We can't find that page.</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
