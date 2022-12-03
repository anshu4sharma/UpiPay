import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import { useQuery } from '@tanstack/react-query'
export default function Dashboard() {
  const { data: session } = useSession({
    required: true,
  })
  const fetchLinks = async () => {
    const res = await fetch(
      `https://anshu.up.railway.app/genlink/all/${session?.user.email}`,
    )
    const links = await res.json()
    return links
  }
  const { data, error, isLoading } = useQuery(['links'], fetchLinks)
  if (error) {
    return <p>an error occured </p>
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
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <div>
            <h2 className="text-gray-600 font-semibold">All Payments Links</h2>
          </div>
          <div className="flex items-center justify-between">
            <div className="lg:ml-40 ml-10 space-x-8">
              <Link
                href={'/genlink'}
                className="bg-[#1f4483] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
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
                  {data.length > 0 ? (
                    data.map((data, index) => {
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
                                target={'_blank'}
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
                      )
                    })
                  ) : (
                    <div className="mx-2 my-4 flex justify-center space-x-8">
                      <p>You have not created any link yet !</p>
                    </div>
                  )}
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
