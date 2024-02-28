import { useState } from 'react'
import styles from './LoginForm.module.scss'

export default function LoginForm (props){
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value })
    }
    return(
        <>
            <h2 className={styles.heading}>Log In Below</h2>
            <form 
                className={styles.form} 
                onSubmit={(e) => {
                e.preventDefault()
                props.login(credentials)
            }}>
                <input type='email' name="email" onChange={handleChange} value={credentials.email} />
                <input type='password' name="password" onChange={handleChange} value={credentials.password} />
                <input type="submit" value="Submit" />
            </form>

        </>
    )
   } 