import { useState } from "react"

export default function Home() {
  const [lobby, setLobby] = useState("")

  function copyLink() {
    const cb = navigator.clipboard
    cb.writeText("invite.meltyblood.club/" + lobby).then(() =>
      alert("Text copied")
    )
  }

  return (
    <div className="px-6 mt-5 text-xl font-medium tracking-wider text-center bg-gray-900 rounded-lg shadow-lg py-9">
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        <input
          value={lobby}
          onChange={(e) => setLobby(e.target.value)}
          type="text"
          pattern="^[0-9]{4}$"
          maxLength="4"
          class="shadow-sm focus:border-2 outline-none px-3 focus:outline-none block w-full border-gray-100 border bg-gray-900 rounded-md"
          placeholder="Lobby Code"
          required
        />
        <button
          onClick={copyLink}
          className="inline-flex items-center px-6 py-3 text-base font-medium text-center bg-red-700 border border-transparent rounded-md shadow-sm hover:bg-red-800 focus:outline-none"
        >
          Copy Invite Link
        </button>
        {/* TODO: Alert Validation stuff <div className="col-span-2 bg-red-300 empty:hidden"></div> */}
      </div>
    </div>
  )
}
