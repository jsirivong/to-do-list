import type Item from '../types/todo.ts' // type import, or an import involving only a type/interface
// you have to specify that it's a type import by using the "type" keyword

export const dummyData: Item[] = [
    {
        id: 1,
        title: "To-do item 1",
        completed: false,
    },
    {
        id: 2,
        title: "To-do item 2",
        completed: false,
    },
    {
        id: 3,
        title: "To-do item 3",
        completed: false
    },
]