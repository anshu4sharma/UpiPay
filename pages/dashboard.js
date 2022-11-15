export default function Dashboard({ links }) {
  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto flex flex-wrap">
          <div class="flex flex-wrap -m-4">

            <div class="p-4 lg:w-1/2 md:w-full">
              <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-8 h-8" viewBox="0 0 24 24">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div class="flex-grow">
                  <h2 class="text-gray-900 text-lg title-font font-medium mb-3">{links[0].name}</h2>
                  <p class="leading-relaxed text-base">{links[0].description}</p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                  </a>
                </div>
              </div>
            </div>
            <div class="p-4 lg:w-1/2 md:w-full">
              <div class="flex border-2 rounded-lg border-gray-200 border-opacity-50 p-8 sm:flex-row flex-col">
                <div class="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">

                </div>
                <div class="flex-grow">
                  <h2 class="text-gray-900 text-lg title-font font-medium mb-3">{links[0].name}</h2>
                  <p class="leading-relaxed text-base">{links[0].description}</p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center">Learn More
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}


export async function getServerSideProps(context) {
  const res = await fetch(`https://anshu.up.railway.app/genlink/all/9813198`)
  const links = await res.json()
  if (links.length < 1) {
    return {
      redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }
  return {
    props: { links },
  }
}
