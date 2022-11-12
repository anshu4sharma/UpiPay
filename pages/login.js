import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import loginSchema from "../formSchemas/loginSchema";
const Login = () => {
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
        url: "https://anshu.up.railway.app/users/login",
        headers: { "Content-Type": "application/json" },
        data: { email: values.email, password: values.password },
      });
      if (data.status == 200) {
        localStorage.setItem("authtoken", data.data.authToken);
        localStorage.setItem("IsLoggedin", true);
      }
    } catch (error) {
      setIsloading(false);
      if (error.response.status === 401) {
        setisEmailVerified(true);
      } else {
        setIserror(true);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center bg-transparent">
        <div className="p-2  border-slate-200 rounded-md flex flex-col items-center space-y-3">
          <span className="ml-3 font-black text-3xl"> Login</span>
          <form
            className="border-slate-200 rounded-md flex flex-col items-center space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">Email</label>
              <input
                className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
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
            <div className="flex flex-col space-y-1">
              <label htmlFor="password">Password</label>
              <input
                className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                name="password"
                autoComplete="on"
              />
              {errors.password && touched.password ? (
                <p className="text-red-900">{errors.password}</p>
              ) : null}
            </div>
            {iserror && (
              <p className="text-red-900">Please enter valid credentials</p>
            )}
            {isEmailVerified && (
              <p className="text-red-900">You have not verified your email.</p>
            )}

            {isloading ? (
              <button className="animate-pulse w-full bg-[#4D5DFA] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#4D5DFA] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]"
              >
                Log in
              </button>
            )}
          </form>
          <div className="flex flex-col space-y-5 w-full">
            <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
              <div className="-mt-0 font-bod bg-transparent px-5 absolute">
                Or
              </div>
            </div>
            <Link
              href={"/signup"}
              className="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#4D5DFA] font-bold transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
