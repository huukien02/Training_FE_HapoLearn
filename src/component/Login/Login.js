import './Login.scss'
import { BrowserRouter, Routes, Route, Link, NavLink, useParams } from 'react-router-dom'
import React, { useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import axios from 'axios'

function Login() {


  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [messageErr, setMessageErr] = useState(false)

  const handleLogin = () => {
    axios.post(`${process.env.REACT_APP_API}/login`, {
      username: username,
      password: password
    })
      .then(response => {
        if (response.status == 200) {

          localStorage.setItem('token', response.data.token);
          window.location = '/'
        }
      })
      .catch(error => {
        setMessageErr(true)

        let body = document.querySelector('body');
        body.addEventListener('click', () => {
          setMessageErr(false)
        });
      });
  }


  return (
    <div>
      <Header />
      <div className='login'>
        <div className='form'>
          <h1>Sign in to HapoLearn</h1>
          <p>Username</p>
          <input
            placeholder='Enter username'
            value={username}
            onChange={e => { setUserName(e.target.value) }}
          />
          <p>Password</p>
          <input
            placeholder='Enter password'
            type={'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {username == '' || password == '' ? (
            <button className='loginBtn loginDisable'>Login</button>
          ) : (
            <button onClick={handleLogin} className='loginBtn'>Login</button>
          )}

          <a href='/resetpass'>Forgot password</a>

          <button className='contact'>
            <i className="fa-brands fa-google fa-2x"></i>
            <i className="fa-solid fa-plus"></i>
            <span> Google</span>
          </button>

          <button className='create'>
            <span>
              <NavLink to='/signup'>Create New Account</NavLink>
            </span>
          </button>
        </div>


        {/* Render error messager */}
        {messageErr ? (
          <div className='notification'>
            <div className='modal'>
              <i className="fa-solid fa-circle-exclamation fa-2x"></i>
              <br></br>
              <p>The account or password is incorrect, please check again !!</p>
            </div>
          </div>
        ) : ('')}


      </div>
      <Footer />

    </div >
  )
}

export default Login


