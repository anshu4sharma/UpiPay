import { getProviders, signIn, getSession } from "next-auth/react"
export default function SignIn({ providers }) {
    console.log(providers);
    return (
        <div className="w-full mt-8 grid place-content-center">
            <h2 className="my-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">Sign In</h2>
            {Object.values(providers).map((provider) => (
                <div key={provider.name} className="w-full p-2 grid place-content-start text-center">
                    <button type="button" className="my-2 flex items-center justify-center w-full px-20 py-4 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                        <span className="mx-2 inline" onClick={() => signIn(provider.id)}>Sign in with {provider.name}</span>
                    </button>
                </div>
            ))}
        </div>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (session) {
        return {
            redirect: {
                destination: "/genlink",
                permanent: false
            }
        }
    }
    const providers = await getProviders()
    return {
        props: { providers },
    }
}