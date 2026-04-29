import React, { useEffect, useRef, useState } from 'react'
import './styles/profit.css'
import { getkey } from './localStorage/currentUser.js'
import { icon } from './PlantIcons/icon.js'
import { topview } from './topView/topview.js'
import {apicall} from '../../handler/api.js'

const Profit = () => {
    let [crops, setCrops] = useState([])
    let [a, setA] = useState([])

    let [total, setTotal] = useState({ totalSpend: 0, totalEarned: 0, netProfit: 0, Divestries: 0 })

    let [filter, setFilter] = useState({ year: null, status: null, type: '' })

    const token = getkey()

    const all = useRef()
    const active = useRef()
    const progress = useRef()
    const closed = useRef()


    let resetbg = () => {
        all.current.style.backgroundColor = 'rgba(1, 118, 3, 0)'
        active.current.style.backgroundColor = 'rgba(1, 118, 3, 0)'
        progress.current.style.backgroundColor = 'rgba(1, 118, 3, 0)'
        closed.current.style.backgroundColor = 'rgba(1, 118, 3, 0)'

        all.current.style.color = 'rgb(61, 61, 61)'
        active.current.style.color = 'rgb(61, 61, 61)'
        progress.current.style.color = 'rgb(61, 61, 61)'
        closed.current.style.color = 'rgb(61, 61, 61)'

    }

    let bg = (value) => {
        resetbg()
        value.current.style.backgroundColor = 'rgb(1, 118, 3)'
        value.current.style.color = 'rgb(255, 255, 255)'

    }

    useEffect(() => {

        let getdata = async () => {
            try {

                const alldata = await fetch(`${apicall()}getallprofit?year=${filter.year}&status=${filter.status}&type=${filter.type}`, {
                    method: 'GET',
                    headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` }

                })

                const response = await alldata.json()

                setCrops(response.response[0].crops)

                if ((response.response[0].crops).length < 1) {
                    setTotal({ totalSpend: 0, totalEarned: 0, netProfit: 0, Divestries: 0 })
                }
                else {

                    setTotal({ totalSpend: response.response[0].totalExpenses, totalEarned: response.response[0].totalSaleAmount, netProfit: response.response[0].totalProfit, Divestries: response.response[0].totalDivestry })
                }
            } catch (error) {

            }
        }
        getdata()


    }, [filter])


    const stscolor = {
        active: 'rgb(0, 158, 3)',
        Completed: 'rgb(252, 56, 56)',
        "In Progress": "rgb(255, 115, 0)",
    }

    const profitref=useRef()

    return (
        <section className='profitsection py-lg-5 py-3' ref={profitref}>
            <div className="header">
                <h2>💰 Profit Summary</h2>
                <p className=''>Your complete financial overview</p>
            </div>

            <div className="three2 py-3  mb-4">
                <div className="container">
                    <div className="row row-cols-lg-4 row-cols-md-2 row-cols-1 g-4">

                        <div className="col">
                            <div className="card  c1" >

                                <div className="card-body">
                                    <h6 className="card-title">TOTAL SPEND</h6>
                                    <h3>₹ {total.totalSpend}</h3>
                                    {/* <p className='m-0'>Filtered divestries</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card  c2" >

                                <div className="card-body">
                                    <h6 className="card-title">TOTAL EARNED</h6>
                                    <h3>₹ {total.totalEarned}</h3>
                                    {/* <p className='m-0'>Closed harvests</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card  c4" >

                                <div className="card-body">
                                    <h6 className="card-title">NET PROFIT</h6>
                                    <h3>₹ {total.netProfit}</h3>
                                    {/* <p className='m-0'>+38% return</p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card  c3" >

                                <div className="card-body">
                                    <h6 className="card-title">Divestries</h6>
                                    <h3>{total.Divestries}</h3>
                                    {/* <p className='m-0'>1 active · 8 closed</p> */}
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="histories ">
                <div className="filter  ">
                    <div className="t d-lg-flex gap-4 ">
                        <div className="ft d-flex  gap-3 align-items-center mb-3 m-lg-0">
                            <label htmlFor="">🔍 Filter History</label>
                            <span className=''>YEAR</span>

                            <input type="number" placeholder='search by year' onChange={(e) => setFilter({ ...filter, year: e.target.value })} />
                        </div>
                        <div className="status d-flex gap-3 align-items-center">
                            <span>STATUS</span>
                            <div className="smallbox" style={{ backgroundColor: 'rgb(1, 118, 3)', color: 'white' }} ref={all} onClick={(e) => { bg(all); setFilter({ ...filter, status: null }) }}>
                                All
                            </div>
                            <div className="smallbox" ref={active} onClick={(e) => { bg(active); setFilter({ ...filter, status: 'active' }) }}>
                                🌱 Active
                            </div>
                            <div className="smallbox" ref={progress} onClick={(e) => { bg(progress); setFilter({ ...filter, status: 'In Progress' }) }}>
                                ⌛ In Progress
                            </div>
                            <div className="smallbox" ref={closed} onClick={(e) => { bg(closed); setFilter({ ...filter, status: 'Completed' }) }}>
                                🔒 Closed
                            </div>

                        </div>
                    </div>

                    <p className='text-end m-0'>Showing {total.Divestries} Histories</p>
                </div>

                <div className="lists mt-4">
                    <div className="l1">
                        {/* <div className="smallbox my-4">
                            2025
                        </div> */}


                        {crops && crops.length > 0 ? crops.map((ele, idx) => {
                            let calculation = () => {
                                return ((ele.totalSaleAmount - ele.totalExpenses) * 100) / ele.totalExpenses
                            }
                            let final = parseInt(calculation())

                            if (ele.status == "active" || ele.status == "In Progress") {
                                return (<div className="three py-lg-2 py-3 px-lg-5 px-2 mb-4" key={idx}>
                                    <div className=" d-flex flex-lg-row flex-md-row flex-column align-items-center" >
                                        <h1>{icon(ele.cropName)}</h1>
                                        <div className="card-body d-flex  flex-column align-items-lg-start align-items-center">
                                            <h5 className="card-title fs-5 fw-bold">{ele.cropName} <span style={{ color: stscolor[ele.status] }}>{ele.status}</span></h5>
                                            <p className="card-text">{ele.area} Acres.started {ele.startDate}</p>



                                        </div>

                                        <div className="endcontent">
                                            <h4>In Progress</h4>
                                            <p>₹ {ele.totalExpenses} spend</p>
                                        </div>


                                    </div>
                                </div>)
                            }

                            return (<div className="three py-lg-2 py-3 px-lg-5 px-2 mb-4" key={idx}>
                                <div className=" d-flex flex-lg-row flex-md-row flex-column align-items-center" >
                                    <h1>{icon(ele.cropName)}</h1>
                                    <div className="card-body d-flex  flex-column align-items-lg-start align-items-center">
                                        <h5 className="card-title fs-4 fw-bold">{ele.cropName} <span style={{ color: stscolor[ele.status] }}>{ele.status}</span></h5>
                                        <p className="card-text">{ele.area} Acres.started {ele.startDate}</p>

                                        <div className="maxlevel">
                                            <div className="correctlevel" style={final > 0 ? { backgroundColor: " rgb(1, 124, 18)", width: `${final}%` } : { backgroundColor: " rgb(215, 1, 1)", width: `${Math.abs(final)}%` }}></div>
                                        </div>

                                    </div>

                                    <div className="endcontent">
                                        <h4 style={final > 0 ? { color: 'rgb(4, 146, 23)' } : { color: 'rgb(255, 0, 0)' }}>{final > 0 ? '+' : '-'} ₹{Math.abs(ele.totalProfit)}</h4>
                                        <p>{final}% return</p>
                                    </div>


                                </div>
                            </div>)
                        }) : (<div className="three py-lg-2 py-3 px-lg-5 px-2 mb-4 text-center" >
                            No Recond Found !
                        </div>)}



                    </div>
                </div>
            </div>

              <div className="topview" onClick={()=>topview(profitref)}><i className="fa-solid fa-arrow-up"></i></div>

        </section >
    )
}

export default Profit