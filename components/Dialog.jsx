import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
const DialogBox = ({ closeModal, isOpen, linkuid }) => {
  let link = `https://upipay.anshusharma.me/pay/${linkuid}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast.success("Copied Successfully !");
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-10">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen border-xl border-black">
              &#8203;
            </span>
            <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div className="flex items-center justify-center ">
                  <div className="mt-4 text-center">
                    <h3
                      className="font-bold leading-6 text-gray-800 capitalize"
                      id="modal-title"
                    >
                      🎉 Your link is successfully created 🎉{" "}
                    </h3>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="text-sm text-gray-700" htmlFor="share link">
                    Share link
                  </label>
                  <div className="flex items-center mt-2 -mx-1">
                    <p className="text-center items-center flex flex-1 h-10 px-4 mx-1 text-sm text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring">
                      {link}
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 sm:flex sm:items-center sm:-mx-2">
                  <Link
                    href={link}
                    target="_blank"
                    className="flex items-center justify-center w-full px-2 py-1 text-blue-500 border border-blue-500 transition-colors duration-300 transform bg-white rounded-md focus:outline-none sm:w-auto sm:mx-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 mx-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span className="mx-1">View</span>
                  </Link>
                  <button
                    onClick={copyToClipboard}
                    className="w-full px-4 py-2 mt-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 justify-center flex"
                  >
                    Copy
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={closeModal}
                    className="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DialogBox;
