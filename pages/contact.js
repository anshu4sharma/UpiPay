import { useFormik } from "formik";
import React from "react";
import contactPageSchema from "../formSchemas/contactpageSchema";
import axios from "axios";
import toast from "react-hot-toast";
const Contact = () => {
    const { handleSubmit, values, handleChange, touched, errors, resetForm } =
        useFormik({
            initialValues: {
                name: "",
                email: "",
                message: "",
            },
            validationSchema: contactPageSchema,
            onSubmit: () => {
                let callback = sendMessage();
                toast.promise(callback, {
                    loading: "Sending!",
                    error: "error occurs in data",
                    success: "Successfully sent !",
                });
            },
        });
    const sendMessage = async () => {
        const to = "anshusharma6327@gmail.com";
        try {
            await axios({
                method: "post",
                url: "https://nodemailer-gmail-cze6.vercel.app/mail",
                headers: { "Content-Type": "application/json" },
                data: { text: values.message, subject: values.email, to: to },
            });
        } catch (error) {
            console.log(error);
        } finally {
            resetForm();
        }
    };
    return (
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-8 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                            Contact Us
                        </h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label
                                            htmlFor="name"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            Name
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            value={values.name}
                                            autoComplete="on"
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                        {errors.name && touched.name ? (
                                            <p className="text-red-900">{errors.name}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="p-2 w-1/2">
                                    <div className="relative">
                                        <label
                                            htmlFor="email"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            Email
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            value={values.email}
                                            autoComplete="on"
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                        {errors.email && touched.email ? (
                                            <p className="text-red-900">{errors.email}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <div className="relative">
                                        <label
                                            htmlFor="message"
                                            className="leading-7 text-sm text-gray-600"
                                        >
                                            Message
                                        </label>
                                        <textarea
                                            onChange={handleChange}
                                            value={values.message}
                                            id="message"
                                            name="message"
                                            className="w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                        />
                                        {errors.message && touched.message ? (
                                            <p className="text-red-900">{errors.message}</p>
                                        ) : null}
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <button
                                        type="submit"
                                        className="flex mx-auto text-white bg-[#002970] border-0 py-2 px-8 focus:outline-none rounded text-lg"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                    <a
                                        href="mailto:anshusharma6327@gmail.com"
                                        className="text-indigo-500"
                                    >
                                        anshusharma6327@gmail.com
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
