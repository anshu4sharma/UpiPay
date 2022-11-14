import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import loginSchema from "../formSchemas/loginSchema";
import { useContext } from "react";
import MerchantContext from "../context/MerchantContext";
import Router from "next/router";
const Login = () => {
  const user = useContext(MerchantContext);
  const [iserror, setIserror] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isEmailVerified, setisEmailVerified] = useState(false);
  const { handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: () => {
      fetchData();
    },
  });
  const fetchData = async () => {
    try {
      setIsloading(true);
      let data = await axios({
        method: "post",
        url: "http://localhost:4000/users/login",
        headers: { "Content-Type": "application/json" },
        data: { email: values.email, password: values.password },
        withCredentials: true, // Don't forget to specify this if you need cookies
      });
      if (data.status == 200) {
        localStorage.setItem("login",true)
       Router.push('/dashboard')
      }
    } catch (error) {
      setIserror(true);
    } finally {
      setIsloading(false);
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
              <div className="text-4xl mb-4 font-semibold" >
                Upi<span className="text-[#00b9f5]">Pay</span>
              </div>

              <p className="text-xl font-medium">Sign in to your account</p>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  className="w-full rounded-lg border-gray-200 p-3 pr-12 text-sm shadow-sm"
                  placeholder="E-Mail"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  autoComplete="on"
                />
                {errors.email && touched.email ? (
                  <p className="text-red-900">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  className="w-full rounded-lg border-gray-200 p-3 pr-12 text-sm shadow-sm"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  autoComplete="on"
                />
                {errors.password && touched.password ? (
                  <p className="text-red-900">{errors.password}</p>
                ) : null}
              </div>
            </div>
            {iserror && (
              <p className="text-red-900">Please enter valid credentials</p>
            )}
            {isEmailVerified && (
              <p className="text-red-900">You have not verified your email.</p>
            )}

            {isloading ? (
              <button className="block w-full rounded-lg bg-[#002970] px-5 py-3 text-sm font-medium text-white transition">
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="block w-full rounded-lg bg-[#002970] px-5 py-3 text-sm font-medium text-white"
              >
                Log in
              </button>
            )}

            <p className="text-center text-sm text-gray-500">
              No account? {""}
              <Link className="underline" href="/signup">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
