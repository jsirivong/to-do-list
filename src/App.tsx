import { useState } from 'react';
import { dummyData } from './services/todos'
import TodoList from './components/todolist';
import Input from './components/input'
import type Item from './types/todo' // type import, don't forget to add the "type" keyword
import './App.css'

export default function App(){
  const [ todos, setTodos ] = useState<Item[]>(dummyData); // "<Item[]>"" not necessary as typescript can infer the type
  // you can explicity state the type in arrow brackets as useState is a generic function/hook

  const handleChange = (id: number, completed: boolean): void => {
    setTodos((previousTodo) => previousTodo.map( // the map function returns a completely new array
      (value: Item) => value.id === id ? {...value, completed} : value // can't use curly braces inside setState when using a function
    ))
  } 

  const handleSubmit = (input: string) => { // you have to explicitly state the type of the event object since we declared a separate function
        if (!input.trim()) return; // an empty string is considered a falsy value

        setTodos((previousTodos) => [...previousTodos, // when we use a setState, we are able to get the previous state value before changing it
          {
            id: previousTodos.length + 1,
            title: input,
            completed: false,
          }  
        ]) 
    }

  return (
    <div>
      <h1 className='text-center text-white font-bold py-28 text-5xl'>Your To-Do List</h1>

      <div className='max-w-lg mx-auto'>
        <Input handleSubmit={handleSubmit}/>
        <TodoList/>
      </div>
    </div>
  )
}
