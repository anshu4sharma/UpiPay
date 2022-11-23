import { getSession } from 'next-auth/react'
import Link from 'next/link';
import Head from 'next/head';
export default function Dashboard({ links }) {
  return (
    <>
      <Head>
        <title>Accept Payments using payment links</title>
        <meta name="description" content="Collect Online Payments from anywhere in India. Create Payment Link Via Upi Pay Payment Links" />
        <meta property="og:title" content="Accept Payments using UpiPay Payment links" />
        <meta property="og:description" content="Accept Payments using UpiPay Payment links" />
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
              <Link href={'/genlink'} className="bg-[#1f4483] px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create New</Link>
            </div>
          </div>
        </div>
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              {
                links?.length > 0 ? <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Name
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600  tracking-wider">
                        Upi Id
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Link
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Purpose of Payment
                      </th>
                      <th
                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  {
                    links.map((data, index) => {
                      return <tbody key={index}>
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
                            <p className="text-gray-900 whitespace-no-wrap"> {data.upiId}</p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              ₹ {data.amount}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <Link target={'_blank'} href={`https://upipayy.vercel.app/pay/${data.uid}`} className="text-gray-900 whitespace-no-wrap">
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
                              {new Date(data.createdAt).toString().slice(0, 16)}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    })
                  }
                </table>
                  : <div className='my-4 text-center'>
                    <p> No Data Found</p>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context)
  const res = await fetch(`https://anshu.up.railway.app/genlink/all/${session?.user.email}`)
  const links = await res.json()
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false
      }
    }
  }
  return {
    props: { links },
  }
}