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
}

function Confirmation({
  handleClick = () => {},
  handleDone = () => {},
  isDone = true,
}) {
  const [{status}, dispatch] = useAsync({initStatus: 'hide'})

  if (status === 'show') {
    return (
      <div>
        you sure?
        <button
          onClick={() => {
            dispatch({type: 'hide'})
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
          onClick={() => dispatch({type: 'hide'})}
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
  }
  if (status === 'hide') {
    return (
      <div>
        <button
          onClick={() => dispatch({type: 'show'})}
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
                dispatch({type: 'hide'})
              }, 1200)
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
  }
  if (status === 'pending') {
    return <div className="spinner1" />
  }
  if (status === 'deleted') {
    return <span>✅</span>
  }
}
export default Confirmation
