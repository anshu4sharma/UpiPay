import Image from 'next/image'
const CollectPayment = () => {
  return (
    <section className="text-gray-600 body-font text-center py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-14">
      <h1 className="font-bold text-4xl text-black leading-10 my-4">
        Collect Payments in 3 Easy Steps
      </h1>
      <div className="container mx-auto gap-16 sm:gap-32 flex px-10 py-8 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2">
          <Image alt="hero" src={'/collectPayments.webp'} width={"400"} height="500" />
        </div>
        <div className="lg:flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0295fc] inline-flex items-center justify-center text-white relative">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                STEP 1
              </h2>
              <p className="leading-relaxed">
                Create Payment Link Via Upi Pay Dashboard
              </p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
              <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0295fc] inline-flex items-center justify-center text-white relative">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                STEP 2
              </h2>
              <p className="leading-relaxed">
                Share Payment Link Through SMS, Email or WhatsApp
              </p>
            </div>
          </div>
          <div className="flex relative pb-12">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0295fc] inline-flex items-center justify-center text-white relative">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="5" r="3"></circle>
                <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
              </svg>
            </div>
            <div className="flex-grow pl-4">
              <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                STEP 3
              </h2>
              <p className="leading-relaxed">
                Customer Makes Payment Using Preferred Payment Method
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectPayment