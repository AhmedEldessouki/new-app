import * as React from 'react'

function myReducer(
  state = {income: Array, outcome: Array, total: Number, error: String},
  {type, payload},
) {
  switch (type) {
    case 'add_income':
      window.localStorage.setItem(
        'budget',
        JSON.stringify({
          ...state,
          income: [...state.income, payload],
          total: state.total + payload.value,
          error: null,
        }),
      )
      return {
        ...state,
        income: [...state.income, payload],
        total: state.total + payload.value,
        error: null,
      }

    case 'add_outcome':
      window.localStorage.setItem(
        'budget',
        JSON.stringify({
          ...state,
          outcome: [...state.outcome, payload],
          total: state.total + payload.value,
          error: null,
        }),
      )
      return {
        ...state,
        outcome: [...state.outcome, payload],
        total: state.total + payload.value,
        error: null,
      }

    case 'remove_income':
      state.total = state.total - state.income[payload].value
      state.income.splice(payload, 1)
      window.localStorage.setItem(
        'budget',
        JSON.stringify({...state, error: null}),
      )
      return {...state, error: null}

    case 'remove_outcome':
      state.total = state.total - state.outcome[payload].value
      state.outcome.splice(payload, 1)
      window.localStorage.setItem(
        'budget',
        JSON.stringify({...state, error: null}),
      )
      return {...state, error: null}

    case 'error':
      window.localStorage.setItem(
        'budget',
        JSON.stringify({...state, error: payload}),
      )
      return {...state, error: payload}

    default:
      throw new Error(`The Type: "${type}" does not exist in "useBudget".`)
  }
}
function useBudget() {
  const [{income, outcome, total, error}, dispatch] = React.useReducer(
    myReducer,
    window.localStorage.getItem('budget')
      ? JSON.parse(window.localStorage.getItem('budget'))
      : {
          income: [],
          outcome: [],
          total: 0,
          error: null,
        },
  )

  return [{income, outcome, total, error}, dispatch]
}

export default useBudget
