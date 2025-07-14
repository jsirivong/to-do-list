import { useState } from 'react';
import { dummyData } from './services/todos'
import TodoList from './components/todolist';
import Input from './components/input'
import type Item from './types/todo' // type import, don't forget to add the "type" keyword
import './App.css'
import Summary from './components/todosummary';

export default function App(){
  const [ todos, setTodos ] = useState<Item[]>(dummyData); // "<Item[]>" not necessary as typescript can infer the type
  // you can explicity state the type in arrow brackets as useState is a generic function/hook

  const handleChange = (id: number, completed: boolean): void => {
    setTodos((previousTodo) => previousTodo.map( // the map function returns a completely new array
      (value: Item) => value.id === id ? {...value, completed} : value // can't use curly braces inside setState when using a function
    ))
  } 

  const handleDelete = (id: number): void => {
    setTodos((previousTodos) => previousTodos.filter((value) => value.id !== id)); // elements whose value.id aren't equal to the target id will stay in the shallow copy
    //.filter() creates a new array full of elements that pass the given test (i.e. value.id != id)
    // the callback function must return true or false; elements that are true will stay in the array, while those that are false will be "filtered" out of the array
  }

  const deleteAllCompleted = () => {
    setTodos((preivousTodos) => (preivousTodos.filter(value => !value.completed)))
  }

  const handleSubmit = (input: string) => { 
        if (!input.trim()) return; // an empty string is considered a falsy value

        setTodos((previousTodos) => [...previousTodos, // when we use a setState, we are able to get the previous state value before changing it
          {
            id: Date.now(),
            title: input,
            completed: false,
          }  
        ]) 
    }

  return (
    <div className='overflow-y-auto'>
      <h1 className='text-center text-white font-bold pt-28 pb-3 text-5xl'>To-Do List</h1>
      <p className='text-center text-white font-bold text-2xl pb-20'>Your convenient list.</p>

      <div className='max-w-lg mx-auto'>
        <Input handleSubmit={handleSubmit}/>
        {todos.length === 0 ? <p className='text-center text-white font-bold p-5'>Empty list. Start by adding one.</p> : <TodoList todos={todos} handleChange={handleChange} handleDelete={handleDelete}/>}
      </div>
      {todos.length > 0 && <Summary todos={todos} deleteAllCompleted={deleteAllCompleted}/>}
    </div>
  )
}
