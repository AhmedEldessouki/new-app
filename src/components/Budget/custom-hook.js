import * as React from 'react'

function myReducer(
  state = {income: Array, outcome: Array, total: Number, error: String},
  {type, payload},
) {
  switch (type) {
    case 'add_income':
      return {
        ...state,
        income: [...state.income, payload],
        total: state.total + payload.value,
        error: null,
      }

    case 'add_outcome':
      return {
        ...state,
        outcome: [...state.outcome, payload],
        total: state.total + payload.value,
        error: null,
      }

    case 'remove_income':
      state.total = state.total - state.income[payload].value
      state.income.splice(payload, 1)
      return {...state, error: null}

    case 'remove_outcome':
      state.total = state.total - state.outcome[payload].value
      state.outcome.splice(payload, 1)
      return {...state, error: null}

    case 'error':
      return {...state, error: payload}

    default:
      throw new Error(`The Type: "${type}" does not exist in "useBudget".`)
  }
}

function useBudget() {
  const [{income, outcome, total, error}, dispatch] = React.useReducer(
    myReducer,
    {
      income: [],
      outcome: [],
      total: 0,
      error: null,
    },
  )
  return [{income, outcome, total, error}, dispatch]
}

export default useBudget
