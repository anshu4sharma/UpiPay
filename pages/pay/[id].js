import React from "react";
import QRCode from "react-qr-code";

const Pay = ({ link }) => {
  const { upiId, amount, name, description } = link[0]
  let upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${description}`
  return <>
    <div className="flex flex-row mt-8 justify-center">
      <div
        className="relative flex-col flex gap-4 sm:w-fit rounded-lg border sm:border-gray-100 p-4"
      >
        <span
          className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
        ></span>

        <div className="flex justify-center">
          <QRCode
            value={upiLink}
            size={180}
          />
        </div>
        <div className="flex gap-2 flex-col items-center text-center">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Pay to
            </h3>
            <p className="text-sm font-medium text-gray-600">{name}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Upi Id
            </h3>
            <p className="text-sm font-medium text-gray-600">{upiId}</p>
          </div>
          <div className="flex flex-col-reverse">
            <dd className="text-xs font-bold text-gray-500">₹ {amount}</dd>
            <dt className="text-xl font-medium text-gray-900">Amount Payable</dt>
          </div>
          <div className="w-64">
            <p className="text-xl font-bold text-gray-900">Message from {name}</p>
            <p className="text-sm text-gray-500 ">
              {description}
            </p>
          </div>
          <dl className="mt-6 flex">
            <a
              className="inline-block rounded border  bg-[#0484af] px-10 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
              href={upiLink}
            >
              Pay now
            </a>
          </dl>
        </div>
      </div>
    </div>
  </>;
};

export default Pay;

export async function getServerSideProps(context) {
  const res = await fetch(`https://anshu.up.railway.app/genlink/uid/${context.params.id}`)
  const link = await res.json()
  if (link.length < 1) {
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }
  return {
    props: { link },
  }
}
