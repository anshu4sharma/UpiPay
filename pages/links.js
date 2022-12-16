import { useSession } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export default function Dashboard() {
  const [page, setPage] = useState(1);
  const { data: session } = useSession({
    required: true,
  });
  const fetchLinks = async () => {
    const res = await fetch(
      `https://anshu.up.railway.app/genlink/all/${session?.user.email}?page=${page}`
    );
    const links = await res.json();
    return links;
  };
  const { data, error, isLoading, isPreviousData } = useQuery(
    ["links", page],
    fetchLinks,
    {
      enabled: !!session?.user.email,
      keepPreviousData: true,
    }
  );
  if (error) {
    return <p>an error occured </p>;
  }
  return (
    <>
      <Head>
        <title>Accept Payments using payment links</title>
        <meta
          name="description"
          content="Collect Online Payments from anywhere in India. Create Payment Link Via Upi Pay Payment Links"
        />
        <meta
          property="og:title"
          content="Accept Payments using UpiPay Payment links"
        />
        <meta
          property="og:description"
          content="Accept Payments using UpiPay Payment links"
        />
        <meta property="og:url" content="https://upipayy.vercel.app/links" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white p-4 sm:px-16 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">All Payments Links</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40 ml-10 space-x-8">
              <Link
                href={"/genlink"}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 font-bold"
              >
                Create New
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              {isLoading ? (
                <div className="flex w-full flex-1 flex-col items-center">
                  <div className="mt-12 w-full animate-pulse flex-row items-center justify-center space-x-1 rounded-xl border p-6 ">
                    <div className="flex flex-col space-y-2">
                      <div className="h-6 w-11/12 rounded-md bg-gray-300 "></div>
                      <div className="h-6 w-10/12 rounded-md bg-gray-300 "></div>
                      <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
                      <div className="h-6 w-9/12 rounded-md bg-gray-300 "></div>
                    </div>
                  </div>
                </div>
              ) : (
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                        Upi Id
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Link
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Purpose of Payment
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  {data.Links.length > 0 ? (
                    data.Links.map((data, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {data.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.upiId}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                ₹ {data.amount}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <Link
                                target={"_blank"}
                                href={`https://upipayy.vercel.app/pay/${data.uid}`}
                                className="text-gray-900 whitespace-no-wrap"
                              >
                                🔗
                              </Link>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data.description}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {new Date(data.createdAt)
                                  .toString()
                                  .slice(0, 16)}
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <div className="mx-2 my-4 flex justify-center space-x-8">
                      <p>You have not created any link yet !</p>
                    </div>
                  )}
                </table>
              )}
              {data?.Links?.length > 0 && (
                <div className="flex flex-col mx-4 sm:mx-0 sm:items-center justify-center my-4">
                  <span className="text-sm text-gray-700">
                    Showing
                    <span className="font-semibold m-2  text-gray-900 ">
                      {data?.Links?.length}
                    </span>
                    of
                    <span className="font-semibold m-2 text-gray-900">
                      {data?.totalLinks}
                    </span>
                    Links
                  </span>
                  <div className="inline-flex mt-2 gap-2 xs:mt-0">
                    <button
                      onClick={() => setPage((old) => Math.max(old - 1, 1))}
                      disabled={page === 1}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-l hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-white disabled:border disabled:text-blue-800"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Prev
                    </button>
                    <button
                      onClick={() => {
                        if (!isPreviousData) {
                          setPage((old) => old + 1);
                        }
                      }}
                      disabled={data.totalPages === page}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-l hover:bg-blue-900 disabled:cursor-not-allowed disabled:bg-white disabled:border disabled:text-blue-800"
                    >
                      Next
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
