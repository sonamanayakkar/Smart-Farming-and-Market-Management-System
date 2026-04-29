import React, { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Planner from './Planner'
import Divestries from './devestries/Divestries'
import Header from './Header'
import Profit from './Profit'
import Header2 from './Header2'
import Profile from './Profile'
import Labors from './devestries/Labors'


const Submain = () => {
    let [profileslide, setProfileslide] = useState(false)


    return (
        <div className="main">
            <Header set={setProfileslide} />

            <Routes >
                <Route path='/Home' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/planner' element={<Planner />} />
                <Route path='/divestry' element={<Divestries />} />
                <Route path='/labours/:cropid' element={<Labors />} />
                <Route path='/divestry/:cropid' element={<Divestries />} />
                <Route path='/back' element={<Planner />} />
                <Route path='/profit' element={<Profit />} />
            </Routes>

            {profileslide ? <Profile set={setProfileslide} /> : null}
            <Header2 set={setProfileslide} />


        </div>
    )
}

export default Submain