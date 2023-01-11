import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import paymentLinkSchema from "../formSchemas/paymentLinkSchema";
import axios from "axios";
import toast from "react-hot-toast";
const Dialog = dynamic(() => import("../components/Dialog"), {
  ssr: false,
});
import { useSession } from "next-auth/react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useMutation } from "@tanstack/react-query";
const Genlink = () => {
  const { data: session } = useSession();
  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [linkuid, setLinkuid] = useState<string>("");
  function closeModal(): void {
    setIsOpen(false);
  }
  const { handleSubmit, values, handleChange, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        upiId: "",
        amount: "",
        description: "",
      },
      validationSchema: paymentLinkSchema,
      onSubmit: () => {
        submitForm.mutate();
      },
    });
  const submitForm = useMutation({
    mutationFn: () => {
      return axios.post("https://anshu.up.railway.app/genlink", {
        ...values,
        merchantId: session?.user?.email,
      });
    },
    onMutate: () => {
      toast.loading("Creating!", {
        id: "loading",
      });
    },
    onSuccess: (data) => {
      setLinkuid(data.data.uid);
      setIsOpen(true);
      toast.success("Sucessfully created!", {
        id: "loading",
      });
    },
    onError: () => {
      toast.error("An error occured try again !", {
        id: "loading",
      });
    },
    onSettled: () => {
      resetForm();
    },
  });
  return (
    <>
      <Head>
        <title>Create Payment Link</title>
        <meta
          name="description"
          content="Collect Online Payments from anywhere in India. Create Payment Link UpiPay Payment Links"
        />
        <meta
          property="og:title"
          content="Create Payment Link with UpiPay Payment Links"
        />
        <meta
          property="og:description"
          content="Create Payment Link with UpiPay Payment Links"
        />
        <meta
          property="og:url"
          content="https://upipay.anshusharma.me/genlink"
        />
        <meta property="og:type" content="website" />
      </Head>
      <section className="text-gray-600 body-font relative">
        <Dialog isOpen={isOpen} closeModal={closeModal} linkuid={linkuid} />
        <div className="container px-5 py-8 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="md:w-1/2 rounded-lg sm:justify-center overflow-hidden sm:mr-10  flex  relative">
            <Image
              src={"/paymentlink.jpg"}
              width={"400"}
              height={"500"}
              className="w-full object-contain sm:w-[550px]"
              alt="img"
            />
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full mt-8 md:mt-0">
            <h2 className="text-gray-900 text-lg mb-1 font-bold title-font">
              Create a Payment Link
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="relative mb-2">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  id="name"
                  name="name"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-3 leading-4 transition-colors duration-200 ease-in-out"
                  value={values.name}
                />
                {errors.name && touched.name ? (
                  <p className="text-red-900">{errors.name}</p>
                ) : null}
              </div>
              <div className="relative mb-2">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Amount
                </label>
                <input
                  type="number"
                  onChange={handleChange}
                  id="amount"
                  name="amount"
                  value={values.amount}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-2 leading-4 transition-colors duration-200 ease-in-out"
                />
                {errors.amount && touched.amount ? (
                  <p className="text-red-900">{errors.amount}</p>
                ) : null}
              </div>
              {session?.user?.email && (
                <div className="relative mb-2">
                  <label
                    htmlFor="Email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <p className="py-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-2 leading-4 transition-colors duration-200 ease-in-out">
                    {session?.user?.email}
                  </p>
                </div>
              )}
              <div className="relative mb-2">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Upi Id
                </label>
                <input
                  type="text"
                  onChange={handleChange}
                  value={values.upiId}
                  id="upiId"
                  name="upiId"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-2 leading-4 transition-colors duration-200 ease-in-out"
                />
                {errors.upiId && touched.upiId ? (
                  <p className="text-red-900">{errors.upiId}</p>
                ) : null}
              </div>
              <div className="relative mb-2">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm text-gray-600"
                >
                  Purpose of payment
                </label>
                <input
                  value={values.description}
                  onChange={handleChange}
                  id="description"
                  type={"text"}
                  name="description"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-2 leading-4 transition-colors duration-200 ease-in-out"
                />
                {errors.description && touched.description ? (
                  <p className="text-red-900">{errors.description}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className="disabled:cursor-progress disabled:bg-[#294f91] w-full text-center flex justify-center rounded-lg transition bg-[#002970] px-5 py-3 text-sm font-medium text-white"
                disabled={submitForm.isLoading}
              >
                {submitForm.isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-indigo-500 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </>
                ) : (
                  "Generate Link"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Genlink;
