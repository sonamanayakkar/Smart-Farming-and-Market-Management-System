import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './styles/header2.css'

const Header2 = ({ set }) => {

    const url = useLocation().pathname

    let bg=(ref)=>{
        if (ref==url) {
            return 'rgb(0, 149, 0) '
        }
         return 'rgb(35, 35, 35) '
    }
    

    return (
        <div className="container-fluid header2c">
            <nav className='m-0'>
                <ul className='m-0 p-0'>
                    <li>
                        <Link to='/Home' className='d-flex flex-column align-items-center'>
                            {/* <i className="fa-solid fa-house text"></i> */}
                            🏠
                            <p className='m-0' style={{color:bg('/Home')}}>Home</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/search' className='d-flex flex-column align-items-center'>
                            {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                            🔎
                            <p className='m-0' style={{color:bg('/search')}}>Search</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/planner' className='d-flex flex-column align-items-center'>
                            {/* <i className="fa-brands fa-pagelines"></i> */}
                            🌿
                            <p className='m-0' style={{color:bg('/planner')}}>Planner</p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/profit' className='d-flex flex-column align-items-center'>
                            {/* <i className="fa-solid fa-sack-dollar"></i> */}
                            💰
                            <p className='m-0' style={{color:bg('/profit')}}>Profit</p>
                        </Link>
                    </li>
                    <li>
                        <Link className='d-flex flex-column align-items-center' onClick={() => set(true)}>
                            {/* <i className="fa-solid fa-user"></i> */}
                            👤
                            <p className='m-0'>Profile</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Header2