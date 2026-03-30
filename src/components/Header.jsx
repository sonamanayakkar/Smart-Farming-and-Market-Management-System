import React from 'react'
import './styles/header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <div className="header2 ">

                <div className="logo">
                    <div className="image">

                    </div>
                    <h1 className='m-0 '>Agri<span>Smart</span></h1>
                </div>
                <nav className='m-0'>
                    <ul className='m-0 p-0'>
                        <li>
                            <Link to='/' >Home</Link>
                        </li>
                        <li>
                            <Link to='/search' >Search</Link>
                        </li>
                        <li>
                            <Link to='/planner' >Planner</Link>
                        </li>
                        <li>
                            <Link to='/profit' >Profit</Link>
                        </li>
                    </ul>
                </nav>
                <div className="profile">
                    <i class="fa-regular fa-bell"></i>
                    <div className="image">

                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header