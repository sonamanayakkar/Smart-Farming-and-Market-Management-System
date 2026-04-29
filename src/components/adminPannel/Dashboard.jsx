import React, { useEffect, useState } from 'react'
import "./style/dashboard.css"
import { Link } from 'react-router-dom'

const Dashboard = () => {

    let [usertable, setUsertable] = useState([])
    let [count, setCount] = useState({ totalfarmers: 0, activedivestry: 0, profits: 0 })

    let date = () => {
        let date = new Date()
       return date.toLocaleDateString();
        
    }
    

    useEffect(() => {

        let getTopUser = async () => {
            try {

                const user = await fetch('http://localhost:4500/api/v1/agreesmart/users/topUser', {
                    method: "GET",
                    headers: { "Content-type": "application/json" }
                })

                const response = await user.json()
                setCount({ ...count, totalfarmers: response.response[0].users.length, activedivestry: response.response[0].totalcrops.length, profits: response.response[0].totalprofits })

                let usermap = response.response[0].users.map((ele, idx) => {
                    return {
                        firstName: ele.firstName,
                        district: ele.district,
                        date: ele.createdAt.split("T")[0],
                        crops: ele.userwith_cropdata,
                    }
                })

                setUsertable(usermap)



            } catch (error) {

            }
        }

        getTopUser()


    }, [])

    return (
        <section className='dashboardsection container-fluid p-4'>
            <div className="header">
                <div className="content">
                    <h5 className='fs-3 fw-bold'>Dashboard Overview</h5>
                    <p className='m-0'>Welcome back, Administrator 👋</p>
                </div>
                <div className="date">
                    📅 {date()}
                </div>
            </div>

            <div className="container cards mt-4">
                <div className="row g-2 ">
                    <div className="col col-lg-3 col-md-6  col-12">
                        <div className="c c1">
                            <h5>TOTAL FARMERS</h5>
                            <h1 className='text-white fw-bold'>{count.totalfarmers}</h1>
                            <span>+24 this week</span>

                            <div className="round">

                            </div>
                            <div className="icon"><i className="fa-solid fa-user-group"></i></div>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-12">
                        <div className="c c2">
                            <h5>ACTIVE DIVESTRIES</h5>
                            <h1 className='text-white fw-bold'>{count.activedivestry}</h1>
                            <span>+24 this week</span>

                            <div className="round">

                            </div>
                            <div className="icon"><i className="fa-solid fa-seedling"></i></div>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-12">
                        <div className="c c3">
                            <h5>TOTAL FARMERS</h5>
                            <h1 className='text-white fw-bold'>1,234</h1>
                            <span>+24 this week</span>

                            <div className="round">

                            </div>
                            <div className="icon"><i className="fa-solid fa-user-group"></i></div>
                        </div>
                    </div>
                    <div className="col col-lg-3 col-md-6 col-12">
                        <div className="c c4">
                            <h5>PLATFORM PROFITS</h5>
                            <h1 className='text-white fw-bold'>₹{count.profits}</h1>
                            <span>+24 this week</span>

                            <div className="round">

                            </div>
                            <div className="icon"><i className="fa-solid fa-sack-dollar"></i></div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="table mt-4  ">

                <div className="head d-flex justify-content-between align-items-center">
                    <h5>🆕 Recent Registrations</h5>
                    <Link to='/Admin/farmers'>View All →</Link>
                </div>

                <div className="insidetable mt-3">


                    <table className='w-100 '>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>NAME</th>
                                <th>DISTRICT</th>
                                <th>DATE</th>
                                <th>DIVESTRIES</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>

                        <tbody>



                            {usertable && usertable.length > 0 ? usertable.slice(0, 5).map((ele, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{ele.firstName}</td>
                                    <td>{ele.district}</td>
                                    <td>{ele.date}</td>
                                    <td>{ele.crops.length}</td>
                                    <td>active</td>
                                </tr>
                            )) : (<tr >
                                <td colSpan='6'>No data Found!</td>

                            </tr>)}


                        </tbody>
                    </table>
                </div>
            </div>

        </section>
    )
}

export default Dashboard