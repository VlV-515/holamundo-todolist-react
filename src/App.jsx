import React, { Fragment, useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TodoList } from './components/TodoList'

const TASKS_LIST = [
  { id: 1, task: 'Tarea 1', completed: false },
  { id: 2, task: 'Tarea 2', completed: true },
  { id: 3, task: 'Tarea 3', completed: false },
]
const KEY = 'keyAppTodos'

export function App() {
  const [todos, setTodos] = useState(TASKS_LIST)
  const todoTaskRef = useRef()

  useEffect(() => {
    const todosLS = localStorage.getItem(KEY)
    setTodos(JSON.parse(todosLS))
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos))
  }, [todos])

  const handleTodoAdd = (e) => {
    e.preventDefault()
    const task = todoTaskRef.current.value
    if (task === '') return
    setTodos((todos) => {
      return [...todos, { id: uuidv4(), task, completed: false }]
    })
    todoTaskRef.current.value = null
  }

  const toggleTodo = (id) => {
    const newTodos = [...todos]
    console.log(newTodos)

    const todo = newTodos.find((todo) => todo.id === id)
    console.log(todo)

    todo.completed = !todo.completed
    console.log(todo)
    setTodos(newTodos)
  }
  const getCantTask = () => {
    return todos.filter((todo) => !todo.completed).length
  }

  const handlerClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <form onSubmit={handleTodoAdd}>
        <input ref={todoTaskRef} type='text' placeholder='New task' />
        <button type='submit'>➕</button>
        <button onClick={handlerClearCompleted}>🗑</button>
      </form>
      <div>Te quedan {getCantTask()} tareas por terminar</div>
    </Fragment>
  )
}
