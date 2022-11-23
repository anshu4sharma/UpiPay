import React from "react";
import QRCode from "react-qr-code";
import HeaderLogo from "../../components/HeaderLogo";
const Pay = ({ link }) => {
  const { upiId, amount, name, description } = link
  let upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${description}`
  return <>
    <div className="flex flex-row mt-8  justify-center">
      <div
        className="relative flex-col flex gap-4 sm:w-fit shadow-xl rounded-lg border sm:border-gray-100 p-8 ">
        <span
          className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
        ></span>
        <HeaderLogo />
        <div className="flex justify-center">
          <QRCode
            value={upiLink}
            size={180}
          />
        </div>
        <div className="flex gap-2 flex-col text-left px-8">
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
            <p className="text-xs font-bold text-gray-500">₹ {amount}</p>
            <p className="text-xl font-bold text-gray-900">Amount Payable</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-900">Purpose of payment</p>
            <p className="text-sm text-gray-500">
              {description}
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <a
              className="inline-block rounded border bg-[#002970] px-10 py-3 text-sm font-medium text-white "
              href={upiLink}
            >
              Pay now ⚡
            </a>
          </div>
        </div>
      </div>
    </div>
  </>;
};

export default Pay;

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://anshu.up.railway.app/genlink/uid/${params.id}`)
  const [link] = await res.json()
  return {
    props: { link },
  }
}