import * as React from 'react'

function Confirmation({handleClick}) {
  const [x, setX] = React.useState(false)
  return x ? (
    <div>
      you sure?
      <button
        onClick={() => {
          setX(false)
          handleClick()
        }}
      >
        yes
      </button>
      <button onClick={() => setX(false)}>no</button>
    </div>
  ) : (
    <button onClick={() => setX(true)} type="button">
      x
    </button>
  )
}
export default Confirmation
