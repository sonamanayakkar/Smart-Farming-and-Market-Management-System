import React, { useState, useEffect } from 'react'
import './style/farmers.css'
import { h1 } from 'framer-motion/client'
import { apicall } from '../../../handler/api'

const Farmers = () => {

    let [usertable, setUsertable] = useState([])
    let [count, setCount] = useState({ totalfarmers: 0, activedivestry: 0, profits: 0 })

    let [filter, setFilter] = useState('')
    let [profile, setProfile] = useState({ image: '',firstName:'',lastName:'', email: '', joinyear: '', district: '', phone: '',profit:0 })
    let [close, setClose] = useState(false)




    useEffect(() => {

        let getTopUser = async () => {
            try {

                const user = await fetch(`${apicall()}users/alluser?name=${filter}`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" }
                })

                const response = await user.json()
                setCount({ ...count, totalfarmers: response.response[0].users.length, activedivestry: response.response[0].totalcrops.length, profits: response.response[0].totalprofits })
              

                let usermap = response.response[0].users.map((ele, idx) => {
                    return {
                        id: ele._id,
                        firstName: ele.firstName,
                        lastName: ele.lastName,
                        district: ele.district,
                        phoneNumber: ele.phoneNumber,
                        date: ele.createdAt.split("T")[0],
                        crops: ele.userwith_cropdata.length,
                        profit: ele.profitperuser,
                        profileImage: ele.profileImage,
                        email:ele.email
                    }
                })

                setUsertable(usermap)




            } catch (error) {

            }
        }

        getTopUser()


    }, [filter])


    let view = (ele) => {
        
        setClose(true)
        setProfile({ ...profile, image: ele.profileImage,firstName:ele.firstName,lastName:ele.lastName, email:ele.email, joinyear: ele.date, district: ele.district, phone: ele.phoneNumber,profit:ele.profit })
    }

    return (

        <>
            <section className='dashboardsection container-fluid p-0 p-lg-4'>

                <h5>👥 All Farmers</h5>
                <p>Manage all registered farmers</p>

                <div className="filter d-flex flex-column gap-2 flex-lg-row justify-content-between align-itemslg--center">
                    <div className="l d-flex gap-3 align-items-center">
                        <div className="b">Users: {count.totalfarmers}</div>
                      

                    </div>
                    <div className="l">
                        <input type="text" placeholder='Search by name...' onChange={(e) => setFilter(e.target.value)} />
                    </div>
                </div>

                <div className="table insidetable mt-4  p-0">


                    <table className='w-100  '>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>NAME</th>
                                <th>DISTRICT</th>
                                <th>PHONE</th>
                                <th>DATE</th>
                                <th>DIVESTRIES</th>
                                <th>TOTAL PROFIT</th>
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>

                        <tbody>

                            {usertable && usertable.length > 0 ? usertable.map((ele, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{ele.firstName}</td>
                                    <td>{ele.district}</td>
                                    <td>{ele.phoneNumber}</td>
                                    <td>{ele.date}</td>
                                    <td>{ele.crops}</td>
                                    <td>₹{ele.profit}</td>
                                    <td>active</td>
                                    <td className='d-flex gap-2 align-items-center justify-content-center'>
                                        <button className='butt1' style={{ cursor: "pointer" }} onClick={() => view(ele)}>View</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr >
                                    <td colSpan='9'>No data Found!</td>

                                </tr>
                            )}





                        </tbody>
                    </table>
                </div>

                <div className="userpopup" style={close ? { display: 'flex' } : { display: 'none' }}>
                    <div className="inside">
                        <div className="profile">
                            <h5 className=''>FARMER PROFILE</h5>
                            <div className="image">
                                <div className="img">
                                    <img src={profile.image || null} alt="" />
                                </div>

                            </div>
                            <div className="cross" onClick={()=>setClose(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </div>
                        </div>

                        <div className="contents">
                            <div className="emails d-flex justify-content-between">
                                <div className="two2">
                                    <h3>{profile.firstName} {profile.lastName}</h3>
                                    <p className='m-0'>{profile.email}</p>
                                    <p>Member since {profile.joinyear}</p>
                                </div>
                                <div className="two">
                                    <span><i className="fa-solid fa-check"></i> Active</span>
                                </div>
                            </div>

                            <div className="three">
                                
                                <div className="one">
                                    <h4 style={{ color: 'rgb(255, 102, 0)' }}>+₹{profile.profit}</h4>
                                    <p className='m-0'>NET PROFIT</p>
                                </div>

                             

                            </div>

                            <h5 className='my-3'>PERSONAL INFORMATION</h5>
                            <div className="information d-flex gap-4 align-items-center">

                                <div className="t">
                                    <p className='text-center'>District</p>
                                    <h6 className='text-center'>{profile.district}</h6>
                                </div>
                                <div className="t">
                                    <p className='text-center'>Phone</p>
                                    <h6 className='text-center'>{profile.phone}</h6>
                                </div>
                                <div className="t">
                                    <p className='text-center'>Joined</p>
                                    <h6 className='text-center'>{profile.joinyear}</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>


        </>
    )
}

export default Farmers