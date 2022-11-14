import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MerchantDetails from "../context/MechantDetails";
function MyApp({ Component, pageProps }) {
  return (
    <>
    <MerchantDetails>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </MerchantDetails>
    </>
  );
}

export default MyApp;
