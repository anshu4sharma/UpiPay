import React from "react";
import Head from "next/head";
import Hero from "../components/Hero";
import CollectPayment from "../components/CollectPayment";
import Script from "next/script";
// //? it will disable javascript for this page only in production
// export const config = {
//   unstable_runtimeJS: false,
// };

const Home = () => {
  return (
    <>
     <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4780451799247980"
        crossOrigin="anonymous" />
      <ins className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4780451799247980"
        data-ad-slot="3837492401"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
      <Script id="indexpagead">
        (adsbygoogle = window.adsbygoogle || []).push({ });
      </Script>
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
