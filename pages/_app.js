import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MerchantDetails from "../context/MechantDetails";
import TopLoader from "../components/TopLoader";
import { Toaster } from 'react-hot-toast';
function MyApp({ Component, pageProps }) {
  return (
    <>
      <MerchantDetails>
        <TopLoader />
        <Navbar />
        <Toaster />
        <Component {...pageProps} />
        <Footer />
      </MerchantDetails>
    </>
  );
}

export default MyApp;
