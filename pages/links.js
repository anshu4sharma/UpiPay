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
        <meta property="og:url" content="https://upipay.anshusharma.me/links" />
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
                                href={`https://upipay.anshusharma.me/pay/${data.uid}`}
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
                <nav
                  aria-label="Page navigation example"
                  className="my-4 mx-4 block"
                >
                  <ul className="inline-flex items-center -space-x-px">
                    <li>
                      <button
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-white disabled:border disabled:text-blue-800"
                      >
                        Previous
                      </button>
                    </li>
                    <div className="flex gap-2 px-3">
                      {data?.totalLinks &&
                        [...Array(Math.ceil(data?.totalLinks / 10))].map(
                          (_, index) => {
                            return (
                              <li key={index + 1}>
                                <button
                                  className={`px-3 py-2 leading-tight text-gray-500  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 bg-white`}
                                  disabled={page === index + 1}
                                  onClick={() => setPage(index + 1)}
                                >
                                  {index + 1}
                                </button>
                              </li>
                            );
                          }
                        )}
                    </div>
                    <li>
                      <button
                        onClick={() => {
                          if (!isPreviousData) {
                            setPage((old) => old + 1);
                          }
                        }}
                        disabled={data.totalPages === page}
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-white disabled:border disabled:text-blue-800"
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
