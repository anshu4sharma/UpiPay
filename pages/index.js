import React from "react";
import Head from "next/head";
import Hero from "../components/Hero";
import CollectPayment from "../components/CollectPayment";
// //  it will disable javascript for this page only in production
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
        <meta property="og:url" content="https://upipay.anshusharma.me/" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <CollectPayment />
    </>
  );
};

export default Home;
