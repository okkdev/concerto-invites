import { useState } from "react"

export default function Home() {
  const [lobby, setLobby] = useState("")
  const [flash, setFlash] = useState({
    error: false,
    message: "",
  })

  // async function validateLobby() {
  // wait for cors
  // else {
  //   const res = await fetch(
  //     "https://concerto-mbaacc.herokuapp.com/s?action=check&id=" + lobby
  //   )
  //   const data = await res.json()
  //   if (data.status !== "OK") {
  //     setFlash({
  //       error: true,
  //       message: "Lobby #" + lobby + " does not exist",
  //     })
  //   }
  // }
  // }

  function copyLink() {
    const cb = navigator.clipboard
    cb.writeText("invite.meltyblood.club/" + lobby).then(() =>
      setFlash({
        error: false,
        message: "Invite link copied to clipboard",
      })
    )
  }

  function copyClick() {
    if (/^[0-9]{4}$/.test(lobby)) {
      copyLink()
    } else {
      setFlash({
        error: true,
        message: lobby + " is not a valid Lobby",
      })
    }
  }

  return (
    <div className="px-6 mt-5 text-xl font-medium tracking-wider text-center bg-gray-900 rounded-lg shadow-lg py-9">
      <div className="grid grid-cols-2 gap-3">
        <input
          value={lobby}
          onChange={(e) => setLobby(e.target.value)}
          type="text"
          pattern="^[0-9]{4}$"
          maxLength="4"
          className="block w-full px-3 bg-gray-900 border border-gray-100 rounded-md shadow-sm outline-none focus:border-2 focus:outline-none"
          placeholder="Lobby Code"
          required
        />
        <button
          onClick={copyClick}
          className="inline-flex items-center px-6 py-3 text-base font-medium bg-purple-700 border border-transparent rounded-md shadow-sm hover:bg-purple-800 focus:outline-none"
        >
          Copy Invite Link
        </button>
        <div
          className={
            flash.error
              ? "bg-red-400 border-red-500 col-span-2 p-4 mt-5 border rounded-md empty:hidden"
              : "bg-green-400 border-green-500 col-span-2 p-4 mt-5 border rounded-md empty:hidden"
          }
        >
          {flash.message}
        </div>
      </div>
    </div>
  )
}
