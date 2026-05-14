import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Buyerheader2 = ({set,cartlength}) => {
    const url = useLocation().pathname
   
    

    let bg = (ref) => {
        if (ref == url) {
            return 'rgb(0, 149, 0) '
        }
        return 'rgb(35, 35, 35) '
    }

    return (
        <div className="container-fluid header2c">
            <nav className='m-0'>
                <ul className='m-0 p-0'>
                    <li>
                        <Link to='/buyer/market' className='d-flex flex-column align-items-center'>
                            {/* <i className="fa-solid fa-house text"></i> */}
                            🏪
                            <p className='m-0' style={{ color: bg('/buyer/market') }}>Market </p>
                        </Link>
                    </li>
                    <li>
                        <Link to='/buyer/orders' className='d-flex flex-column align-items-center'>
                            {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                            📦
                            <p className='m-0' style={{ color: bg('/buyer/orders') }}>My Orders</p>
                        </Link>
                    </li>
                    <li className='cartnav'>
                        <Link to='/buyer/cart' className='d-flex flex-column align-items-center'>
                            {/* <i className="fa-brands fa-pagelines"></i> */}
                            🛒
                            <p className='m-0' style={{ color: bg('/buyer/cart') }} >Cart</p>
                             <div className="cartcount" style={cartlength.length>0?{display:'flex'}:{display:'none'}}>{cartlength.length}</div>
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

export default Buyerheader2