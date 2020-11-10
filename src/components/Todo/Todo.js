import randomToken from 'random-token'
import * as React from 'react'

function todosReducer(state = [], {type, payload}) {
  switch (type) {
    case 'add':
      console.log(state)
      return {todos: [...state.todos, {id: randomToken(5), value: payload}]}
    case 'remove':
      console.log('here')
      state.todos.splice(payload, 1)
      return {...state}

    default:
      return state
  }
}

function Todo() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState('')

  React.useEffect(() => {}, [todos])

  function handleSubmit(e) {
    e.preventDefault()
    if (todos?.find(item => item.value === todo)) {
      setTodo('')
      return console.log('oooops')
    } else {
      setTodos([...todos, {id: randomToken(5), value: todo}])
      setTodo('')
    }
  }
  return (
    <div
      style={{
        height: ' 500px',
        minWidth: '45%',
        background: 'darkgreen',
        marginTop: '30px',
        overflow: 'auto',
      }}
    >
      <h1 style={{textAlign: 'center', width: '100%'}}>Todo</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            textAlign: 'center',
            width: '100%',
          }}
        >
          <input
            name="todo"
            style={{
              background: '#6d6d6d33',
              color: 'white',
              padding: 5,
              margin: 5,
              border: 0,
              width: 200,
            }}
            value={todo}
            onChange={e => setTodo(e.target.value)}
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
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            textTransform: 'capitalize',
            margin: '10px 5px',
          }}
        >
          {todos.map(({id, value}, i) => {
            return (
              <div
                key={id}
                style={{
                  display: 'flex',
                  borderBottom: '1px solid cadetblue',
                  padding: '2px 4px',
                  placeContent: 'space-between',
                }}
              >
                <span key={id}>{value}</span>
                <button
                  type="button"
                  onClick={() => {
                    todos.splice(i, 1)
                    setTodos([...todos])
                  }}
                  style={{
                    background: 'red',
                    color: 'white',
                    border: 0,
                    fontSize: 20,
                    margin: 5,
                    paddingBottom: 3,
                  }}
                >
                  <b>x</b>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Todo
