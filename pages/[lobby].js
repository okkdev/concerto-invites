import Head from "next/head"
import { useEffect } from "react"

const Lobby = ({ valid, data }) => {
  if (!valid) {
    return <InvalidLobby host={data.host} lobby={data.lobby} />
  }

  if (!data.open) {
    return <LobbyDoesNotExist host={data.host} lobby={data.lobby} />
  }

  return <OpenLobby host={data.host} lobby={data.lobby} type={data.type} />
}

function LobbyDoesNotExist({ host, lobby }) {
  const msg = `Lobby "${lobby}" does not exist`
  return (
    <LobbyLayout lobby={lobby} host={host}>
      <Head>
        <meta property="og:title" content={msg} />
        <meta name="theme-color" content="#ad3232" />
        <meta
          property="og:description"
          content="Create a new lobby in Concerto!"
        />
      </Head>
      <p>{msg}</p>
    </LobbyLayout>
  )
}

function OpenLobby({ host, lobby, type }) {
  const msg = `Invite to ${type} Lobby "${lobby}"`

  useEffect(() => {
    window.location = `concerto://lobby:${lobby}`
  }, [])

  return (
    <LobbyLayout host={host} lobby={lobby}>
      <Head>
        <meta property="og:title" content={msg} />
        <meta name="theme-color" content="#3ca864" />
        <meta
          property="og:description"
          content="Click the link to join the lobby with Concerto!"
        />
      </Head>
      <p>{msg}</p>
      <a
        href={`concerto://lobby:${lobby}`}
        className="inline-flex items-center py-3 px-6 mt-3 text-base font-medium bg-purple-700 rounded-md border border-transparent shadow-sm hover:bg-purple-800 focus:outline-none"
      >
        Click here if Concerto didn't launch automatically
      </a>
      <div className="mt-6">
        <p className="text-sm">Still not working?</p>
        <p className="text-xs">
          Did you run Concerto as administrator once, to register the handler?
        </p>
      </div>
    </LobbyLayout>
  )
}

function InvalidLobby({ host, lobby }) {
  const msg = `"${lobby}" is not a valid lobby`

  return (
    <LobbyLayout host={host} lobby={lobby}>
      <Head>
        <meta property="og:title" content={msg} />
        <meta name="theme-color" content="#ad3232" />
        <meta
          property="og:description"
          content="Create a new lobby in Concerto!"
        />
      </Head>
      <p>{msg}</p>
    </LobbyLayout>
  )
}

function LobbyLayout({ host, lobby, children }) {
  return (
    <>
      <Head>
        <title>Lobby Invite "{lobby}"</title>
        <meta
          property="og:image"
          content={`https://${host}/img/concerto_icon.png`}
        />
      </Head>

      <div className="py-9 px-6 mt-5 text-xl font-medium tracking-wider text-center bg-gray-900 rounded-lg shadow-lg">
        {children}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const lobby = context.params.lobby
  const valid = /^[a-zA-Z0-9]{2,8}$/.test(lobby)

  const props = {
    valid: valid,
    data: {
      host: context.req.headers.host,
      lobby: lobby,
      open: false,
      type: "",
    },
  }

  if (valid) {
    const res = await fetch(
      "https://concerto-mbaacc.shib.live/s?action=check&id=" + lobby,
    )
    const data = await res.json()

    if (data.status === "OK") {
      props.data.open = true
      props.data.type = data.type
    }
  }

  return {
    props: props,
  }
}

export default Lobby
