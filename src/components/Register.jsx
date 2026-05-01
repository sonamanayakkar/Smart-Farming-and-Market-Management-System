import React, { useEffect, useRef, useState } from 'react'
import './styles/register.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import districts from '../../public/district.json'
import { apicall } from '../../handler/api'

const Register = () => {


    const navigate = useNavigate()
    const [inputs, setInputs] = useState({ details: { role: 'farmer', sts: true }, firstName: '', lastName: '', password: '', email: '', phone: '', district: 'Chennai' })
    const [errors, setErrors] = useState({})

    const [loader, setLoader] = useState(null)

    let submit = (e) => {
        e.preventDefault()
        let err = {}

        if (!inputs.details.role) {
            err.role = "Please Select Your Role";
        }
        if (!inputs.firstName) {
            err.firstName = "First name is required";
        } else if (inputs.firstName.length < 3) {
            err.firstName = "Minimum 3 characters";
        }

        if (!inputs.lastName) {
            err.lastName = "last name is required";
        }
        else if (inputs.lastName.length < 1) {
            err.lastName = "Minimum 1 characters";
        }

        let emailver = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!inputs.email) {
            err.email = "Email is required";
        }
        else if (!emailver.test(inputs.email)) {
            err.email = "invlid email id";
        }

        let mobilval = /^[6-9]\d{9}$/;

        if (!inputs.phone) {
            err.phone = "Mobile Number is required";
        }
        else if (!mobilval.test(inputs.phone)) {
            err.phone = "invalid Mobile Number";
        }


        if (!inputs.password) {
            err.password = "Password is required";
        }
        else if ((inputs.password).length < 8) {
            err.password = "Minimum 8 characters";
        }


        setErrors(err)
        if (Object.keys(err).length == 0) {
            setLoader(true)

            let postdatatoserver = async () => {
                const postingdata = await fetch(`${apicall()}users/register`, {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName: inputs.firstName,
                        lastName: inputs.lastName,
                        email: inputs.email,
                        phoneNumber: inputs.phone,
                        password: inputs.password,
                        district: inputs.district,
                        role: inputs.details.role,

                    })
                })

                const response = await postingdata.json();
                setLoader(false)
                alert(response.message)

                if (response.status) {

                    navigate('/')
                }

            }
            postdatatoserver()

        }
    }

    let phoneNumber = (e) => {
        const phonenumber = e.target.value
        if (phonenumber.length > 10) {

            let number = phonenumber.slice(0, 10)
            return setInputs({ ...inputs, phone: number })
        }

        setInputs({ ...inputs, phone: e.target.value })
    }


    if (loader == true) {
        return (

            <div className="h">
                <div class="hacker-loader">
                    <div class="binary-ring"></div>
                    <div class="core"></div>
                    <div class="binary-digits">
                        <span>0</span>
                        <span>1</span>
                        <span>0</span>
                        <span>1</span>
                        <span>1</span>
                        <span>0</span>
                        <span>1</span>
                        <span>0</span>
                    </div>
                    <div class="loading-text">Registering...</div>
                </div>
            </div>







        )
    }


    return (
        <div className='Registersection'>
            <div className="landr landr1">

                <div className="contents">
                    <div className="logo d-flex gap-2">
                        <div className="image">

                        </div>
                        <h1 className='m-0'>Agri<span>Smart</span></h1>
                    </div>
                    <div className="three">
                        <h2 className='text-center mt-4'>Join 10,000+ Smart Farmers</h2>
                        <p className='text-center mt-2 text-white   '>Start Tracking Your Farm Expences best Markets ,and Plan Your Crops Intelligently</p>
                    </div>
                    <div className="three mt-3">
                        <div className="t d-flex gap-3 align-items-center mb-3">
                            <div className="image">
                                <h3 className='m-0'>🆓</h3>
                            </div>
                            <p className='m-0'>Free to Register</p>
                        </div>
                        <div className="t d-flex gap-3 align-items-center mb-3 text-center">
                            <div className="image">
                                <h3 className='m-0'>🔒</h3>
                            </div>
                            <p className='m-0'>Your Data is Private And Secure</p>
                        </div>
                        <div className="t d-flex gap-3 align-items-center mb-3">
                            <div className="image">
                                <h3 className='m-0'>📱</h3>
                            </div>
                            <p className='m-0'>Works on all Devices</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="landr landr2">
                <h2>Create Account</h2>
                <p className='p'>Join AgriSmart and grow smarter</p>
                <form onSubmit={submit}>

                    <div className="col">
                        <label htmlFor="">I AM A</label>
                        <div className="split d-flex gap-3 mt-2">
                            <div className="choose w-50 " style={inputs.details.sts == true ? { background: 'rgba(47, 161, 47, 0.32)', border: '2px solid rgb(4, 81, 4)' } : { background: 'none' }} onClick={(e) => setInputs({ ...inputs, details: { role: 'farmer', sts: true } })}>
                                <h5>🌾</h5>
                                <h5>FARMER</h5>
                                <p className='m-0'>Track my farm</p>
                            </div>
                            <div className="choose w-50 d-none" style={inputs.details.sts == false ? { background: 'rgba(47, 161, 47, 0.32)', border: '2px solid rgb(4, 81, 4)' } : { background: 'none' }} onClick={(e) => setInputs({ ...inputs, details: { role: 'admin', sts: false } })}>
                                <h5>🛡️</h5>
                                <h5>ADMIN</h5>
                                <p className='m-0'>Manage platform</p>
                            </div>
                        </div>

                        <span >{errors.role}</span>
                    </div>
                    <div className="box2 d-flex gap-3">
                        <div className="two">
                            <label htmlFor="">FIRST NAME</label>
                            <input type="text" placeholder='e.g . Ravi' className='w-100' onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })} />
                            <span >{errors.firstName}</span>
                        </div>
                        <div className="two">
                            <label htmlFor="">LAST NAME</label>
                            <input type="text" placeholder='e.g . kumar ' className='w-100' onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })} />
                            <span >{errors.lastName}</span>
                        </div>
                    </div>
                    <div className="box">
                        <label htmlFor="">EMAIL</label>
                        <input type="email" placeholder='ravi@gmail.com' onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                        <span>{errors.email}</span>
                    </div>
                    <div className="box">
                        <label htmlFor="">PHONE NUMBER</label>
                        <input type="number" value={inputs.phone} placeholder='+91 1234 5678 90' onChange={phoneNumber} />
                        <span>{errors.phone}</span>
                    </div>
                    <div className="box">
                        <label htmlFor="">DISTRICT</label>
                        <select name="" id="" value={inputs.district} onChange={(e) => setInputs({ ...inputs, district: e.target.value })}>
                            <option value="">Select your district</option>n
                            {districts ? (districts.districts.map((ele, idx) =>
                            (
                                <option value={ele.name} key={idx}>{ele.name}</option>
                            )
                            )) : (<option value="">Select your district</option>)}

                        </select>
                    </div>
                    <div className="box">
                        <label htmlFor="">PASSWORD</label>
                        <input type="password" placeholder='min 8 characters' onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                        <span>{errors.password}</span>
                    </div>
                    <div className="box"></div>

                    <div className="box">
                        <button className="btn " type="submit">Creat Account</button>
                    </div>
                    <p>Already Have An Account? <Link to='/'>Sign in</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Register