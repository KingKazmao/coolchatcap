import React, { useState } from 'react'
import loginImage from '../../assets/images/login.svg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../store/actions/auth'
import axios from 'axios'


import './Auth.scss'

const Login = () => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('sam.smith@gmail.com')
    const [password, setPassword] = useState('secret')
    const [user, setUser] = useState('user')

    function submitForm(e){
        console.log('YO')
        axios.post('/login', {email, password, })
        .then(res => {
            setUser(res.data.user.firstName) //user is stored on database if email and password match the database it will send back the info. email and password 
            //   props.history.push('/login')
        }) 
        
        e.preventDefault()
        // dispatch(login({ email, password }, history))
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={loginImage} alt='Login' />
                    </div>
                        <p>{user}</p>
                    <div id='form-section'>
                        <h2>HOWDY</h2>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required='required'
                                    type='text'
                                    placeholder='Email' />
                            </div>

                            <div className='input-field mb-2'>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='required'
                                    type='password'
                                    placeholder='Password' />
                            </div>

                            <button>LOGIN</button>
                        </form>

                        <p>Don't have an account? <Link to='/register'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login