import React from "react";
import Head from "next/head";
import Hero from "../components/Hero";
import CollectPayment from "../components/CollectPayment";
import Maintaince from "../components/Maintaince";
// //  it will disable javascipt for this page only in production
export const config = {
  unstable_runtimeJS: false,
};
const Home = () => {
  return (
    <>
      <Head>
        <title>UpiPay</title>
        <meta
          name="description"
          content="Collect Online Payments from anywhere in India. Create Payment Link Via Upi Pay Payment Links"
        />
        <meta property="og:title" content="Upi Pay Payment Links" />
        <meta
          property="og:description"
          content="Collect Online Payments from anywhere in India. Create Payment Link Via Upi Pay Payment Links"
        />
        <meta property="og:url" content="https://upipayy.vercel.app/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <CollectPayment />
      <Maintaince />
    </>
  );
};

export default Home;
