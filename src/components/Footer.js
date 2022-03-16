import React from 'react'
import Email from './Email';

function Footer({ todos, checkAllDone, clearAllDone, clearAll }) {

    const total = todos.length
    const countTodo = todos.reduce((pre, current) => pre + (current.done ? 1 : 0), 0)
    const handleChange = e => checkAllDone(e.target.checked)

    return (
        <div className={total ? "" : "hide"}>
            <div className={total ? "todo-footer" : "todo-footer hide"}>
                <label>
                    <button className="todo-button">
                        <input type="checkbox" checked={countTodo === total && total !== 0 ? true : false} onChange={handleChange} />
                        Completed:{countTodo} / Total:{total}
                    </button>
                </label>

                <button onClick={() => clearAllDone()} className="todo-button">clear completed tasks</button>
                <button onClick={() => clearAll()} className="todo-button">clear</button>
            </div>
            <Email todos={todos} />
        </div >
    )
}

export default Footer
