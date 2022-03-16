import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { AiOutlineFileDone } from 'react-icons/ai';

function List({ todos, removeTodo, checkTodo, editTodo }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })


    const handChange = e => setEdit({ id: edit.id, value: e.target.value })

    const handleEdit = e => {
        e.preventDefault();
        if (edit.value.trim() === '') {
            alert('Cannot be empty, plese try again')
            return
        }
        editTodo(edit.id, edit.value)
        setEdit({
            id: null,
            value: ''
        })
    }
    if (edit.id) {
        return (
            <div className="todo-container">
                <form onSubmit={handleEdit} className="todo-edit">
                    <label>
                        <input type="text" value={edit.value} onChange={handChange} />
                    </label>
                    <span>
                        <AiOutlineFileDone
                            onClick={handleEdit}
                            className='icons update-icon'
                        />
                    </span>
                </form>
            </div>
        )
    }

    return (
        <div className="todo-container">
            <ul className="todo-list">
                {todos.map((todo) => {
                    return (<li key={todo.id} className={todo.done ? 'todo-row complete' : 'todo-row'}>
                        <label >
                            <input type="checkbox" checked={todo.done} onChange={() => checkTodo(todo.id)} />
                            <span className='todo-task'>{todo.task}</span>
                        </label>
                        <span >
                            <TiEdit
                                onClick={() => setEdit({ id: todo.id, value: todo.task })}
                                className='icons edit-icon'
                            />
                            <RiCloseCircleLine
                                onClick={() => removeTodo(todo.id)}
                                className='icons delete-icon'
                            />
                        </span>
                    </li>)
                })}
            </ul>
        </div >
    )
}

export default List
