const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 body-font py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-14 w-full my-6">
        <div className="container mx-4 flex items-center  flex-col">
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:py-2 mt-4">
            © {new Date().getFullYear()} UpiPay
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
