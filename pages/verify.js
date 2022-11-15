import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import otpSchema from "../formSchemas/otpSchema";
import HeaderLogo from '../components/HeaderLogo'
import { useRouter } from "next/router";
import toast from "react-hot-toast";
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
        toast("Verified SuccessFully")
        router.push('/login')
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
            <HeaderLogo text="Please enter the verification code" />
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
              <button className="block w-full rounded-lg bg-[#002970] px-5 py-3 text-sm font-medium text-white transition">
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="block w-full rounded-lg bg-[#002970]  px-5 py-3 text-sm font-medium text-white"
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
