import type Item from '../types/todo.ts'

// it's good practice to make an interface every time you pass in props to a react component
interface IProps {
    todo: Item;
    onCompletedChange: (id: number, completed: boolean) => void;
    onDelete: (id: number) => void;
}

// the flex box allows for elements to be side by side
// the naming convention for components are in pascal case, or uppercase letter at the beginning of every word, or camel case with an uppercase letter at the start
export default function TodoItem({ todo, onCompletedChange, onDelete } : IProps){
    return (
        <div className='flex items-center'> 
            <label className='flex items-center gap-2 border-blue-950 border-4 rounded p-2 bg-blue-900 hover:bg-blue-800 grow'>
                <input type='checkbox' className='scale-125' checked={todo.completed} onChange={e => onCompletedChange(todo.id, e.target.checked)}/>
                <span className={todo.completed ? 'text-blue-200 line-through' : 'text-blue-200'}>
                    {todo.title}
                </span> 
            </label>

            <button className='bg-white rounded px-5 border-3 border-blue-950 hover:bg-gray-400 hover:px-6' onClick={() => onDelete(todo.id)}>
                Remove
            </button>
        </div>
    );
}