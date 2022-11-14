import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import logo from "../assets/lootie.svg";
import Image from "next/image";
import signupSchema from "../formSchemas/signupSchema";
import { useRouter } from "next/router";
const Signup = () => {
  const router = useRouter();
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
        router.push({ pathname: "/verify", query: { email: values.email } });
      }
    } catch (error) {
      setIserror(true);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <>
      <div className="mx-auto sm:mt-0 mb-16 max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <form
            className="sm:gap-0 grid gap-3  mb-0 space-y-4 rounded-lg p-8 "
            onSubmit={handleSubmit}
          >
            <div className="flex text-center w-full flex-col">
              <div className="text-4xl mb-4 font-semibold">
                Upi<span className="text-[#00b9f5]">Pay</span>
              </div>
              <p className="text-xl font-medium">Sign Up</p>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Name
              </label>
              <div className="relative mt-1">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-3 pr-12 text-sm shadow-sm"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange}
                  name="name"
                  autoComplete="on"
                />
                {errors.name && touched.name ? (
                  <p className="text-red-900">{errors.name}</p>
                ) : null}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 pr-12 text-sm shadow-sm"
                placeholder="E-Mail"
                value={values.email}
                onChange={handleChange}
                name="email"
                type={"email"}
                autoComplete="on"
              />
              {errors.email && touched.email ? (
                <p className="text-red-900">{errors.email}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                className="w-full rounded-lg border-gray-200 p-3 pr-12 text-sm shadow-sm"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                name="password"
                autoComplete="on"
                type={"password"}
              />
              {errors.password && touched.password ? (
                <p className="text-red-900">{errors.password}</p>
              ) : null}
            </div>
            {iserror && (
              <p className="text-red-900">
                User with email id already exists !
              </p>
            )}
            {isloading ? (
              <button className="cursor-progress block w-full rounded-lg bg-[#002970] px-5 py-3 text-sm font-medium text-white">
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                className="block w-full rounded-lg bg-[#002970] px-5 py-3 text-sm font-medium text-white"
              >
                Sign Up
              </button>
            )}
            <p className="text-center text-sm text-gray-500">
              Already have an account?
              <Link className="underline" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
