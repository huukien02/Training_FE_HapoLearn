import './ResetPass.scss';
import React, { useState } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import axios from 'axios';

function ResetPass() {
    const [email, setEmail] = useState('')
    const [newPass, setNewPass] = useState('')

    const [messagerSuccess, setMessagerSuccess] = useState(false)
    const [messagerError, setMessagerError] = useState(false)


    const resetPass = () => {
        const token = localStorage.getItem("token");
        axios.post(`${process.env.REACT_APP_API}/resetpass`, {
            email: email
        }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(function (res) {

                if (res.status == 200) {
                    setMessagerSuccess(true)
                    const newPass = res.data
                    setNewPass(newPass)
                }
            })
            .catch(function (err) {
                setMessagerError(true)
            });
    }

    const closeModal = () => {
        setMessagerError(false)
    }

    const handleCopyPass = () => {
        setMessagerSuccess(false)
        navigator.clipboard.writeText(newPass)
            .then(function () {
                console.log('Async: Copying success');
            }, function (err) {
                console.error('Async: Could not copy text: ', err);
            });
    }

    return (
        <div>
            <Header />
            <div className='reset'>
                <div className='form'>
                    <h1>Reset Password</h1>
                    <p>
                        Enter email to reset your password
                    </p>
                    <span>Email:</span>
                    <input
                        onChange={e => { setEmail(e.target.value) }}
                        value={email}
                        placeholder='Enter email'
                    />


                    {email == '' ? (
                        <button className='disable'>Reset Password</button>
                    ) : (
                        <button onClick={resetPass}>Reset Password</button>
                    )}

                </div>


                {/* Render error messager */}
                {messagerError ? (
                    <div className='notification'>
                        <div className='modal'>
                            <p className='err'>Email Error !!</p> <br></br>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                ) : ('')}


                {/* Render sucess messager */}
                {messagerSuccess ? (
                    <div className='copyPass'>
                        <div className='modal'>
                            <p>Password : {newPass}</p> <br></br>
                            <button onClick={handleCopyPass}>Copy</button>
                        </div>
                    </div>
                ) : ('')}

            </div>
            <Footer />
        </div>
    )
}

export default ResetPass