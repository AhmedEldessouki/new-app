import * as React from 'react'
import randomToken from 'random-token'

import useBudget from './custom-hook'
import Blocks from './Blocks'

function Budget() {
  const [{income, outcome, total}, dispatch] = useBudget()

  function handleSubmit(e) {
    e.preventDefault()
    const {name, value} = e.target.elements
    if (value.valueAsNumber > 0) {
      if (income?.find(item => item.name === name.value)) {
        console.log('oooops')
      } else {
        dispatch({
          type: 'add_income',
          payload: {
            id: randomToken(5),
            name: name.value,
            value: value.valueAsNumber,
          },
        })
      }
    } else if (value.valueAsNumber < 0) {
      if (outcome?.find(item => item.name === name.value)) {
        console.log('oooops')
      } else {
        dispatch({
          type: 'add_outcome',
          payload: {
            id: randomToken(5),
            name: name.value,
            value: value.valueAsNumber,
          },
        })
      }
    } else {
      throw new Error('Ooops! something is not Right')
    }
    e.currentTarget.reset()
  }
  return (
    <div
      style={{
        height: ' 500px',
        minWidth: '45%',
        background: 'darkslateblue',
        marginTop: '30px',
        overflow: 'auto',
      }}
    >
      <h1 style={{textAlign: 'center', width: '100%'}}>Budget Calculator</h1>
      <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        <span
          style={{
            fontSize: '5rem',
            minWidth: '100%',
            textAlign: 'center',
            color: total > 0 ? '#019a01' : total < 0 ? 'red' : 'white',
          }}
        >
          {total}
        </span>
        <form
          onSubmit={handleSubmit}
          style={{minWidth: '100%', display: 'flex', placeContent: 'center'}}
        >
          <input
            style={{
              background: '#6d6d6d33',
              color: 'white',
              padding: 5,
              margin: 5,
              border: 0,
            }}
            name="name"
            placeholder="name"
            required
          />
          <input
            style={{
              background: '#6d6d6d33',
              color: 'white',
              padding: 5,
              margin: 5,
              border: 0,
            }}
            name="value"
            placeholder="value"
            type="number"
            required
          />
          <button
            style={{
              background: 'green',
              color: 'white',
              padding: 4,
              margin: 5,
              border: 0,
            }}
            type="submit"
          >
            Add
          </button>
        </form>
        <div
          style={{
            width: '100%',
            margin: 0,
            display: 'flex',
            flexFlow: 'row wrap',
            placeContent: 'space-around',
          }}
        >
          <Blocks value={income} nameC="income" dispatchB={dispatch} />
          <Blocks value={outcome} nameC="outcome" dispatchB={dispatch} />
        </div>
      </div>
    </div>
  )
}

export default Budget
