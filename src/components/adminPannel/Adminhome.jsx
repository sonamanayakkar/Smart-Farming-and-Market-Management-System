import React, { useEffect, useRef, useState } from 'react'
import './adminhome.css'
import Header from '../Header'
import Dashboard from './Dashboard'
import Farmers from './Farmers'
import Swal from 'sweetalert2'
import { getlocaldata } from '../localStorage/currentUser'
import { Link, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

const Adminhome = () => {

    let [shrink, setShrink] = useState(null)

    const url = useLocation().pathname

    let navcolor = (path) => {
        if (path == url) {
            return { bg: 'rgba(56, 190, 56, 0.27)', color: 'rgb(140, 246, 147)' };

        }
        return { bg: 'rgba(56, 190, 56, 0)', color: 'rgb(196, 196, 196)' };


    }

    const navigate = useNavigate()

    let logout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do You want Logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Logout!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                navigate('/')

            }
        });
    }


    return (
        <section className='adminsection'>
            <header>
                <div className="header2 header3 m-0 ">
                    <div className="logo">
                        <i className="fa-solid fa-bars fs-4 text-white" style={{ cursor: "pointer" }} onClick={() => setShrink(!shrink)}></i>
                        <div className="image">

                        </div>
                        <h1 className='m-0'>Agri<span className='text-white'>Smart</span></h1>
                    </div>

                    <h4 className='text-white-50 fs-5 d-none d-md-block'>Admin Control pannel</h4>

                    <div className="profile">

                        <div className="bell">
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <div className="me d-flex gap-2">
                            <div className="four">
                                <div className="image">
                                    <img src={getlocaldata().profileImage} alt="" />
                                </div>
                            </div>
                            <div className="name">
                                <h5 className='m-0 text-white'>{getlocaldata().firstName} {getlocaldata().lastName}  <span className='ms-3'>{getlocaldata().role}</span></h5>
                                <p className='m-0 text-white-50'>{getlocaldata().district}</p>
                            </div>


                        </div>



                    </div>
                </div>

            </header>
            <aside style={!shrink ? { transform: 'translateX(0)' } : { transform: 'translateX(-100%)' }}>
                <div className="inside">

                    <div className="pro_file">
                        <div className="image">
                            <img src={getlocaldata().profileImage} alt="" />
                        </div>
                        <div className="content">
                            <h5 className='text-white'>Administrator</h5>
                            <p className='text-white-50 m-0'>{getlocaldata().email}</p>
                        </div>

                        <div className="status">Online</div>
                    </div>

                    <nav>
                        <ul>
                            <p className='ms-4 mt-2 mb-0' >overview</p>
                            <Link to='/Admin/dashboard' ><li  style={{backgroundColor:navcolor('/Admin/dashboard').bg,color:navcolor('/Admin/dashboard').color}}><i className="fa-solid fa-house"></i> Dahboard</li></Link>
                            <p className='ms-4 mt-2 mb-0'>Management</p>
                            <Link to='/Admin/farmers' ><li  style={{backgroundColor:navcolor('/Admin/farmers').bg,color:navcolor('/Admin/farmers').color}}> <i className="fa-solid fa-users"></i> All Farmers </li></Link>
                            <p className='ms-4 mt-2 mb-0'>Profits</p>
                            <Link to='/Admin/profitreports'><li  style={{backgroundColor:navcolor('/Admin/profitreports').bg,color:navcolor('/Admin/profitreports').color}}><i className="fa-solid fa-arrow-trend-up"></i> Profit Reports </li></Link>
                        </ul>
                    </nav>
                    <button className='w-100 mt-3' onClick={logout} style={{ backgroundColor: "rgba(249, 87, 87, 0.15)", border: "1.7px solid rgb(181, 40, 40)" }}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button>
                </div>

            </aside>

            <main>

                <Outlet />
            </main>
        </section>
    )
}

export default Adminhome