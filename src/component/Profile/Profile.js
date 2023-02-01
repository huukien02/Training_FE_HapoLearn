import './Profile.scss'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import NotFound from '../NotFound/NotFound'

function Profile() {
    const [data, setData] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [about, setAbout] = useState('')
    const [listCourses, setListCourses] = useState('')


    const [change, setChange] = useState(true)
    const [messageSuccess, setMessageSuccess] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("token");

        async function getData() {
            const res = await axios.get(`${process.env.REACT_APP_API}/joincourses/detail/join`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setListCourses(res.data)).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        let token = localStorage.getItem("token");

        async function getData() {
            const res = await axios.get(`${process.env.REACT_APP_API}/api/listusers`, { 'headers': { 'Authorization': token } })
            return res;
        }
        getData().then((res) => setData(res.data)).catch(err => {
            console.log(err);
        })
    }, [change])

    const handleEdit = () => {
        let token = localStorage.getItem("token");

        axios.put(`${process.env.REACT_APP_API}/edit/profile`, {
            name: name,
            email: email,
            date: date,
            phone: phone,
            address: address,
            about: about
        }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(function (response) {
                if (response.status == 200) {
                    setName('')
                    setEmail('')
                    setPhone('')
                    setAddress('')
                    setAbout('')
                    setDate('')

                    setMessageSuccess(true)
                    setChange(prev => !prev)
                }



            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const closeModal = () => {
        setMessageSuccess(false)
    }


    return (
        <>
            {data.length > 0 ? (
                <div>
                    <Header />
                    <div className='profile'>

                        <div className='left'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/768px-User-avatar.svg.png' />
                            <h1 className='name'>{data[0].name != '' ? (data[0].username) : ('')}</h1>
                            <p className='email'>{data[0].email != '' ? (data[0].email) : ('')}</p>

                            <p className='date'>
                                <i className="fa-solid fa-cake-candles"></i> {data[0].date != '' ? (data[0].date) : ('')}
                            </p>
                            <p className='phone'>
                                <i className="fa-solid fa-phone"></i> {data[0].phone != '' ? (data[0].phone) : ('')}
                            </p>
                            <p className='home'>
                                <i className="fa-solid fa-house"></i>{data[0].address != '' ? (data[0].address) : ('')}
                            </p>
                            <p>
                                {data[0].about != '' ? (data[0].about) : ('')}
                            </p>

                        </div>

                        <div className='right'>

                            <div className='myCourses'>
                                <h1>My courses</h1>
                                <p className='line'></p>
                                <div className='listCourses'>
                                    {listCourses ? (
                                        listCourses.map((item, idex) => {
                                            return (
                                                <div className='item'>
                                                    <img src={item.imgCourses} />
                                                    <p>{item.nameCourses}</p>
                                                </div>
                                            )
                                        })
                                    ) : ('')}

                                </div>
                            </div>

                            <div className='editProfile'>
                                <h1>Edit Profile</h1>
                                <p className='line'></p>
                                <div className='listInput'>
                                    <div>
                                        <p>Name:</p>
                                        <input
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Email:</p>
                                        <input
                                            placeholder='Enter email'
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Date of birthday:</p>
                                        <input type={'date'}
                                            value={date}
                                            onChange={e => setDate(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <input
                                            placeholder='Enter phone'
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <input
                                            placeholder='Enter Address'
                                            value={address}
                                            onChange={e => setAddress(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>About me:</p>
                                        <textarea
                                            placeholder='Enter about'
                                            value={about}
                                            onChange={e => setAbout(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {name == '' || email == '' || date == '' || phone == '' || address == '' || about == '' ?
                                    (
                                        <button className='disable'>
                                            Update
                                        </button>
                                    ) :
                                    (
                                        <button onClick={handleEdit}>
                                            Update
                                        </button>
                                    )}

                            </div>
                        </div>
                    </div>

                    {/* Render Message success */}
                    {messageSuccess ? (
                        <div className='notification'>
                            <div className='modal'>
                                <p>Edit success</p> <br></br>
                                <button onClick={closeModal}>Copy</button>
                            </div>
                        </div>
                    ) : ('')}
                    <Footer />
                </div>
            ) : (
                <div>
                    <NotFound />
                </div>
            )}

        </>
    )
}

export default Profile


