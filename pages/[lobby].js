import Head from "next/head"
import { useEffect } from "react"

const Lobby = ({ valid, data }) => {
  let body = <>Something went wrong</>

  if (valid) {
    if (data.open) {
      const msg = "Invite to " + data.type + " Lobby #" + data.lobby
      body = (
        <>
          <Head>
            <meta property="og:title" content={msg} />
            <meta name="theme-color" content="#04750c" />
          </Head>
          <div>{msg}</div>
          <a
            href={"concerto://lobby:" + data.lobby}
            className="inline-flex items-center px-6 py-3 mt-3 text-base font-medium bg-purple-700 border border-transparent rounded-md shadow-sm hover:bg-purple-800 focus:outline-none"
          >
            Click here if Concerto didn't launch automatically
          </a>
          <div className="mt-6">
            <p className="text-sm">Still not working?</p>
            <p className="text-xs">
              Did you run Concerto as administrator once to register the
              handler?
            </p>
          </div>
        </>
      )
      useEffect(() => {
        window.location.replace("concerto://lobby:" + data.lobby)
      }, [])
    } else {
      const msg = "Lobby #" + data.lobby + " is not open anymore"
      body = (
        <>
          <Head>
            <meta property="og:title" content={msg} />
            <meta name="theme-color" content="#910f12" />
          </Head>
          <div>{msg}</div>
        </>
      )
    }
  } else {
    const msg = data.lobby + " is not a valid lobby"
    body = (
      <>
        <Head>
          <meta property="og:title" content={msg} />
          <meta name="theme-color" content="#910f12" />
        </Head>
        <div>{msg}</div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Lobby Invite #{data.lobby}</title>
        <meta
          property="og:description"
          content="Click the link to join the Lobby with Concerto"
        />
        <meta
          property="og:image"
          content={"https://" + data.host + "/img/concerto_icon.png"}
        />
      </Head>

      <div className="px-6 mt-5 text-xl font-medium tracking-wider text-center bg-gray-900 rounded-lg shadow-lg py-9">
        {body}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const lobby = context.params.lobby
  const valid = /^[0-9]{4}$/.test(lobby)
  let open = false
  let type = ""

  if (valid) {
    const res = await fetch(
      "https://concerto-mbaacc.herokuapp.com/s?action=check&id=" + lobby
    )
    const data = await res.json()

    if (data.status === "OK") {
      open = true
      type = data.type
    }
  }

  const props = {
    valid: valid,
    data: {
      host: context.req.headers.host,
      lobby: lobby,
      open: open,
      type: type,
    },
  }

  return {
    props: props,
  }
}

export default Lobby
