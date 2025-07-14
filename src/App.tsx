import TodoList from './components/todolist';
import Input from './components/input'
import './App.css'
import Summary from './components/todosummary';
import useTodos from './hooks/useTodos';

// hooks can only be called inside components

export default function App(){
  const {todos, handleChange, handleDelete, deleteAllCompleted, handleSubmit} = useTodos();

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
