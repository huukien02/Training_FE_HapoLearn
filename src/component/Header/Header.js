import './Header.scss'

import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'

function Header() {
    const [hidden, setHidden] = useState(false)
    const token = localStorage.getItem("token");

    const handleShowMenu = () => {
        setHidden(prev => !prev)
    }
    const openModalLogout = () => {
        document.querySelector('.logout').style.display = 'block'
    }
    const closeModalLogout = () => {
        document.querySelector('.logout').style.display = 'none'
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload(false);
    }



    return (
        <div className='header'>

            <div className='logo'>
                <NavLink to='/' end >
                    <img src='https://haposoft.com/assets/front/img/big-logo.png' />
                </NavLink>

            </div>

            <div className='menu'>
                <ul>

                    <li>
                        <NavLink to='/' end >HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to='/listcourses'>ALL COURSES</NavLink>
                    </li>

                    <li>
                        <NavLink to='/profile'>PROFILE</NavLink>
                    </li>

                    {token != null ? (
                        <li onClick={openModalLogout}>
                            <button> LOGOUT </button>
                        </li>

                    ) : (
                        <li>
                            <NavLink to='/login'>LOGIN</NavLink>
                        </li>
                    )}

                </ul>
            </div >

            <i onClick={handleShowMenu} className="fa-solid fa-bars"></i>

            {hidden ? (
                <div className='menuHidden'>
                    <ul>
                        <li>HOME</li>
                        <li>All COURSES</li>
                        <li>LOGIN/REGISTER</li>
                        <li>PROFILE</li>
                    </ul>
                </div>
            ) : ('')}


            {/* modal Logout */}
            <div className='logout'>
                <div className='modal'>
                    <p>Are you Logout ??</p>
                    <div className='listBtn'>
                        <button onClick={handleLogout}>Yes</button>
                        <button onClick={closeModalLogout} className='btnNo'>No</button>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Header