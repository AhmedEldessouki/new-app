import * as React from 'react'

import Confirmation from '../utils/Confirmation'

const stlying = {
  display: 'flex',
  flexFlow: 'row wrap',
  borderBottom: '1px solid cadetblue',
  padding: '2px 4px',
  placeContent: 'space-between',
  width: '85%',
}
const doneStyle = {
  background: '#00000030',
}

function RenderTodos({value, done, i, dispatchT}) {
  const [y, setY] = React.useState(false)

  return (
    <div
      style={done ? {...stlying, ...doneStyle} : {...stlying}}
      onMouseEnter={() => setY(true)}
      onMouseLeave={() => setY(false)}
    >
      <span
        style={done ? {color: 'black', textDecoration: 'line-through'} : null}
      >
        {value}
      </span>
      {y ? (
        <Confirmation
          isDone={done ? true : false}
          handleClick={() => dispatchT({type: `remove`, payload: i})}
          handleDone={() => dispatchT({type: `done`, payload: i})}
        />
      ) : null}
    </div>
  )
}

export default RenderTodos
