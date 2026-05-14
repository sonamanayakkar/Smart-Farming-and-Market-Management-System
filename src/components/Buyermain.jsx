import React, { useState, useEffect } from 'react'
import Market from './buyer/Market'
import Cart from './buyer/Cart'
import Orders from './buyer/Orders'
import Header from './Header'
import Header2 from './Header2'
import Profile from './Profile'
import Buyerheader from './buyer/Buyerheader'
import { Route, Routes } from 'react-router-dom'
import Buyerheader2 from './buyer/Buyerheader2'
import { apicall } from '../../handler/api'
import { getkey } from './localStorage/currentUser'

const Buyermain = () => {
    let [profileslide, setProfileslide] = useState(false)
    let [cartItems, setCartItems] = useState([])
    let [refresh, setRefresh] = useState(false)
    

    useEffect(() => {

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



    return (
        <div className="main">
            <Buyerheader set={setProfileslide} cartlength={cartItems} />

            <Routes >
                <Route index  element={<Market headerRefresh={setRefresh}/>} />
                <Route index path='market' element={<Market headerRefresh={setRefresh}/>} />
                <Route index path='cart' element={<Cart headerRefresh={setRefresh}/>} />
                <Route index path='orders' element={<Orders />} />
            </Routes>

            {profileslide ? <Profile set={setProfileslide} /> : null}
            <Buyerheader2 set={setProfileslide} cartlength={cartItems} />


        </div>
    )
}

export default Buyermain