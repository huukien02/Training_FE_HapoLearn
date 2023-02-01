import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import './Signup.scss'
import axios from 'axios'

function Signup() {

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const [errPassword, setErrPassword] = useState(false)
    const [errEmail, setErrEmail] = useState(false)
    const [errUsername, setErrUsername] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSignup = () => {

        if (confirm != password) {
            setErrPassword(true)
            document.querySelector('.signup').addEventListener('click', () => {
                setErrPassword(false)
            });
        }
        else {
            if (userName.length <= 5 || email.length <= 5) {
                setErrEmail(true)
                document.querySelector('.signup').addEventListener('click', () => {
                    setErrEmail(false)
                });
            }
            else {
                axios.post(`${process.env.REACT_APP_API}/signup`, {
                    email: email,
                    password: password,
                    username: userName
                })
                    .then(function (response) {
                        setSuccess(true)
                        document.querySelector('.signup').addEventListener('click', () => {
                            setSuccess(false)
                            window.location = '/'
                        });
                    })
                    .catch(function (error) {
                        setErrUsername(true)
                        document.querySelector('.signup').addEventListener('click', () => {
                            setErrUsername(false)
                        });
                    });
            }
        }

    }


    return (

        <>
            <Header />
            <div className='signup'>
                <div className='form'>
                    <h1>Sign up to HapoLearn</h1>
                    <p>Username</p>
                    <input
                        placeholder='Enter username'
                        value={userName}
                        onChange={e => { setUserName(e.target.value) }}
                    />
                    <p>Email</p>
                    <input
                        placeholder='Enter email'
                        value={email}
                        onChange={e => { setEmail(e.target.value) }}
                    />
                    <p>Password</p>
                    <input
                        type={'password'}
                        placeholder='Enter password'
                        value={password}
                        onChange={e => { setPassword(e.target.value) }}
                    />
                    <p>Confirm Password</p>
                    <input
                        type={'password'}
                        placeholder='Confirm password'
                        value={confirm}
                        onChange={e => { setConfirm(e.target.value) }}
                    />

                    {userName == '' || email == '' || password == '' || confirm == '' ? (
                        <button className='btnSignup btnSignupDisable'>
                            <span>Sign up</span>
                        </button>
                    ) : (
                        <button onClick={handleSignup} className='btnSignup'>
                            <span>Sign up</span>
                        </button>
                    )}

                </div>


                {/* Render error Password  */}
                {errPassword ? (
                    <div className='notification'>
                        <div className='modal'>
                            <i className="fa-solid fa-circle-exclamation fa-2x"></i>
                            <br></br>
                            <p>Confirm Password !!</p>
                        </div>
                    </div>
                ) : ('')}


                {/* Render error Email  */}
                {errEmail ? (
                    <div className='notification'>
                        <div className='modal'>
                            <i className="fa-solid fa-circle-exclamation fa-2x"></i>
                            <br></br>
                            <p>Password or Email is more than 5 characters !!</p>
                        </div>
                    </div>
                ) : ('')}


                {/* Render error Username  */}
                {errUsername ? (
                    <div className='notification'>
                        <div className='modal'>
                            <i className="fa-solid fa-circle-exclamation fa-2x"></i>
                            <br></br>
                            <p>This Username already has a user !!</p>
                        </div>
                    </div>
                ) : ('')}


                {/* Render signup Success  */}
                {success ? (
                    <div className='notification'>
                        <div className='modal'>
                            <i className="fa-solid fa-circle-check fa-2x messagerSuccess"></i>
                            <br></br>
                            <p className='messagerSuccess'>Sign Up Success</p>
                        </div>
                    </div>
                ) : ('')}

            </div>

            <Footer />

        </>
    )
}

export default Signup





