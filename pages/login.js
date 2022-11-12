import Link from "next/link";
import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import loginSchema from "../formSchemas/loginSchema";
import logo from "../assets/lootie.svg";
import Image from "next/image";
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
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="sm:mt-0 mt-16 mx-auto max-w-lg">
          <form
            class="sm:mt-0 sm:gap-0 grid gap-3 mt-16 mb-0 space-y-4 rounded-lg p-8 sm:shadow-2xl"
            onSubmit={handleSubmit}
          >
            <div className="flex text-center w-full flex-col">
              <Image
                alt="logo"
                className="animate-bounce self-center"
                src={logo}
                width="80"
              />
              <p class="text-2xl font-medium">Sign in to your account</p>
            </div>
            <div>
              <label for="email" class="text-sm font-medium">
                Email
              </label>
              <div class="relative mt-1">
                <input
                  type="email"
                  class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
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
              <label for="password" class="text-sm font-medium">
                Password
              </label>

              <div class="relative mt-1">
                <input
                  class="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
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
              <button className="cursor-progress animate-pulse w-full bg-teal-600 rounded-3xl p-2 text-white font-bold transition duration-200 hover:bg-[#003087]">
                Processing...
              </button>
            ) : (
              <button
                type="submit"
                class="block w-full rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
              >
                Log in
              </button>
            )}

            <p class="text-center text-sm text-gray-500">
              No account?
              <Link class="underline" href="signup">
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
