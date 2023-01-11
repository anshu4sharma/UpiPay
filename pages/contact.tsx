import { useFormik } from "formik";
import React from "react";
import contactPageSchema from "../formSchemas/contactpageSchema";
import axios from "axios";
import toast from "react-hot-toast";
import Head from "next/head";
import { useMutation } from "@tanstack/react-query";
const Contact = () => {
  const to: string = "anshusharma6327@gmail.com";
  const submitForm = useMutation({
    mutationFn: () => {
      return axios.post("https://nodemailer-gmail-cze6.vercel.app/mail", {
        subject: values.subject,
        to: to,
        htmlContent: `<h2>From : ${values.email}</h2> <br/> ${values.message} `,
      });
    },
    onMutate: () => {
      toast.loading("sending!", {
        id: "loading",
      });
    },
    onSuccess: () => {
      toast.success("Sucessfully sent!", {
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
  const { handleSubmit, values, handleChange, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        subject: "",
        email: "",
        message: "",
      },
      validationSchema: contactPageSchema,
      onSubmit: () => {
        submitForm.mutate();
      },
    });

  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <section className="bg-white">
        <div className="py-8 lg:py-10 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
            Contact Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <input
                type="email"
                onChange={handleChange}
                value={values.email}
                autoComplete="on"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                placeholder="hello@anshusharma.me"
              />
              {errors.email && touched.email ? (
                <p className="text-red-900">{errors.email}</p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                onChange={handleChange}
                value={values.subject}
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                placeholder="Let us know how we can help you"
              />
              {errors.subject && touched.subject ? (
                <p className="text-red-900">{errors.subject}</p>
              ) : null}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                onChange={handleChange}
                value={values.message}
                rows={6}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Leave a comment..."
              ></textarea>
              {errors.message && touched.message ? (
                <p className="text-red-900">{errors.message}</p>
              ) : null}
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[#002970] sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
