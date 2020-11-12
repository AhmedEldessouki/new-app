/* eslint-disable jsx-a11y/accessible-emoji */
import * as React from 'react'
import useAsync from './useAsync'
import './loading.css'

const bTn = {
  background: 'red',
  color: 'white',
  border: 0,
  fontSize: 13,
  margin: 5,
  paddingBottom: 3,
  padding: '3px 10px ',
  fontWeight: 'bold',
  // background: 'white',
}

function Confirmation({handleClick, handleDone = () => {}, isDone = true}) {
  const [x, setX] = React.useState(false)
  const [{status}, dispatch] = useAsync('')

  if (x && status !== 'pending') {
    return (
      <div>
        you sure?
        <button
          onClick={() => {
            setX(false)
            dispatch({type: 'pending'})
            setTimeout(() => {
              dispatch({type: 'deleted'})
            }, 1000)
            setTimeout(() => {
              handleClick()
            }, 1100)
          }}
          style={{
            ...bTn,
            width: '50px',
          }}
        >
          Yes
        </button>
        <button
          onClick={() => setX(false)}
          style={{
            ...bTn,
            background: 'green',
            width: '50px',
          }}
        >
          No
        </button>
      </div>
    )
  } else if (!x && status !== 'pending') {
    return (
      <div>
        <button
          onClick={() => setX(true)}
          type="button"
          style={{
            ...bTn,
          }}
        >
          X
        </button>
        {isDone ? null : (
          <button
            onClick={() => {
              dispatch({type: 'pending'})
              setTimeout(() => {
                dispatch({type: 'deleted'})
              }, 1000)
              setTimeout(() => {
                handleDone()
              }, 1100)
            }}
            type="button"
            style={{
              ...bTn,
              background: 'green',
            }}
          >
            ✔
          </button>
        )}
      </div>
    )
  } else if (status === 'pending') {
    return <div className="spinner1" />
  } else if (status === 'deleted') {
    return <span>✅</span>
  }
}
export default Confirmation
