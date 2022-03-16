import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import PubSub from 'pubsub-js'

function Email({ todos }) {
    const [address, setAddress] = useState('')
    const [userName, setName] = useState('');

    const untodos = todos.filter(todo => !todo.done)
    const untodoList = untodos.map(todo => todo.task.charAt(0).toUpperCase() + todo.task.slice(1))
    const donetodos = todos.filter(todo => todo.done)
    const donetodoList = donetodos.map(todo => todo.task.charAt(0).toUpperCase() + todo.task.slice(1))

    const token = PubSub.subscribe('mia', (_, data) => {
        setAddress('')
        setName('')
    })

    let templateParams = {
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: address,
        notes: { undone: untodoList, done: donetodoList }
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send('service_yb2j8kq', 'template_0xrspfe', templateParams, 'user_Ak4JS85QR5w9GZLqKm3hY')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });

        alert('Email sent!')
        e.target.reset()

        PubSub.unsubscribe(token)
        setAddress('')
        setName('')
    }

    return (
        <form className='todo-email' onSubmit={sendEmail} >
            <input type="email" placeholder="Name " value={userName} name="userName" onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email address " value={address} name="email" onChange={e => setAddress(e.target.value)} />
            <button onClick={sendEmail} className="todo-button">send</button>
        </form>
    )
}

export default Email
