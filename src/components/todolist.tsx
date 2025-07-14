import type Item from '../types/todo.ts'
import TodoItem from './todoitem.tsx'

interface IProps {
    todos: Item[];
    handleChange: (id: number, completed: boolean) => void;
    handleDelete: (id: number) => void;
}

export default function TodoList({ todos, handleChange, handleDelete }: IProps) {
    const todosSorted = todos.sort((a, b) => { // when we get the todos array, we instantly sort it, so mapping the elements would be in order
        if (a.completed === b.completed){
            return b.id - a.id;
        }
        return a.completed ? 1 : -1
    })

    return (
        <div className='space-y-2 my-2'>
            {todosSorted.map((data: Item) => {
                return (
                    <TodoItem key={data.id} todo={data} onCompletedChange={handleChange} onDelete={handleDelete}/> // prop drilling, passing props through multiple components/layers
                )
            })}
        </div>
    )
}