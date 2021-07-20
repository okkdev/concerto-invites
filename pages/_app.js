import Head from "next/head"
import "tailwindcss/tailwind.css"
import "../style/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Concerto Invites</title>
        <link rel="icon" href="/img/concerto_icon.png" />
      </Head>
      <div className="max-w-xl pt-2 mx-auto">
        <div className="text-2xl font-bold tracking-widest">
          Concerto Invites
        </div>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
