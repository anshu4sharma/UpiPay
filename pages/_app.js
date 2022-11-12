import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
