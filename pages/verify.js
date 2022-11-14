import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import otpSchema from "../formSchemas/otpSchema";
import logo from "../assets/lootie.svg";
import { useRouter } from "next/router";
const Verify = () => {
  const router = useRouter();
  const [iserror, setIserror] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const { handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpSchema,
    onSubmit: () => {
      fetchData();
    },
  });
  const fetchData = async () => {
    try {
      setIsloading(true);
      let data = await axios({
        method: "post",
        url: "https://anshu.up.railway.app/users/verify",
        headers: { "Content-Type": "application/json" },
        data: { email: router.query.email, otp: values.otp },
      });
      if (data.status == 200) {
        console.log("succes");
      }
    } catch (error) {
      setIsloading(false);
        setIserror(true);
    }
  };
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="sm:mt-0 mb-24 mx-auto max-w-lg">
          <form
            className="sm:mt-0 sm:gap-0 grid gap-3 mt-16 mb-0 space-y-4 rounded-lg p-8 "
            onSubmit={handleSubmit}
          >
            <div className="flex text-center w-full flex-col">
              <Image
                alt="logo"
                className="animate-bounce self-center"
                src={logo}
                width="80"
              />
              <p className="text-2xl font-medium">Sign in to your account</p>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  value={router.query.email}
                  name="email"
                  disabled
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Otp
              </label>
              <div className="relative mt-1">
                <input
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Otp"
                  value={values.otp}
                  onChange={handleChange}
                  name="otp"
                  type="number"
                  autoComplete="on"
                />

                {errors.otp && touched.otp ? (
                  <p className="text-red-900">{errors.otp}</p>
                ) : null}
              </div>
            </div>
            {iserror && (
              <p className="text-red-900">Please enter valid Otp</p>
            )}

            {isloading ? (
              <button className="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white transition">
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
              >
                Verify
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify;
