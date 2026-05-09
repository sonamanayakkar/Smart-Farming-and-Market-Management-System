import React, { useState } from 'react'
import Market from './buyer/Market'
import Cart from './buyer/Cart'
import Orders from './buyer/Orders'
import Header from './Header'
import Header2 from './Header2'
import Profile from './Profile'
import Buyerheader from './buyer/Buyerheader'
import { Route, Routes } from 'react-router-dom'
import Buyerheader2 from './buyer/Buyerheader2'

const Buyermain = () => {
    let [profileslide, setProfileslide] = useState(false)


    return (
        <div className="main">
            <Buyerheader set={setProfileslide} />

            <Routes >
                <Route index element={<Market />} />
                <Route index path='market' element={<Market />} />
                <Route index path='cart' element={<Cart />} />
                <Route index path='orders' element={<Orders />} />
            </Routes>

            {profileslide ? <Profile set={setProfileslide} /> : null}
            <Buyerheader2 set={setProfileslide} />


        </div>
    )
}

export default Buyermain