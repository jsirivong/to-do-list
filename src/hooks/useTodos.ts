import { useState, useEffect } from 'react'
import type Item from '../types/todo'
import { dummyData } from '../services/todos';

export default function useTodos(){ // naming convention; custom hooks must start with the word "use" all lowercase
    const [ todos, setTodos ] = useState<Item[]>(() => { // hooks can only be called in react components or in custom hooks
    const savedList: Item[] = JSON.parse(localStorage.getItem("todos") || "[]") //JSON.parse() turns a JSON string back into an object
    // if the left hand side ("todos") is false (i.e. 0, "", NaN, null, undefined), then it'll parse the default value, "[]"

    return savedList.length > 0 ? savedList : dummyData;
  }); // "<Item[]>" not necessary as typescript can infer the type
  // you can explicity state the type in arrow brackets as useState is a generic function/hook

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // localStorage is a way to save data on the browser
    // it saves data in the form of key-value pairs
    // it can only save the key and values as strings, so we must turn the "todos" object into a JSON string using JSON.stringify() 
  }, [todos])

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

    return {
        todos,
        handleChange,
        handleDelete,
        deleteAllCompleted,
        handleSubmit
    }
}