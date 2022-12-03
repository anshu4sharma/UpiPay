import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Progress } from '../components/progress'
import { useProgressStore } from '../store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [queryClient] = useState(() => new QueryClient())
  const setIsAnimating = useProgressStore((state) => state.setIsAnimating)
  const isAnimating = useProgressStore((state) => state.isAnimating)
  const router = useRouter()
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true)
    }
    const handleStop = () => {
      setIsAnimating(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Progress isAnimating={isAnimating} />
          <Navbar />
          <Toaster />
          <Component {...pageProps} />
          <Footer />
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
