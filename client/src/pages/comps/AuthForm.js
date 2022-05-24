// authentication form

import { useState, useEffect } from "react"
import styles from './authform.module.css'

const AuthForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signtype, setSigntype] = useState(true)

    const handleSubmit = (event) => {
        event.preventDefault()
        if(signtype === true) {
            fetch('/api/authenticate', {
                method: 'POST',
                body: JSON.stringify({username: username, password: password}),
                headers: {
                    'Content-Type': 'application/json'
                }
              })
              .then(res => {
                if (res.status === 200) {
                    //this.props.history.push('/')
                    props.parentCallBack(true)
                } else {
                    const error = new Error(res.error)
                    throw error
                }
              })
              .catch(err => {
                console.error(err)
                alert('Error logging in please try again')
            })
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password})
            }
            fetch('/api/register', requestOptions)
            .then(res => res.text())
            .then(res => console.log(res))
        }
    }

    return (
        <>
            <div className={styles.login}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required  />
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required  />
                        <input type='submit' value={(signtype === true)?'Sign in':'Sign up'} />
                    </form>
                    <button className={styles.signtypebtn} onClick={() => (signtype === true)?setSigntype(false):setSigntype(true)}>{(signtype === true)? 'Sign up': 'Sign in'}</button>
                </div>
            </div>
        </>
    )
}

export default AuthForm