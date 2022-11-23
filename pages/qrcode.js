import { useFormik } from "formik";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import createqrCodeSchema from "../formSchemas/createqrCodeSchema";
import { useSession } from "next-auth/react";
import QRCode from "react-qr-code";
import axios from "axios";
import HeaderLogo from "../components/HeaderLogo";
const MyQrCode = () => {
  const { data: session } = useSession({
    required: false,
  });
  const { handleSubmit, values, handleChange, touched, errors, resetForm } =
    useFormik({
      initialValues: {
        upiId: "",
      },
      validationSchema: createqrCodeSchema,
      onSubmit: () => {
        let callback = submitForm();
        toast.promise(callback, {
          loading: "Saving!",
          error: "error occurs in data",
          success: "Successfully saved !",
        });
      },
    });
  const submitForm = async () => {
    try {
      await axios({
        method: "post",
        url: "https://anshu.up.railway.app/genlink/saveqrcode",
        headers: { "Content-Type": "application/json" },
        data: {
          upiId: values.upiId,
          merchantId: session?.user.email,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      resetForm();
    }
  };
  const fetchQrCode = async () => {
    const data = await axios.get(
      `https://anshu.up.railway.app/genlink/getqrcode/${session?.user.email}`
    );
    console.log(data.data);
  };
  useEffect(() => {
    fetchQrCode();
  }, [session]);

  return (
    <>
      <Head>
        <title>Accept Payments using Qr Code</title>
        <meta
          name="description"
          content="Collect Online Payments from anywhere in India. Create Qr Code Via Upi Pay Qr Code. Accept Payments using UpiPay Qr Code"
        />
        <meta
          property="og:title"
          content="Accept Payments using UpiPay Qr Code"
        />
        <meta
          property="og:description"
          content="Accept Payments using UpiPay Qr Code"
        />
        <meta property="og:url" content="https://upipayy.vercel.app/myqr" />
        <meta property="og:type" content="website" />
      </Head>
      <section className="bg-white">
        <div className="py-8 w-full lg:py-10 px-4 flex items-center justify-center flex-col gap-4">
        <span class="inline-block py-1.5 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-blue-600 text-white rounded">Coming Soon!</span>
          <div className="bg-[url('../assets/qrcodemockup.svg')] flex flex-col items-center justify-evenly py-4 my-4 h-72 w-96 bg-no-repeat bg-center bg-cover"> 
            <HeaderLogo />
            <QRCode value={"sadasd"} size={120} />
            <p className="font-bold text-xl">Anshu Sharma</p>
          </div>

          {/* <div className="my-4">
            <form onSubmit={handleSubmit}>
              <input
                name="upiId"
                onChange={handleChange}
                value={values.upiId}
                type="text"
                placeholder="Enter your Upi Id"
              />
              {errors.upiId && touched.upiId ? (
                <p className="text-red-900">{errors.upiId}</p>
              ) : null}
              <button
                type="submit"
                className="block w-full rounded-lg transition bg-[#002970] px-5 my-4 py-3 text-sm font-medium text-white"
              >
                Save QR Code
              </button>
            </form>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default MyQrCode;
