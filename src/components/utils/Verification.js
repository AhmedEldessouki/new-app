import * as React from 'react'

function Verification({message = ''}) {
  return (
    <span
      style={{
        background: 'rgba(0,0,0,0.2)',
        padding: ' 0 30px 3px 30px',
        marginLeft: ' 5px',
        textAlign: 'center',
        color: 'tomato',
      }}
      role="alert"
    >
      already exists {message}
    </span>
  )
}

export default Verification
