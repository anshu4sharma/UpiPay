import React from "react";
const Sidebar = () => {
  return (
    <>
      <div class="flex h-screen  flex-col justify-between border-r bg-white">
        <div class="px-4 py-6">
          <nav aria-label="Main Nav" class="mt-6 flex flex-col space-y-1">
            <a
              href="#"
              class="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
            >
              <span class="ml-3 text-sm font-medium"> General </span>
            </a>
            <details class="group">
              <summary class="flex cursor-pointer items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span class="ml-3 text-sm font-medium"> Teams </span>
                <span class="ml-auto shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <nav aria-label="Teams Nav" class="mt-1.5 ml-8 flex flex-col">
                <a
                  href="#"
                  class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>

                  <span class="ml-3 text-sm font-medium"> Banned Users </span>
                </a>

                <a
                  href="#"
                  class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 opacity-75"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>

                  <span class="ml-3 text-sm font-medium"> Calendar </span>
                </a>
              </nav>
            </details>

            <a
              href="#"
              class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="ml-3 text-sm font-medium"> Billing </span>
            </a>

            <a
              href="#"
              class="flex items-center rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="ml-3 text-sm font-medium"> Invoices </span>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
