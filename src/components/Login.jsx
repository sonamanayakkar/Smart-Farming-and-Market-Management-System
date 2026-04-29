import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { setlocaldata } from "./localStorage/currentUser.js"





const Login = () => {

    const navigate = useNavigate()
    const [inputs, setInputs] = useState({ details: { role: 'farmer', sts: true }, fname: '', lname: '', password: '', email: '', District: 'Chennai' })
    const [errors, setErrors] = useState({})

    const [inputType, setInputType] = useState({ type: 'password', condition: false })


    let submit = (e) => {

        e.preventDefault()
        let err = {}
        if (!inputs.details.role) {
            err.fname = "Please Select Your Role";
        }


        let emailver = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!inputs.email) {
            err.email = "Email Required";
        }
        else if (!emailver.test(inputs.email)) {
            err.email = "Invalid Email";
        }
        if (!inputs.details.role) {
            err.role = "Please select role";
        }

        if (!inputs.password) {
            err.password = "Password Required";
        }
        else if ((inputs.password).length < 8) {
            err.password = "minimum 8 charecter Required";
        }


        setErrors(err)

        if (Object.keys(err).length == 0) {
            let fetchuserdata = async () => {
                const user = await fetch('http://localhost:4500/api/v1/agreesmart/users/login', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        email: inputs.email,
                        password: inputs.password,
                        role: inputs.details.role,
                    })
                }

                )

                const getdata = await user.json()

             

                if (getdata.status) {
                    localStorage.setItem('token', JSON.stringify(getdata.response))
                    // localStorage.setItem('User', JSON.stringify(getdata.response2))
                    setlocaldata('User', getdata.response2)

                    if (getdata.response2.role == "farmer") {
                        return navigate('/Home')
                    }
                    navigate('/Admin/dashboard')
                }

            }
            fetchuserdata()

        }
    }

    let eye = (condition) => {
        if (condition == 'openeye') {
            return setInputType({ ...inputType, type: 'text', condition: true })
        }
        setInputType({ ...inputType, type: 'password', condition: false })

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
                        <h2 className='text-center mt-4'>Smart Farming For Every Farmer</h2>
                        <p className='text-center mt-2 text-white'>Track expenses, monitor market prices, and maximize your harvest profits</p>
                    </div>
                    <div className="three mt-3">
                        <div className="t d-flex gap-3 align-items-center mb-3">
                            <div className="image">
                                <h3 className='m-0'>📊</h3>
                            </div>
                            <p className='m-0'>Real-time market prices</p>
                        </div>
                        <div className="t d-flex gap-3 align-items-center mb-3 text-center">
                            <div className="image">
                                <h3 className='m-0'>🌱</h3>
                            </div>
                            <p className='m-0'>Divestry Planning & Expense Tracking</p>
                        </div>
                        <div className="t d-flex gap-3 align-items-center mb-3">
                            <div className="image">
                                <h3 className='m-0'>💰</h3>
                            </div>
                            <p className='m-0'>Profit Calculator With Labour Salary</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="landr landr2">
                <h2>Welcome Back 👏</h2>
                <p className='p'>Sign in to your AgriSmart account</p>
                <form onSubmit={submit}>

                    <div className="box">
                        <label htmlFor="">EMAIL ADDRESS</label>
                        <input type="email" placeholder='farmer@gmail.com' onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                        <span>{errors.email}</span>
                    </div>

                    <div className="box">
                        <label htmlFor="">PASSWORD</label>
                        <div className="input w-100">
                            <input type={inputType.type} maxLength='13' placeholder='.........' onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                            <i className="fa-solid fa-eye" onClick={() => eye('openeye')} style={inputType.condition ? { display: "none" } : { display: 'block' }}></i>
                            <i className="fa-solid fa-eye-low-vision" onClick={() => eye('closeeye')} style={inputType.condition ? { display: "block" } : { display: 'none' }}></i>
                        </div>

                        <span>{errors.password}</span>
                    </div>

                    <div className="col">
                        <label htmlFor="">QUICK LOGIN AS</label>
                        <div className="split d-flex gap-3 mt-2">
                            <div className="choose w-50 " style={inputs.details.sts == true ? { background: 'rgba(47, 161, 47, 0.32)', border: '1.6px solid rgb(4, 81, 4)' } : { background: 'none' }} onClick={(e) => setInputs({ ...inputs, details: { role: 'farmer', sts: true } })}>
                                <h5>🌾</h5>
                                <h5>FARMER</h5>
                                <p className='m-0'>Track my farm</p>
                            </div>
                            <div className="choose w-50" style={inputs.details.sts == false ? { background: 'rgba(47, 161, 47, 0.32)', border: '1.6px solid rgb(4, 81, 4)' } : { background: 'none' }} onClick={(e) => setInputs({ ...inputs, details: { role: 'admin', sts: false } })}>
                                <h5>🛡️</h5>
                                <h5>ADMIN</h5>
                                <p className='m-0'>Manage platform</p>
                            </div>
                        </div>
                        <span >{errors.role}</span>
                    </div>


                    <div className="box">
                        <button className="btn " type="submit">Sign in</button>
                    </div>
                    <p>Don't have an account?<Link to='/register'>Create One</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Login