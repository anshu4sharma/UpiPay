import Image from "next/image";
import zerocharge from "../assets/zero.svg";
const Maintaince = () => {
  return (
    <section className="text-gray-600 body-font text-center">
        <div className="flex justify-center items-center w-full sm:max-w-6xl gap-16 flex-col rounded-3xl mx-auto mt-0 py-20 text-center bg-[#f2fbff]">
          <div className="font-bold flex flex-col text-2xl sm:text-4xl text-center text-black ">
            No Setup Fees, No Maintenance Charges
            <span className="font-bold text-2xl sm:text-4xl text-center text-black ">
              Grow Your Profits
            </span>
          </div>
          <div>
            <Image src={zerocharge} alt="zero charges" />
          </div>
        </div>
      </section>
  )
}

export default Maintaince