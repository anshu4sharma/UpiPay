import Image from "next/image";
import React, { useState } from "react";
import Ilustration from "../assets/paymentlink.jpg";
import { useFormik } from "formik";
import paymentLinkSchema from "../formSchemas/paymentLinkSchema";
import axios from "axios";
import Dialog from "../components/Dialog";
import { useSession, getSession } from 'next-auth/react'
const Genlink = () => {
  const { data: session } = useSession({ required: true })
  const [iserror, setIserror] = useState(false);
  const [isloading, setIsloading] = useState(false);
  let [isOpen, setIsOpen] = useState(false)
  let [linkuid, setLinkuid] = useState("")
  function closeModal() {
    setIsOpen(false)
  }
  const { handleSubmit, values, handleChange, touched, errors, resetForm } = useFormik({
    initialValues: {
      name: "",
      upiId: "",
      amount: "",
      description: "",
    },
    validationSchema: paymentLinkSchema,
    onSubmit: () => {
      submitForm();
    },
  });
  const submitForm = async () => {
    try {
      setIsloading(true);
      let data = await axios({
        method: "post",
        url: "https://anshu.up.railway.app/genlink",
        headers: { "Content-Type": "application/json" },
        data: {
          name: values.name,
          upiId: values.upiId,
          amount: values.amount,
          description: values.description,
          merchantId: session?.user.email,
        },
      });
      if (data.status === 200) {
        setIsOpen(true)
        setLinkuid(data.data.uid)
      }
    } catch (error) {
      console.log(error);
      setIserror(true);
    } finally {
      setIsloading(false);
      resetForm()
    }
  };

  return (
    <>
      <Dialog isOpen={isOpen} closeModal={closeModal} linkuid={linkuid} />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="md:w-1/2 rounded-lg sm:justify-center overflow-hidden sm:mr-10  flex  relative">
            <Image src={Ilustration} className="w-full object-contain sm:w-[400px]" alt="img" />
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
              <div className="relative mb-2">
                <label
                  htmlFor="Email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  value={session?.user.email}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-2 leading-4 transition-colors duration-200 ease-in-out"
                  disabled
                />
              </div>
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
                  type={'text'}
                  name="description"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-2 leading-4 transition-colors duration-200 ease-in-out"
                />
                {errors.description && touched.description ? (
                  <p className="text-red-900">{errors.description}</p>
                ) : null}
              </div>
              {
                iserror && <p className="text-red-900">Oops there was an error ! Please try again</p>
              }
              {isloading ? (
                <div class="flex items-center justify-center">
                  <button type="button"
                    class="w-full rounded-lg transition bg-[#002970] px-5 py-3 text-sm font-medium flex items-center leading-6 text-indigo-400 my-4 duration-150 ease-in-out border-2 border-indigo-400 shadow cursor-not-allowed"
                    disabled="">
                    <svg class="w-5 h-5 mr-3 -ml-1 text-indigo-500 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none"
                      viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                      </path>
                    </svg>
                    Loading...
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="block w-full rounded-lg transition bg-[#002970] px-5 py-3 text-sm font-medium text-white"
                >
                  Generate link
                </button>
              )}

            </form>
          </div>
        </div>
      </section>
    </>
  );
};
export default Genlink;

export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log(session);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }
  return {
    props: {
      session
    }
  }
}