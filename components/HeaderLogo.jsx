const HeaderLogo = ({ text }) => {
  return (
    <div className="flex text-center w-full flex-col">
      <div className="flex text-center w-full flex-col">
        <div className="text-2xl font-extrabold">
          Upi<span className="text-[#2d81e0]">Pay</span>
        </div>
        <p className="text-xl font-medium">{text}</p>
      </div>
    </div>
  );
};

export default HeaderLogo;
