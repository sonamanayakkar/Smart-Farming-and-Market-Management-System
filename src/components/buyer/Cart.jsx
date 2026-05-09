import React, { useEffect, useRef, useState } from 'react'
import './styles/cart.css'
import { getkey } from '../localStorage/currentUser'
import { apicall } from '../../../handler/api'
import Swal from 'sweetalert2'
import { icon } from '.././PlantIcons/icon.js'
import { topview } from '../topView/topview.js'
import { autologout } from '../autologout/autoLogout.js'

const Cart = () => {
    let [cross, setCross] = useState(false)
    let [refresh, setRefresh] = useState(false)
    let [cartItems, setCartItems] = useState([])
    let [totalamount, setTotalAmount] = useState(0)
    let [qty, setQty] = useState({ qty: 0, price: 0 })

    let [inputs, setInputs] = useState({ name: '', phone: '', street: '', city: '', pincode: '', paymentMethod: '' })
    let [errors, setErrors] = useState({})



    const cash = useRef()
    const upi = useRef()
    const bank = useRef()

    let reset = () => {
        cash.current.style.background = 'none'
        upi.current.style.background = 'none'
        bank.current.style.background = 'none'

        cash.current.style.border = '1.6px solid rgb(197, 197, 197)'
        upi.current.style.border = '1.6px solid rgb(197, 197, 197)'
        bank.current.style.border = '1.6px solid rgb(197, 197, 197)'


    }

    let bg = (ref) => {
        reset()
        ref.current.style.background = 'rgb(241, 255, 243)'
        ref.current.style.border = '2px solid rgb(0, 111, 37)'


    }


    useEffect(() => {
        autologout()
        let getdata = async () => {
            try {
                const crop = await fetch(`${apicall()}cartlist`, {
                    method: 'GET',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                })

                const response = await crop.json()


                setCartItems(response.response[0].items)
                setTotalAmount(response.response[0].totalamount[0].total)

            }

            catch (error) {


            }
        }
        getdata()
    }, [refresh])

    let trash = (id) => {


        let deleteCart = async () => {
            try {
                const crop = await fetch(`${apicall()}cartlist/${id}`, {
                    method: 'DELETE',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                })

                const response = await crop.json()

                setCartItems(response.response)

                setRefresh(ele => !ele)

            }

            catch (error) {
                console.log(error);

            }
        }
        deleteCart()

    }

    let increement = (id, qty, availablekg, defaultPrice) => {


        if (qty < availablekg) {
            const quantitytobuy = qty + 1
            const price = quantitytobuy * defaultPrice

            let updatedata = async () => {
                try {
                    const crop = await fetch(`${apicall()}cartlist/${id}`, {
                        method: 'PUT',
                        headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                        body: JSON.stringify({
                            quantity: quantitytobuy,
                            price: price
                        })
                    })

                    const response = await crop.json()

                    setRefresh(ele => !ele)

                }

                catch (error) {


                }
            }
            updatedata()
        }

        else {
            alert('u exeed maximum quantity!!')
        }


    }
    let decreement = (id, qty, availablekg, defaultPrice) => {

        if (qty > 1) {
            const quantitytobuy = qty - 1
            const price = quantitytobuy * defaultPrice

            let updatedata = async () => {
                try {
                    const crop = await fetch(`${apicall()}cartlist/${id}`, {
                        method: 'PUT',
                        headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                        body: JSON.stringify({
                            quantity: quantitytobuy,
                            price: price
                        })
                    })

                    const response = await crop.json()

                    setRefresh(ele => !ele)

                }

                catch (error) {


                }
            }
            updatedata()
        }

        else {
            alert('u exeed maximum quantity!!')
        }


    }

    let validation = () => {
        let errorobj = {}

        if (inputs.name.length < 3) {
            errorobj.name = 'Name must be 3 characters'
        }

        if (!/^(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}$/.test(inputs.phone)) {
            errorobj.phone = 'Incorrect Mobile Number'
        }
        if (inputs.street.length < 10) {
            errorobj.street = 'Give Detailed Address...'
        }
        if (inputs.city.length < 3) {
            errorobj.city = 'City name must be above 3 characters'
        }
        if (!/^[1-9][0-9]{5}$/.test(inputs.pincode)) {
            errorobj.pincode = 'Incorrect Pincode'
        }

        return errorobj
    }


    let confirmorder = (e) => {
        e.preventDefault()
        const errorobj = validation()

        setErrors(errorobj)


        let addonorder = async () => {
            try {
                const crop = await fetch(`${apicall()}orders`, {
                    method: 'POST',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                    body: JSON.stringify(inputs)

                })

                const response = await crop.json()
                console.log(response.message);
                Swal.fire({
                    title: response.message,
                    icon: "success",
                    draggable: true
                });

                setCross(false)
                setCartItems(ele => !ele)

            }

            catch (error) {
                console.log(error);

            }
        }
        if (Object.keys(errorobj).length == 0) {
            addonorder()
        }


    }

    const homeref = useRef()



    return (
        <>
            <section ref={homeref} className='cartsection'>

                <div className="header">
                    <h4>🛍️ My Cart</h4>
                    <p>Review and confirm your purchases</p>
                </div>

                <div className="orderdiv d-flex flex-wrap align-items-center gap-3">
                    <div className="l p-0">

                        {cartItems && cartItems.length > 0 ? cartItems.map((ele, idx) => (
                            <div className="list d-flex align-items-center gap-4 mb-3" key={idx}>
                                <h1>{icon(ele.cropName)}</h1>
                                <div className="d">
                                    <h5 className='fw-bold'>{ele.cropName}</h5>
                                    <p>{ele.userwithCart[0].firstName} {ele.userwithCart[0].lastName} · {ele.userwithCart[0].district}</p>
                                    <div className="d d-flex align-items-center gap-4">
                                        <div className="qty d-flex align-items-center ">
                                            <div className="b " onClick={() => decreement(ele._id, ele.quantity, ele.availableKG, ele.defaultPrice)}>-</div>
                                            <div className="v ">{ele.quantity} Kg</div>
                                            <div className="b " onClick={() => increement(ele._id, ele.quantity, ele.availableKG, ele.defaultPrice)}>+</div>
                                        </div>
                                        <h6 className='m-0'>₹{ele.defaultPrice}</h6>
                                    </div>

                                </div>

                                <i className="fa-solid fa-xmark" onClick={() => trash(ele._id)}></i>
                            </div>
                        )) : (
                            <div className="list d-flex align-items-center justify-content-center gap-4 mb-3">
                                Cart is empty
                            </div>
                        )}

                        {/* <div className="list d-flex align-items-center gap-4 mb-3">
                        <h1>🧅</h1>
                        <div className="d">
                            <h5 className='fw-bold'>Onion</h5>
                            <p>Murugesan P · Trichy</p>
                            <div className="d d-flex align-items-center gap-4">
                                <div className="qty d-flex align-items-center ">
                                    <div className="b ">-</div>
                                    <div className="v ">1 Kg</div>
                                    <div className="b ">+</div>
                                </div>
                                <h6 className='m-0'>₹38</h6>
                            </div>

                        </div>

                        <i className="fa-solid fa-xmark"></i>
                    </div> */}



                    </div>


                    <div className="r p-4">

                        <h4>Order Summary</h4>
                        <div className="hist py-2">

                            {cartItems && cartItems.length > 0 ? cartItems.map((ele, idx) => (
                                <div className="li d-flex align-items-center justify-content-between" key={idx}>
                                    <p> {ele.cropName} × {ele.quantity} kg</p>
                                    <h6>₹{ele.markedPrice}</h6>
                                </div>
                            )) : (
                                <div className="li d-flex align-items-center justify-content-center">
                                    cart is empty
                                </div>
                            )}

                        </div>

                        <div className="total d-flex align-items-center justify-content-between py-4">
                            <h4>Total</h4>
                            <h3>₹{cartItems.length > 0 ? totalamount : 0}</h3>
                        </div>
                        <button onClick={() => setCross(true)}>✓ Place Order</button>
                        <p className='mt-3 mb-0'>Payment on delivery. No advance needed.</p>

                    </div>
                </div>
                <div className="topview" onClick={() => topview(homeref)}><i className="fa-solid fa-arrow-up"></i></div>
            </section>

            <div className="cartsectionform form" style={cross ? { display: 'block' } : { display: 'none' }}>
                <div className="inside">
                    <form action="" className='divestryform p-0' onSubmit={confirmorder}>

                        <div className="up">
                            <i className="fa-solid fa-xmark text-white" onClick={() => setCross(false)}></i>
                            <h6 className='text-white-50 fw-bold fs-6'>Step 2 of 2</h6>
                            <h4 className='text-white fw-bold'>Confirm Pay</h4>
                        </div>

                        <div className="bottom">
                            <h5 className=''>🏡 DELIVERY ADDRESS</h5>
                            <div className="box d-flex flex-lg-row flex-column">
                                <div className="t  w-100">
                                    <label htmlFor="">FULL NAME</label>
                                    <input type="text" className=' w-100' required placeholder='Your full Name' onChange={(e) => setInputs({ ...inputs, name: e.target.value })} />
                                    <span>{errors.name}</span>
                                </div>
                                <div className="t  w-100">
                                    <label htmlFor="">PHONE</label><br />
                                    <input type="text" className=' w-100' required placeholder='+91 1234567890' onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} />
                                    <span>{errors.phone}</span>
                                </div>
                                <div className="t"></div>
                            </div>

                            <div className="box w-100">
                                <label htmlFor="">STREET / HOUSE NO.</label>
                                <input type="text" required className='w-100' placeholder='e.g. 12, Gandhi street, Ambattur' onChange={(e) => setInputs({ ...inputs, street: e.target.value })} />
                                <span>{errors.street}</span>
                            </div>

                            <div className="box d-flex flex-row box d-flex flex-lg-row flex-column">
                                <div className="t ">
                                    <label htmlFor="">CITY / TOWN</label>
                                    <input type="text" className=' w-100' required placeholder='e.g. Chennai' onChange={(e) => setInputs({ ...inputs, city: e.target.value })} />
                                    <span>{errors.city}</span>
                                </div>
                                <div className="t">
                                    <label htmlFor="">PINCODE</label>
                                    <input type="text" className=' w-100' required placeholder='600053' onChange={(e) => setInputs({ ...inputs, pincode: e.target.value })} />
                                    <span>{errors.pincode}</span>
                                </div>
                                <div className="t"></div>
                            </div>
                            <h5>💳 PAYMENT METHOD</h5>
                            <div className="box">

                                <div className="three d-flex gap-3 align-items-center mt-3" style={{ backgroundColor: 'rgb(241, 255, 243)', border: '2px solid rgb(0, 111, 37)' }} ref={cash} onClick={() => { bg(cash); setInputs({ ...inputs, paymentMethod: 'cash on delivery' }) }}>
                                    <h3>💵</h3>
                                    <div className="c">
                                        <h5>Cash On Delivery</h5>
                                        <p className='m-0'>Pay When the farmer delivers</p>
                                    </div>

                                </div>

                                <div className="three d-flex gap-3 align-items-center mt-3" ref={upi} onClick={() => { bg(upi); setInputs({ ...inputs, paymentMethod: 'UPI Payment' }) }}>
                                    <h3>📱</h3>
                                    <div className="c">
                                        <h5>UPI PAYMENT</h5>
                                        <p className='m-0'>Pay via PhonePe / GPay ?paytm</p>
                                    </div>

                                </div>

                                <div className="three d-flex gap-3 align-items-center mt-3" ref={bank} onClick={() => { bg(bank); setInputs({ ...inputs, paymentMethod: 'Bank Transfer' }) }}>
                                    <h3>🏦</h3>
                                    <div className="c">
                                        <h5>Bank Transfer</h5>
                                        <p className='m-0'>Direct Bank Transfer to farmer</p>
                                    </div>

                                </div>

                            </div>
                            <button type='submit' className='w-100'>✓ Place Order →</button>
                        </div>

                    </form>
                </div>


            </div>
        </>
    )
}

export default Cart