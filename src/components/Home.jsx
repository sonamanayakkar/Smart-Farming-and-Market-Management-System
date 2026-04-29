import React, { useEffect, useRef, useState } from 'react'
import './styles/home.css'
import Header from './Header'
import onion from './images/home/onion.jpg'
import Profile from './Profile'
import { Link } from 'react-router-dom'
import { getkey } from './localStorage/currentUser.js'
import { icon } from './PlantIcons/icon.js'
import { topview } from './topView/topview.js'
import { apicall } from '../../handler/api.js'


const Home = () => {
    let [crops, setCrops] = useState([])

    let [expenses1, setExpenses1] = useState({ Expense1: 0, Profit1: 0, count1: 0 })

    const token = getkey()



    useEffect(() => {
        let apiget = async () => {
            const getdata = await fetch(`${apicall()}crops`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,  /// here i pass user token to server
                    "Content-type": "application/json"
                },
            })

            const response = await getdata.json()
            let cropsdata = response.response[0].lists
            let expenses = response.response[0].expenses[0]
            setCrops(cropsdata)

            if (expenses) {
                setExpenses1({ ...expenses1, Expense1: expenses.totalExpenses, Profit1: expenses.totalProfits, count1: response.response[0].lists.length })
            }
        }
        apiget()

    }, [])

    const homeref = useRef()


    return (


        <section className='container-fluid homesection ' ref={homeref}>



            <div className="border container-fluid summary">
                <div className="top d-flex justify-content-between align-item-center">
                    <div className="two d-flex  align-items-center gap-2" ><h2>📊</h2><h5 className='fw-bold'>Summary</h5></div>
                  
                    <Link to='/profit'>View All <i className="fa-solid fa-arrow-right"></i></Link>
                </div>
                <div className="bottom">

                    <div className="three t1 ">
                        <div className="inner">


                            <div className="e d-flex gap-2 align-items-center mb-2">
                                {/* <i className="fa-solid fa-wallet m-0"></i> */}
                                <h2 className='m-0'>💳</h2>
                                <h5 className='m-0'>Expense</h5>
                            </div>
                            <div className="p">
                                <h5>₹{expenses1.Expense1}</h5>
                            </div>
                            <p className='m-0'>Total Spend</p>
                        </div>
                    </div>
                    <div className="three t2 ">
                        <div className="inner">


                            <div className="e d-flex gap-2 align-items-center mb-2">
                                <h2 className='m-0'>💸</h2>
                                <h5 className='m-0'>Profit</h5>
                            </div>
                            <div className="p">
                                <h5>+ ₹{expenses1.Profit1}</h5>
                            </div>
                            <p className='m-0'>Total Earned</p>
                        </div>
                    </div>
                    <div className="three t3 ">
                        <div className="inner">


                            <div className="e d-flex gap-2 align-items-center mb-2">
                                <h2 className='m-0'>🌱</h2>
                                <h5 className='m-0'>Divestries</h5>
                            </div>
                            <div className="p">
                                <h5>{expenses1.count1}</h5>
                            </div>
                            <p className='m-0'>Total Divestries</p>
                        </div>
                    </div>



                </div>
            </div>



            <div className="active mt-4 ">
                <div className="header mb-4 d-flex justify-content-between align-item-center">
                    <h4 className='fw-bold'>🌱 Active Divestries</h4>
                    {/* <a href=""></a> */}
                    <Link to="/planner"> Manage <i className="fa-solid fa-arrow-right"></i></Link>
                </div>

                <div className="container">
                    <div className="store row row-cols-1 row-cols-lg-3 gx-4 gy-4">

                        {crops && crops.length > 0 ? crops.map((ele, idx) => {

                            if (ele.status != "Completed") {
                                return (
                                    <div className="col" key={idx}>
                                        <div className="box d-flex gap-4 align-items-center p-3">
                                            <h1>{icon(ele.cropName)}</h1>

                                            <div className="info">
                                                <h5 className='fw-bold'>{ele.cropName}</h5>
                                                <p>{ele.area} Acres . {ele.startDate}</p>
                                                <span style={ele.status == 'active' ? { backgroundColor: ' rgba(0, 179, 0, 0.31)' } : { backgroundColor: ' rgba(255, 119, 0, 0.19)', color: 'rgb(255, 77, 0)' }}>{ele.status}</span>
                                            </div>

                                            <div className="expense ms-auto">
                                                <h5>₹{ele.Expences}</h5>
                                                <p>expenses</p>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }
                        
                            

                        }) : (
                            <div className="col">
                                <div className="box p-3">
                                    <h5 className='text-center'>Active Divestry not found <i className="fa-solid fa-file-circle-xmark"></i></h5>

                                </div>
                            </div>
                        )}
                       

                    </div>
                </div>
            </div>

            <div className="topview" onClick={() => topview(homeref)}><i className="fa-solid fa-arrow-up"></i></div>

        </section>


    )
}

export default Home