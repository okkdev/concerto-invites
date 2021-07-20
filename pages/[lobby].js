const Lobby = (props) => {
  let body = <></>
  if (props.valid) {
    body = (
      <div>
        <p>Lobby: {props.lobby}</p>
      </div>
    )
  } else {
    body = <div>Not valid {props.valid}</div>
  }

  return body
}

export async function getServerSideProps(context) {
  const lobby = context.params.lobby
  const valid = /^[0-9]{4}$/.test(lobby)
  let open = false

  if (valid) {
    const res = await fetch("")
  }

  const props = {
    valid: valid,
    data: {
      lobby: lobby,
      open: open,
    },
  }

  return {
    props: props,
  }
}

export default Lobby
