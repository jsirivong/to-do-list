import { useState, type FormEvent } from 'react'

interface IProps {
    handleSubmit: (input: string) => void;
}

export default function Input({ handleSubmit }: IProps){
    const [input, setInput] = useState("");
    
    return (
        <form className="flex wrap" onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault(); // prevents the default behavior; stops refreshing the page after submit, so it doesn't submit the form
            handleSubmit(input) // a callback to the parent component
            setInput("");
        }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Add your todos here." className="mx-auto rounded-s-md bg-white grow p-2"/>
            <button type="submit" className="w-16 rounded-e-mid bg-slate-900 text-white rounded-e-md hover:bg-slate-700">Add</button>
        </form>
    )
}