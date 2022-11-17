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
    <div class="min-h-screen flex flex-col justify-center">
      <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <HeaderLogo />
        <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div class="px-5 py-10">
            <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
            <input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input type="text" class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            <button onClick={() => signIn()} type="button" class="transition duration-200 bg-[#002970] hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
          <div class="p-5">
            <div class="grid grid-cols-1">
              <button onClick={() => signIn()} type="button" class="transition duration-200 border bg-[#002970] border-gray-200 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Login with Google</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
