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
  handleUnDone = () => {},
  isDone = true,
  show,
  componentName,
}) {
  const [{status}, dispatch] = useAsync({initStatus: 'hide'})
  if (status === 'show' && show) {
    return (
      <div aria-label="confirmation">
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
          data-testid="yes"
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
          data-testid="No"
        >
          No
        </button>
      </div>
    )
  }
  if (status === 'hide' && show) {
    return (
      <div>
        <button
          onClick={() => dispatch({type: 'show'})}
          type="button"
          style={{
            ...bTn,
          }}
          data-testid="del"
        >
          X
        </button>
        {componentName === 'todo' ? (
          isDone ? (
            <button
              data-testid="mark undone"
              onClick={() => {
                dispatch({type: 'pending'})
                setTimeout(() => {
                  dispatch({type: 'deleted'})
                }, 1000)
                setTimeout(() => {
                  handleUnDone()
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
          ) : (
            <button
              data-testid="done"
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
          )
        ) : null}
      </div>
    )
  }
  if (status === 'pending') {
    return <div className="spinner1" aria-label="loading" />
  }
  if (status === 'deleted') {
    return <span aria-label="done">✅</span>
  } else return null
}
export default Confirmation
