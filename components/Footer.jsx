const Footer = () => {
  return (
    <>
      <footer className="text-gray-600 body-font w-full">
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
