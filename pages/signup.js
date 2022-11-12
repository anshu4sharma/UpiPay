import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import signupSchema from "../formSchemas/signupSchema";
const Signup = () => {
  const [iserror, setIserror] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const { handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    validationSchema: signupSchema,
    onSubmit: () => {
      submitForm();
    },
  });
  const submitForm = async () => {
    try {
      setIsloading(true);
      let data = await axios({
        method: "post",
        url: "https://anshu.up.railway.app/users",
        headers: { "Content-Type": "application/json" },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });
      if (data.status === 200) {
        localStorage.setItem("name", values.name);
        // setIsloading(false);
        // navigate("/verify", { state: { email: values.email } });
      }
      console.log(data);
    } catch (error) {
      setIserror(true);
      setIsloading(false);
    }
  };

  return (
    <>
      <div className="signup flex  justify-center items-center bg-transparent">
        <div className="p-2 border-slate-200 rounded-md flex flex-col items-center space-y-3">
          <span className="ml-3 font-black text-3xl"> Sign Up</span>
          <form
            className="border-slate-200 rounded-md flex flex-col items-center space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="Name">Name</label>
              <input
                className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Name"
                value={values.name}
                onChange={handleChange}
                name="name"
                autoComplete="on"
              />
              {errors.name && touched.name ? (
                <p color="error">{errors.name}</p>
              ) : null}
            </div>
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
                <p color="error">{errors.email}</p>
              ) : null}
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="Password">Password</label>
              <input
                className="p-3 border-[1px] border-slate-500 rounded-sm w-80"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                name="password"
                autoComplete="on"
              />
              {errors.password && touched.password ? (
                <p color="error">{errors.password}</p>
              ) : null}
            </div>
            {iserror && (
              <p color="error">User with email id already exists !</p>
            )}

            {isloading ? (
              <button
                className="animate-pulse w-full bg-[#4D5DFA]  rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]"
                disabled
              >
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#4D5DFA] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]"
              >
                Sign Up
              </button>
            )}
          </form>

          <div className="flex flex-col space-y-5 w-full">
            <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
              <div className="-m4-1 font-bod bg-transparent px-5 absolute">
                Or
              </div>
            </div>
            <Link
              href={"/login"}
              className="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#4D5DFA] font-bold transition duration-200"
            >
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
