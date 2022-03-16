import React, { useState } from 'react'
import './todoList.css';
import Footer from './Footer';
import Header from './Header';
import List from './List';
import PubSub from 'pubsub-js'


function TodoList() {
    const [todos, setTodos] = useState([{ id: '001', task: 'study', done: false }])

    const addTodo = todo => {
        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    }

    const removeTodo = id => {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos);
    }

    const checkTodo = (id) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, done: !todo.done }
            } else return todo
        })
        setTodos(newTodos);
    }

    const editTodo = (id, task) => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, task }
            } else return todo
        })
        setTodos(newTodos);
    }

    const checkAllDone = done => {
        const newTodos = todos.map(todo => {
            return { ...todo, done }
        })
        setTodos(newTodos);
    }

    const clearAllDone = () => {
        const newTodos = todos.filter(todo => !todo.done)
        setTodos(newTodos);

    }

    const clearAll = () => {
        PubSub.publish('mia', '');
        setTodos([])
    };
    return (
        <div className="todo-app">
            <h1 className='todo-title'> My Todo List</h1>
            <Header addTodo={addTodo} />
            <List todos={todos} removeTodo={removeTodo} checkTodo={checkTodo} editTodo={editTodo} />
            <Footer todos={todos} checkAllDone={checkAllDone} clearAllDone={clearAllDone} clearAll={clearAll} />
        </div>
    )
}

export default TodoList