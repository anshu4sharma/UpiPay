import Image from "next/image";
import React from "react";
import notfound from "../assets/notfound.svg";
Image;
const NotFound = () => {
  return (
    <>
      <div class="grid h-screen place-content-center bg-white">
        <div class="text-center">
          <Image src={notfound} width="400"  alt="404" />
          <h1 class="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </h1>
          <p class="mt-4 text-gray-500">We can't find that page.</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
