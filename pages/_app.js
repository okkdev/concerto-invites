import Head from "next/head"
import "tailwindcss/tailwind.css"
import "../style/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Concerto Invites</title>
      </Head>
      <div className="max-w-xl pt-2 mx-auto">
        <div className="text-2xl font-bold tracking-widest">
          Concerto Invites
        </div>
        <Component {...pageProps} />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <a
            href="https://concerto.shib.live"
            className="py-4 text-sm font-medium tracking-wider text-center bg-gray-900 bg-opacity-75 rounded-lg shadow-lg hover:bg-opacity-100"
          >
            Get Concerto
          </a>
          <a
            href="https://play.meltyblood.club"
            className="py-4 text-sm font-medium tracking-wider text-center bg-gray-900 bg-opacity-75 rounded-lg shadow-lg hover:bg-opacity-100"
          >
            Get Melty Blood
          </a>
        </div>
      </div>
    </>
  )
}

export default MyApp
