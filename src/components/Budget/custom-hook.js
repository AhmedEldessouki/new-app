import * as React from 'react'

function myReducer(
  state = {income: Array, outcome: Array, total: Number},
  {type, payload},
) {
  switch (type) {
    case 'add_income':
      return {
        ...state,
        income: [...state.income, payload],
        total: state.total + payload.value,
      }

    case 'add_outcome':
      return {
        ...state,
        outcome: [...state.outcome, payload],
        total: state.total + payload.value,
      }

    case 'remove_income':
      state.total = state.total - state.income[payload].value
      state.income.splice(payload, 1)
      return {...state}

    case 'remove_outcome':
      state.total = state.total - state.outcome[payload].value
      state.outcome.splice(payload, 1)
      return {...state}

    default:
      return state
  }
}

function useBudget() {
  const [{income, outcome, total}, dispatch] = React.useReducer(myReducer, {
    income: [],
    outcome: [],
    total: 0,
  })
  return [{income, outcome, total}, dispatch]
}

export default useBudget
