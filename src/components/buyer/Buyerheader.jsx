import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getlocaldata } from '../localStorage/currentUser'
import Swal from 'sweetalert2'
import { apicall } from '../../../handler/api'
import { getkey } from '../localStorage/currentUser'
import { ToastContainer, toast } from "react-toastify";

const Buyerheader = ({ set }) => {
   

    const buyerid = getlocaldata()._id


    let navcolor = (url) => {
        if (url == location) {
            return { bg: "rgba(0, 134, 20, 0.23)", text: "rgb(0, 115, 31)" };
        }
        return { bg: "rgba(0, 134, 20, 0)", text: "rgb(36, 36, 36)" };
    }

    const navigate = useNavigate()

    let logout = () => {
        Swal.fire({
            title: "Dou want to Logout?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    title: "Logging Out!",
                    // html: "I will close in <b></b> milliseconds.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        // timerInterval = setInterval(() => {
                        //     timer.textContent = `${Swal.getTimerLeft()}`;
                        // }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) navigate('/');
                });
            }
        });

    }

    let notificationCheck = () => {


        let getotp = async () => {
            try {
                const crop = await fetch(`${apicall()}OTP/${buyerid}`, {
                    method: 'GET',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                })

                const response = await crop.json();

                const customToast = (otp) => {
                    toast(({ closeToast }) => (
                        <div className="flex justify-between items-center ">

                            <h5>Delivery OTP</h5>
                            <span style={{ color: '#067a00', fontWeight: '700' }}>{otp}</span>
                            {/* <button onClick={closeToast}>✖</button> */}
                        </div>
                    ), {
                        style: {
                            background: "linear-gradient(135deg, #ffffff, #ffffff)",
                            color: "#000000",

                        },
                        autoClose: true
                    });
                };
                if (response) {
                    customToast(response.response[0].OTP)
                }
            } catch (error) {

            }
        }
        getotp()
    }




    return (
        <>
            <header>
                <div className="header2 ">

                    <div className="logo">
                        <div className="image">

                        </div>
                        <h1 className='m-0'>Agri<span>Smart</span></h1>
                    </div>
                    <nav className='m-0'>
                        <ul className='m-0 p-0'>
                            <li style={{ backgroundColor: navcolor('/Home').bg }}>
                                <Link to='/buyer/market' style={{ color: navcolor('/market').text }}>Market Place</Link>
                            </li>
                            <li style={{ backgroundColor: navcolor('/search').bg }}>
                                <Link to='/buyer/orders' style={{ color: navcolor('/orders').text }}>My Orders</Link>
                            </li>
                            <li style={{ backgroundColor: navcolor('/planner').bg }}>
                                <Link to='/buyer/cart' style={{ color: navcolor('/cart').text }}>Cart</Link>
                            </li>

                        </ul>
                    </nav>
                    <div className="profile">

                        <div className="bell" onClick={() => notificationCheck()}>
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <div className="me d-flex gap-2">
                            <div className="four">
                                <div className="image">
                                    <img src={getlocaldata().profileImage} alt="" />
                                </div>
                            </div>
                            <div className="name">
                                <h5 className='m-0'>{getlocaldata().firstName} {getlocaldata().lastName} <span>{getlocaldata().role}</span></h5>
                                <p className='m-0'>{getlocaldata().district} district</p>
                            </div>
                            <div className="four">
                                <div className="edit" onClick={() => set(true)}>
                                    <i className="fa-solid fa-pencil"></i>
                                </div>
                            </div>

                        </div>

                        <div className="four">
                            <button onClick={() => logout()}><i className="fa-solid fa-right-from-bracket"></i></button>
                        </div>

                    </div>
                </div>

            </header>




        </>
    )
}

export default Buyerheader