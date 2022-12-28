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
  const { data, error, isLoading, isPreviousData, isFetching } = useQuery(
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
                  {data?.Links?.length > 0 ? (
                    data?.Links?.map((data, index) => {
                      return (
                        <tbody key={index}>
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {data?.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data?.upiId}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                ₹ {data?.amount}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <Link
                                target={"_blank"}
                                href={`https://upipay.anshusharma.me/pay/${data?.uid}`}
                                className="text-gray-900 whitespace-no-wrap"
                              >
                                🔗
                              </Link>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {data?.description}
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {new Date(data?.createdAt)
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
                <>
                  {data?.totalLinks && (
                    <div className="my-4 mx-4 block">
                      <button
                        disabled={true}
                        type="button"
                        className="py-2.5 px-5 mr-2 mb-2 text-sm text-blue-600 font-bold bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
                      >
                        Total Links : {data?.totalLinks}
                      </button>
                    </div>
                  )}
                  {isFetching && (
                    <div className="my-4 mx-4 block">
                      <button
                        disabled
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="inline mr-3 w-4 h-4 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Loading...
                      </button>
                    </div>
                  )}
                  <nav
                    aria-label="Page navigation example"
                    className="my-4 mx-4 block"
                  >
                    <ul className="inline-flex items-center -space-x-px">
                      <li>
                        <button
                          onClick={() => setPage((old) => Math.max(old - 1, 1))}
                          disabled={page === 1}
                          className="px-3 py-2 ml-0 leading-tight text-sm text-blue-600 font-bold bg-gray-100 rounded-lg border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-400"
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
                                    className={`px-3 py-2 leading-tight text-sm text-blue-600 font-bold bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-400`}
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
                          className="px-3 py-2 leading-tight text-sm text-blue-600 font-bold bg-gray-100 rounded-lg border border-gray-200 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed disabled:text-white disabled:bg-gray-400"
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
