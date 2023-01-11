import { GetServerSideProps } from "next";
import { getProviders, signIn, getSession } from "next-auth/react";
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};
export default function SignIn({ providers }) {
  return (
    <div className="w-full mt-8 grid place-content-center">
      <h2 className="my-4 text-4xl tracking-tight font-extrabold text-center text-gray-900">
        Sign In
      </h2>
      {Object.values(providers).map((provider: Provider) => (
        <div
          key={provider.id}
          className="w-full p-2 grid place-content-start text-center"
        >
          <button
            type="button"
            className="my-2 flex items-center justify-center w-full px-20 py-4 mx-2 text-sm font-medium text-white transition-colors duration-300 transform border border-blue-500 rounded-md focus:outline-none"
          >
            <span
              className="text-blue-600 font-bold mx-2 inline"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/genlink",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
