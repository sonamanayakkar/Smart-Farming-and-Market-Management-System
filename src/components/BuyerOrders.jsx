import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './styles/buyerorder.css'
import { getkey } from './localStorage/currentUser'
import { apicall } from '../../handler/api'
import Swal from 'sweetalert2'


import { getlocaldata } from './localStorage/currentUser'

const BuyerOrders = () => {

    let [refresh, setRefresh] = useState(false)
    let [orders, setOrders] = useState([])
    let [otpinput, setOtpinput] = useState(0)
    let [orderid, setOrderid] = useState('')
    let [buyerID, setBuyerID] = useState('')

    let [isopen, setIsopen] = useState(false)



    useEffect(() => {
        let getdata = async () => {
            try {
                const crop = await fetch(`${apicall()}allorders`, {
                    method: 'GET',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                })

                const response = await crop.json()


                setOrders(response.response)


            }

            catch (error) {

            }
        }
        getdata()
    }, [refresh])

    let otpsend = (ele) => {

        setOrderid(ele._id)
        setBuyerID(ele.buyerId)

        let emailsend = async () => {
            try {
                const crop = await fetch(`${apicall()}OTP`, {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        buyerId: ele.buyerId,
                        orderId: ele._id
                    })

                })

                const response = await crop.json()



            }

            catch (error) {

            }
        }
        emailsend()


    }

    const inputbox = useRef()

    let otpsubmit = (e) => {
        e.preventDefault()



        let otpcheck = async () => {
            try {
                const crop = await fetch(`${apicall()}verifyOTP/`, {
                    method: 'POST',
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        orderId: orderid,
                        OTP: otpinput,
                        buyerId: buyerID
                    })

                })

                const response = await crop.json()

                console.log(response);
                if (response.status == false) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: " wrong OTP!",

                    });
                    inputbox.current.style.border = '2px solid red'
                    setRefresh(ele => !ele)
                }
                else {
                    Swal.fire({
                        title: "Product Delivered Successfully!",
                        icon: "success",
                        draggable: true
                    });
                    inputbox.current.style.border = '2px solid rgba(128, 128, 128, 0.614)'
                    setIsopen(false)
                    setRefresh(ele => !ele)

                }



            }

            catch (error) {

            }
        }
        otpcheck()
    }


    return (
        <>
            <section className='plannersection buyerordersection'>
                <div className="u">
                    <h3 className='fw-bold'>Planner</h3>
                    <p>Manage divestries, expenses & labour</p>
                </div>

                <div className="nav2 mt-5 mb-3 d-flex flex-wrap gap-3">
                    <div className="up " style={{backgroundColor:'rgb(255, 255, 255)'}}>
                        <Link to='/planner' style={{ textDecorationLine: 'none', color: 'rgb(0, 0, 0)' }}> <p className='m-0 fw-bold'>🌳 My Divestries</p></Link>
                    </div>
                    <div className="up " style={{backgroundColor:'rgb(255, 255, 255)'}}>
                        <Link to='/croplist' style={{ textDecorationLine: 'none', color: 'rgb(0, 0, 0)' }}> <p className='m-0 fw-bold'>🏷️ List My Products</p></Link>

                    </div>
                    <div className="up " style={{backgroundColor:'rgb(12, 131, 32)'}}>
                        <Link to='/buyerOrders' style={{ textDecorationLine: 'none', color: 'white' }}> <p className='m-0 fw-bold'>🗒️ Buyer Orders</p></Link>

                    </div>
                </div>

                <div className="table mt-4">
                    <table >
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Buyer</th>
                                <th>Crop </th>
                                <th>Qty </th>
                                <th>Amount </th>
                                <th>Address </th>
                                <th>Payment </th>
                                <th>Phone No </th>
                                <th>Date </th>
                                <th>Status </th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders && orders.length > 0 ? orders.map((ele, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{ele.buyerName}</td>
                                    <td>{ele.cropName}</td>
                                    <td>{ele.quantity} Kg</td>
                                    <td>₹ {ele.price}</td>
                                    <td>
                                        <div className="address" title={ele.buyerAddress.street + ele.buyerAddress.city + " - " + ele.buyerAddress.pincode}>
                                            {ele.buyerAddress.street},{ele.buyerAddress.city} - {ele.buyerAddress.pincode}
                                        </div>
                                    </td>
                                    <td>{ele.paymentMethod}</td>
                                    <td>{ele.buyerPhoneNumber}</td>
                                    <td>{ele.updatedAt.split('T')[0]}</td>
                                    <td>{ele.status}</td>
                                    <td><button onClick={() => { setIsopen(true); otpsend(ele) }} style={{ backgroundColor: 'rgb(0, 145, 255)' }}>send Otp </button></td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan='11'>No pending orders </td>

                                </tr>
                            )}



                        </tbody>
                    </table>
                </div>



            </section>

            <div className="form" style={{ display: isopen ? 'flex' : 'none' }}>
                <form action="" className='divestryform' onSubmit={otpsubmit}>
                    <i className="fa-solid fa-xmark" onClick={() => setIsopen(false)} ></i>
                    <div className="box">
                        <h4>🔐 OTP Verification</h4>
                    </div>
                    <div className="box">
                        <label htmlFor="">Enter OTP here...</label>
                        <input type="number" ref={inputbox} required placeholder='' onChange={(e) => setOtpinput(Number(e.target.value))} />
                    </div>


                    <div className=" boxb ">
                        <button className='button2' type='submit'>✓ Verify</button>
                    </div>

                </form>

            </div>


        </>
    )
}

export default BuyerOrders