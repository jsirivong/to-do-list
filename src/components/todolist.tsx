import type Item from '../types/todo.ts'
import TodoItem from './todoitem.tsx'

interface IProps {
    todos: Item[];
    handleChange: () => void;
}

export default function TodoList({ todos, handleChange }: IProps) {
    return (
        <div className='space-y-2'>
            {todos.map((data: Item) => {
                return (
                    <TodoItem key={data.id} todo={data} onCompletedChange={handleChange} />
                )
            })}
        </div>
    )
}