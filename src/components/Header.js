import React, { useRef } from 'react'

function Header({ addTodo }) {
    const myRef = useRef()

    const handleSubmit = e => {
        e.preventDefault();

        const task = myRef.current.value;
        if (task.trim() === '') {
            alert('Cannot be empty, plese try again')
            return
        }

        const newTodo = { id: Math.floor(Math.random() * 10000), task, done: false }
        addTodo(newTodo)
        myRef.current.value = ''
    }


    return (
        <form onSubmit={handleSubmit} className="todo-header">
            <label>
                <input type="text" ref={myRef} placeholder="Add todo..." />
                <button onClick={handleSubmit} className='todo-button'>add </button>
            </label>
        </form>
    )
}

export default Header
