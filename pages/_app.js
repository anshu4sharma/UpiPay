import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopLoader from "../components/TopLoader";
import { SessionProvider } from "next-auth/react"
import { Toaster } from 'react-hot-toast';
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <TopLoader />
        <Navbar />
        <Toaster />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
}

export default MyApp;
