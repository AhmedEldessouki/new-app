import * as React from 'react'
import './App.css'

import Budget from './components/Budget/Budget'
import Todo from './components/Todo/Todo'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Todo />
        <Budget />
      </header>
    </div>
  )
}

export default App
