import React, { useRef } from "react";
import QRCode from "react-qr-code";
import HeaderLogo from "../../components/HeaderLogo";
import { GetServerSideProps } from "next";
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import toast from "react-hot-toast";
import axios from "axios";
const Pay = ({ link }: { link: Link }) => {
  const { upiId, amount, name, description } = link;
  let upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=INR&tn=${description}`;
  const captureRef = useRef<HTMLDivElement | null>(null);
  const handleCapture = async () => {
    const toastId = toast.loading('Downloading...');
    try {
      const canvas = await html2canvas(captureRef.current);
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "image.png";
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Successfully saved ', {
        id: toastId,
      });
    } catch (error) {
      toast.error("An error occured!", {
        id: toastId,
      });
    }
  };
  return (
    <>
      <div className="flex flex-row mt-6  sm:mt-0 justify-center">
        <div >
          <div ref={captureRef} className="relative flex-col flex gap-4 sm:w-fit rounded-lg p-8 ">
            <div className="grid sm:my-0 my-4 grid-cols-1">
              <HeaderLogo />
            </div>
            <div className="flex justify-center">
              <QRCode value={upiLink} size={180} />
            </div>
            <div className="flex gap-2 flex-col text-left px-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Pay to</h3>
                <p className="text-sm font-medium text-gray-600">{name}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Upi Id</h3>
                <p className="text-sm font-medium text-gray-600">{upiId}</p>
              </div>
              <div className="flex flex-col-reverse">
                <p className="text-xs font-bold text-gray-500">₹ {amount}</p>
                <p className="text-xl font-bold text-gray-900">Amount Payable</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">
                  Purpose of payment
                </p>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid justify-center">
            <a
              className="grid place-content-center rounded border bg-[#002970] w-full text-center py-3 text-sm font-bold text-white"
              href={upiLink}
            >
              Pay ⚡
            </a>
            <button className="grid place-content-center px-4 rounded border bg-[#002970] w-full text-center py-3 text-sm font-bold text-white" onClick={handleCapture}>Download as Image</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pay;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const { data } = await axios<[Link]>(
      `https://anshu.up.railway.app/genlink/uid/${params.id}`
    );
    const [link] = data
    if (data.length) {
      return {
        props: { link },
      };
    }
    return {
      notFound: true,
      redirect: "/"
    }
  } catch (error) {
    console.log(error);
  }
};
