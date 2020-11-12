import * as React from 'react'

function reducer(state, {type}) {
  switch (type) {
    case 'idle':
      return {status: 'idle'}

    case 'pending':
      return {status: 'pending'}

    case 'deleted':
      return {status: 'deleted'}

    case 'done':
      return {status: 'done'}

    default:
      throw new Error(`The Type: "${type}" does not exist in "useAsync".`)
  }
}

export default function useAsync({initStatus = 'idle'} = {}) {
  const [{status}, dispatch] = React.useReducer(reducer, {status: initStatus})
  return [{status}, dispatch]
}
