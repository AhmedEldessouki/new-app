import randomToken from 'random-token'
import * as React from 'react'

import Verification from '../utils/Verification'
import RenderTodos from './renderTodos'

function todosReducer({todos = [], error = null} = {}, {type, payload}) {
  switch (type) {
    case 'add':
      window.localStorage.setItem(
        'todo',
        JSON.stringify([...todos, {id: randomToken(5), value: payload}]),
      )
      return {
        todos: [...todos, {id: randomToken(5), value: payload}],
      }

    case 'remove':
      todos?.splice(payload, 1)
      window.localStorage.setItem('todo', JSON.stringify(todos))
      return {todos: [...todos]}

    case 'done':
      const markDone = {...todos[payload], done: true}
      todos?.splice(payload, 1, markDone)
      window.localStorage.setItem('todo', JSON.stringify(todos))
      return {todos: [...todos]}

    case 'mark_undone':
      const markUndone = {...todos[payload], done: null}
      todos?.splice(payload, 1, markUndone)
      window.localStorage.setItem('todo', JSON.stringify(todos))
      return {todos: [...todos]}

    case 'duplicate':
      return {todos: [...todos], error: true}

    default:
      throw new Error(`The type: ${type} does not exist in "todosReducer"`)
  }
}

function Todo() {
  const [{todos, error}, dispatch] = React.useReducer(todosReducer, {
    todos: window.localStorage.getItem('todo')
      ? JSON.parse(window.localStorage.getItem('todo'))
      : [],
  })

  function handleSubmit(e) {
    e.preventDefault()
    const {todo} = e.target.elements

    if (todos?.find(item => item.value === todo.value.trim())) {
      dispatch({
        type: 'duplicate',
      })
    } else {
      dispatch({
        type: 'add',
        payload: todo.value.trim(),
      })
    }
    e.currentTarget.reset()
  }
  return (
    <div
      style={{
        height: ' 500px',
        minWidth: '45%',
        background: 'darkgreen',
        margin: '30px 0',
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
            marginBottom: 20,
          }}
        >
          <input
            aria-label="enter todo"
            name="todo"
            style={{
              background: '#6d6d6d33',
              color: 'white',
              padding: 5,
              margin: 5,
              border: 0,
              width: 200,
            }}
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
            aria-label="add todo"
            type="submit"
          >
            Add
          </button>
          {error ? <Verification /> : null}
        </form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'left',
            textTransform: 'capitalize',
            margin: '10px 5px',
            placeItems: 'center',
          }}
        >
          {todos?.map(({id, value, done}, i) => {
            return (
              <RenderTodos
                key={id}
                value={value}
                done={done}
                i={i}
                dispatchT={dispatch}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Todo
