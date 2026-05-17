import React, { useEffect, useRef, useState } from 'react'
import './styles/market.css'
import { apicall } from '../../../handler/api'
import { getkey } from '../localStorage/currentUser'
import { icon } from '../PlantIcons/icon'
import { input } from 'framer-motion/m'
import district from '../../../public/district.json'
import { ToastContainer, toast } from "react-toastify";
import { topview } from '../topView/topview'
import { autologout } from '../autologout/autoLogout.js'


const Market = ({ headerRefresh }) => {


    let [isopen, setIsopen] = useState(false)
    let [cropdata, setCropdata] = useState([])
    let [alreadyexist, setAlreadyexist] = useState(false)
    let [filters, setFilters] = useState({ search: '', district: '' })
    let [addcart, setAddcart] = useState({ cropId: '', farmerId: '', cropName: '', farmerName: '', district: '', QTY: 1, priceAmount: 0, kg: 0, defaultamount: 0 })




    useEffect(() => {
        autologout()
        let getposteddata = async () => {
            try {
                const crop = await fetch(`${apicall()}croplist/posted?search=${filters.search}&district=${filters.district}`, {
                    method: 'GET',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                })

                const response = await crop.json()

                setCropdata(response.response)

            }

            catch (error) {
                console.log(error);

            }
        }
        getposteddata()

    }, [filters])

    let addCart = (ele) => {



        let getdata = async () => {
            try {
                const crop = await fetch(`${apicall()}cartlist`, {
                    method: 'GET',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                })

                const response = await crop.json()


                const filter = response.response[0].items.filter(cart =>
                    cart.cropId.toString() === ele._id.toString()
                );




                if (filter.length > 0) {
                    const customToast = (message) => {
                        toast(({ closeToast }) => (
                            <div className="flex justify-between items-center ">

                                <h6>{message}</h6>
                                {/* <span style={{ color: '#067a00', fontWeight: '700' }}>{otp}</span> */}
                                {/* <button onClick={closeToast}>✖</button> */}
                            </div>
                        ), {
                            style: {
                                background: "linear-gradient(45deg, #ff0808, #d3272791)",
                                color: "#ffffff",

                            },
                            autoClose: true
                        });
                    };

                    customToast('Product already added on Cart')

                } else {
                    setAddcart({ ...addcart, cropId: ele._id, farmerId: ele.farmerId, cropName: ele.cropName, farmerName: ele.listwith_user[0].firstName, district: ele.listwith_user[0].district, defaultamount: ele.priceperkg, priceAmount: ele.priceperkg, kg: ele.availableKG })
                    setIsopen(true)

                }

            }

            catch (error) {


            }
        }

        getdata(ele)





    }

    let submit = (e) => {
        e.preventDefault()



        let postdata = async () => {
            try {

                const cart = await fetch(`${apicall()}cartlist`, {
                    method: "POST",
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                    body: JSON.stringify({
                        cropId: addcart.cropId,
                        farmerId: addcart.farmerId,
                        cropName: addcart.cropName,
                        quantity: addcart.QTY,
                        defaultPrice: addcart.defaultamount,
                        markedPrice: addcart.priceAmount,
                        availableKG: addcart.kg
                    })
                })

                const response = await cart.json()



                const customToast = (message) => {
                    toast(({ closeToast }) => (
                        <div className="flex justify-between items-center ">

                            <h6>{message}</h6>
                            {/* <span style={{ color: '#067a00', fontWeight: '700' }}>{otp}</span> */}
                            {/* <button onClick={closeToast}>✖</button> */}
                        </div>
                    ), {
                        style: {
                            background: "linear-gradient(45deg, #007002, #00ff0d91)",
                            color: "#ffffff",

                        },
                        autoClose: true
                    });
                };
                if (response) {
                    customToast(response.message)
                }
                setIsopen(false)
                headerRefresh(ele => !ele)

                setAddcart({ cropId: '', farmerId: '', cropName: '', farmerName: '', district: '', QTY: 1, priceAmount: 0, kg: 0, defaultamount: 0 })


            }
            catch (error) {
                console.log(error);

            }
        }
        if (addcart.QTY > 0) {
            return postdata()
        }
        alert(`Quantity cannot be 0`)




    }

    let setQuantity = (e) => {
        const positiveqty = Number(e.target.value)

        if (positiveqty == '') {
            setAddcart({ ...addcart, QTY: "", priceAmount: Number(e.target.value) * addcart.defaultamount })
            return
        }


        if (positiveqty <= 0) {

            return;
        }
        if (positiveqty > addcart.kg) {
            alert('ur exeed limit')
            setAddcart({ ...addcart, QTY: addcart.QTY })
            return
        }

        setAddcart({ ...addcart, QTY: Number(e.target.value), priceAmount: Number(e.target.value) * addcart.defaultamount })

    }

    const homeref = useRef()

    return (
        <>
            <section ref={homeref} className='marketsection'>

                <div className="banner my-3">
                    <h5>FRESH FROM THE FORM</h5>
                    <h1>Buy Direct from Farmers 🌾</h1>
                    <p>No middlemen. Best prices. Fresh produce direct from Tamil Nadu farms.</p>
                    <div className="three">
                        <div className="t">
                            🌾 124 Active Listings
                        </div>
                        <div className="t">
                            👨‍🌾 42 Verified Farmers
                        </div>
                        <div className="t">
                            🚚 Same Day Dispatch
                        </div>
                    </div>

                    <div className="circle bigcircle"></div>
                    <div className="circle smallcircle"></div>
                </div>

                <div className="filter">
                    <form action="">
                        <div className="box inputbox">
                            <input type="text" placeholder='Search crops, farmers...' onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
                            <div className="search">🔍</div>
                        </div>

                        <div className="box">
                            <select name="" id="" onChange={(e) => setFilters({ ...filters, district: e.target.value })}>
                                <option value="">All District</option>
                                {district.districts.map((ele, idx) => (
                                    <option value={ele.name} key={idx}>{ele.name}</option>
                                ))}

                            </select>
                        </div>
                        <p className='m-0'>Showing {cropdata.length} listings</p>
                    </form>
                </div>

                <div className="lists mt-3">

                    <div className="row row-cols-1 row-cols-lg-4">


                        {cropdata && cropdata.length > 0 ? cropdata.map((ele, idx) => (
                            <div className="col p-2" key={idx}>
                                <div className="card2">
                                    <div className="image">
                                        <h1>{icon(ele.cropName.toLowerCase())}</h1>
                                        <span>🌿 Fresh Today</span>
                                        <p className='m-0'>{ele.availableKG}kg Left</p>
                                    </div>

                                    <div className="details">

                                        <h4 className='fw-bold'>{ele.cropName}</h4>
                                        <div className="farmer my-2 d-flex gap-2 align-items-center" >

                                            <p className='m-0'>{ele.listwith_user[0].firstName} {ele.listwith_user[0].lastName} {ele.listwith_user[0].district}</p>

                                        </div>
                                        <h5>₹{ele.priceperkg} <span>/kg</span></h5>

                                        <div className="two">
                                            <div className="up d-flex gap-2 align-items-center">
                                                <p>📍 {ele.district}</p>
                                                <p>📦 {ele.availableKG} kg available</p>
                                            </div>
                                            <p>{ele.description}</p>
                                        </div>


                                        <button disabled={ele.availableKG <= 0} onClick={() => addCart(ele)} style={{
                                            cursor: ele.availableKG <= 0 ? "not-allowed" : "pointer",
                                            opacity: ele.availableKG <= 0 ? 0.6 : 1,
                                            backgroundColor: ele.availableKG <= 0 ? 'gray' : ''
                                        }}>{ele.availableKG > 0 ? '🛒 add to Cart' : 'This item has been sold!'}</button>


                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className="col p-2" >
                                no Products found
                            </div>
                        )}
                        {/* <div className="col p-2">
                        <div className="card2">
                            <div className="image">
                                <h1>🧅</h1>
                                <span>🌿 Fresh Today</span>
                                <p className='m-0'>90kg Left</p>
                            </div>

                            <div className="details">

                                <h4 className='fw-bold'>Onion</h4>
                                <div className="farmer my-2 d-flex gap-2 align-items-center" >
                                    <div className="image">
                                        <img src="" alt="" />
                                    </div>
                                    <p className='m-0'>Sonu E  trichy</p>

                                </div>
                                <h5>₹38 <span>/kg</span></h5>

                                <div className="two">
                                    <div className="up d-flex gap-2 align-items-center">
                                        <p>📍 trichy</p>
                                        <p>📦 120 kg available</p>
                                    </div>
                                    <p>fresh red onion</p>
                                </div>


                                <button>🛒 add to Cart</button>


                            </div>
                        </div>
                    </div> */}


                    </div>


                </div>
                <div className="topview" onClick={() => topview(homeref)}><i className="fa-solid fa-arrow-up"></i></div>
            </section>

            <div className="form" style={{ display: isopen ? 'flex' : 'none' }}>

                <form action="" className='divestryform' onSubmit={submit}>

                    <i className="fa-solid fa-xmark" onClick={() => { setIsopen(false); setAddcart({ cropId: '', farmerId: '', cropName: '', farmerName: '', district: '', QTY: 1, priceAmount: 0, kg: 0, defaultamount: 0 }) }} ></i>
                    <div className="box">
                        <h4 className='fs-5 fw-bold'>🛒 Add to Cart</h4>
                    </div>
                    <div className="info d-flex gap-3 align-items-center">
                        <h1>{icon(addcart.cropName.toLowerCase())}</h1>
                        <div className="details">
                            <h4 className='fs-5 fw-bold'>{addcart.cropName}</h4>
                            <p className=''>by {addcart.farmerName} · {addcart.district}</p>
                            <h6 className='m-0'>₹{addcart.defaultamount}/kg — {addcart.kg} kg available</h6>
                        </div>
                    </div>
                    <div className="box mt-3">
                        <label htmlFor="">QUANTITY TO BUY (kg)</label>
                        <input type="number" value={addcart.QTY} required placeholder='Enter quantity in kg' onChange={(e) => setQuantity(e)} />
                    </div>

                    <div className="info d-flex justify-content-between align-items-center my-3">
                        <p className='m-0'>Total Amount</p>
                        <h5 className='m-0'>₹{addcart.priceAmount}</h5>
                    </div>





                    <div className=" d-flex gap-3">
                        <button className='button1' type='button' onClick={() => { setIsopen(false); setAddcart({ cropId: '', farmerId: '', cropName: '', farmerName: '', district: '', QTY: 1, priceAmount: 0, kg: 0, defaultamount: 0 }) }}>Cancel</button>
                        <button className='button2' type='submit' style={{ backgroundColor: '#1669c4' }}>🛒 Add to Cart</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Market