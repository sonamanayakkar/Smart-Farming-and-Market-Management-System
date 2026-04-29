import React from 'react'
import { Link } from 'react-router-dom'
import './styles/header2.css'

const Header2 = ({set}) => {
    return (
        <div className="container-fluid header2c">
            <nav className='m-0'>
                <ul className='m-0 p-0'>
                    <li>
                        <Link to='/Home' className='d-flex flex-column align-items-center'>
                            <i className="fa-solid fa-house text"></i>
                            <p className='m-0'>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/search' className='d-flex flex-column align-items-center'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <p className='m-0'>Search</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/planner' className='d-flex flex-column align-items-center'>
                            <i className="fa-brands fa-pagelines"></i>
                            <p className='m-0'>Planner</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/profit' className='d-flex flex-column align-items-center'>
                            <i className="fa-solid fa-sack-dollar"></i>
                            <p className='m-0'>Profit</p>
                        </Link>
                    </li>
                    <li>
                        <Link  className='d-flex flex-column align-items-center' onClick={()=>set(true)}>
                           <i className="fa-solid fa-user"></i>
                            <p className='m-0'>Profile</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header2