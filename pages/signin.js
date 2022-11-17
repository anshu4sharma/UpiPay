import HeaderLogo from '../components/HeaderLogo'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from "next/router";
const Login = () => {
  const router = useRouter()
  const { status } = useSession()
  if (status === "authenticated") {
    router.push('/genlink')
  }
  else return (
    <div class="min-h-screen items-center flex  flex-col justify-center">
      <div class="p-10 xs:p-0 item-center flex flex-col mb-56 mx-auto md:w-full md:max-w-md">
        <div class="bg-white shadow-xl py-10 w-full rounded-lg ">
        <HeaderLogo />
          <div class="px-5 py-20">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <button onClick={() => signIn()} type="button" class="transition duration-200 bg-[#002970] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">Login with Google</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
