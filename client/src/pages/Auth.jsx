import React, { useState } from 'react'
import { MdOutlineRectangle } from "react-icons/md";
import AuthPageImage from '../assets/auth__page__image.png'
import './auth.css'
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';

const Auth = () => {
    const [change, setChange] = useState(false)
  return (
    <div className='auth__page'>

        <div className="auth__container">

            <h1 className="page__logo">
            <MdOutlineRectangle />
            logo
            </h1>

            <div className="container">
                <div className="left__side">
                    <img src={AuthPageImage} alt="img" />
                    <strong>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</strong>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad modi totam aut est officiis porro, quasi saepe velit commodi fugiat repellat veritatis exercitationem magni laudantium optio vel id eligendi dignissimos?</p>
                </div>

                <div className="right__side">
                    <div className="auth__form">
                        {
                            change ? <Login setChange={setChange} /> : <Register setChange={setChange}/>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Auth