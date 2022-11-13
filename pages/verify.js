import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import loginSchema from "../formSchemas/loginSchema";
import logo from '../assets/lootie.svg'
const Verify = () => {
  const [iserror, setIserror] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [isEmailVerified, setisEmailVerified] = useState(false);
  const { handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      otp: "",
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
          <span className="ml-3 font-black text-3xl"> </span>
          <form
            className="border-slate-200 rounded-md flex flex-col items-center space-y-3"
            onSubmit={handleSubmit}
          >
            <Image alt="logo" className="animate-bounce" src={logo} width="80" />
            <div className="flex flex-col space-y-1">
              <label htmlhtmlFor="password">
                Please enter your verification code
              </label>
              <input
                className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                name="password"
                autoComplete="on"
              />
              {errors.otp && touched.otp ? (
                <p className="text-red-900">{errors.otp}</p>
              ) : null}
            </div>

            {iserror && <p className="text-red-900">Invalid otp</p>}

            {isloading ? (
              <button className="cursor-progress animate-pulse w-full bg-[#4D5DFA] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#4D5DFA] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]"
              >
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Verify;
