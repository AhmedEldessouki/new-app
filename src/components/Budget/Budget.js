import * as React from 'react'
import randomToken from 'random-token'

function Blocks({value = [], name = ''}) {
  return (
    <td>
      <h2>{name.toLocaleUpperCase()}</h2>
      {value?.map(({name, value, id}) => {
        return (
          <tr
            key={id}
            style={{
              display: 'flex',
              placeContent: 'space-between',
              placeItems: 'center',
              padding: '10px',
              minWidth: '90%',
              border: '1px solid white',
            }}
          >
            <th>{name}</th>
            <th>{value}</th>
          </tr>
        )
      })}
    </td>
  )
}

function Budget() {
  const [income, setIncome] = React.useState([
    {
      id: randomToken(5),
      name: 'income',
      value: 0,
    },
  ])
  const [outcome, setOutcome] = React.useState([
    {
      id: randomToken(5),
      name: 'outcome',
      value: 0,
    },
  ])
  const [total, setTotal] = React.useState(0)

  function handleSubmit(e) {
    e.preventDefault()
    const {name, value} = e.target.elements
    if (value.valueAsNumber > 0) {
      setIncome([
        ...income,
        {
          id: randomToken(5),
          name: name.value,
          value: value.valueAsNumber,
        },
      ])
      setTotal(newTotal => {
        return (newTotal = total + value.valueAsNumber)
      })
      console.log(value.valueAsNumber)
    } else if (value.value < 0) {
      setOutcome([
        ...outcome,
        {
          id: randomToken(5),
          name: name.value,
          value: value.valueAsNumber,
        },
      ])
      setTotal(total + value.valueAsNumber)
    } else {
      throw new Error('Ooops! something is not Right')
    }
  }
  return (
    <>
      <h1>Budget Calculator</h1>
      <div style={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        <span
          style={{
            fontSize: '5rem',
            minWidth: '100%',
            color: total > 0 ? '#019a01' : total < 0 ? 'red' : 'white',
          }}
        >
          {total}
        </span>
        <form onSubmit={handleSubmit} style={{minWidth: '100%'}}>
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
        <table style={{width: '100%', margin: 0}}>
          <Blocks value={income} name="income" />
          <Blocks value={outcome} name="outcome" />
        </table>
      </div>
    </>
  )
}

export default Budget
