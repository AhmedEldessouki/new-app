import * as React from 'react'

import Confirmation from '../utils/Confirmation'

function Block({name, value, handleClick}) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      style={{
        display: 'block',
        padding: '10px',
        minWidth: '90%',
        placeItems: 'left',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          placeContent: 'space-between',
          placeItems: 'center',
        }}
      >
        <span>{name}</span>
        <span>{value}</span>
      </div>
      <Confirmation
        handleClick={() => {
          handleClick()
        }}
        show={hovered}
      />
    </div>
  )
}

export default Block
