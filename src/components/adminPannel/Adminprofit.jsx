import React, { useEffect, useState } from 'react'
import './style/profitreport.css'

const Adminprofit = () => {

    let [usertable, setUsertable] = useState([])
    let [count, setCount] = useState({ totalProfits: 0, totalLoss: 0, percentage: 0 })


    useEffect(() => {

        let getTopUser = async () => {
            try {

                const user = await fetch('http://localhost:4500/api/v1/agreesmart/getprofitOnly', {
                    method: "GET",
                    headers: { "Content-type": "application/json" }
                })

                const response = await user.json()
                const { saleAmount, totalProfit, totalLoss, profitPercentage } = response.response.crop2[0]
                setCount({ ...count, totalProfits: totalProfit, totalLoss: Math.abs(totalLoss), percentage: Math.round(profitPercentage) })

                let usermap = response.response.crop.map((ele, idx) => {
                    return {
                        name: ele.Profitwith_user[0].firstName,
                        district: ele.Profitwith_user[0].district,
                        cropName: ele.Profitwith_crop[0].cropName,
                        expense: ele.totalExpences,
                        sale: ele.saleAmount,
                        profitAmount: ele.profit.amount,
                        profitPercentage: Math.round(ele.profit.percentage),

                    }
                })


                setUsertable(usermap)



            } catch (error) {

            }
        }

        getTopUser()


    }, [])


    return (
        <section className='dashboardsection profitreport container-fluid p-4'>
            <div className="header">
                <div className="content">
                    <h5 className='fs-3 fw-bold'>📈 Profit Reports</h5>
                    <p className='m-0'>Financial overview across all farmers</p>
                </div>

            </div>

            <div className="container cards mt-4">
                <div className="row g-2 ">
                    <div className="col col-lg-4 col-md-6  col-12">
                        <div className="c c1">
                            <h4>💰</h4>
                            <h1 className=' fw-bold'>₹{count.totalProfits}</h1>
                            <p>Total Profits</p>

                            <div className="round">

                            </div>
                            <div className="icon"><i className="fa-solid fa-user-group"></i></div>
                        </div>
                    </div>

                    <div className="col col-lg-4 col-md-6  col-12">
                        <div className="c c2">
                            <h4>📉</h4>
                            <h1 className='fw-bold'>₹{count.totalLoss}</h1>
                            <p>Total Losses</p>

                            <div className="round">

                            </div>
                            <div className="icon"><i className="fa-solid fa-user-group"></i></div>
                        </div>
                    </div>

                    <div className="col col-lg-4 col-md-6  col-12">
                        <div className="c c3">
                            <h4>✅</h4>
                            <h1 className='fw-bold'>{count.percentage}%</h1>
                            <p>Profitable</p>

                            <div className="round">

                            </div>
                            <div className="icon"><i className="fa-solid fa-user-group"></i></div>
                        </div>
                    </div>

                    {/* <div class="col col-lg-3 col-md-6  col-12">
                        <div className="c c4">
                            <h4>🌾</h4>
                            <h1 className=' fw-bold'>Onion</h1>
                            <p>Top Crop</p>

                            <div className="round">

                            </div>
                            <div className="icon"><i class="fa-solid fa-user-group"></i></div>
                        </div>
                    </div> */}


                </div>
            </div>

            <div className="table mt-4  ">

                <div className="head d-flex justify-content-between align-items-center">
                    <h5>Farmer-wise Breakdown</h5>

                </div>

                <div className="insidetable mt-3">
                    <table className='w-100 mt-3'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>FARMER</th>
                                <th>DISTRICT</th>
                                <th>CROP</th>
                                <th>EXPENSE</th>
                                <th>SALE</th>
                                <th>PROFIT/LOSS</th>
                                <th>RETURN</th>
                            </tr>
                        </thead>

                        <tbody>

                            {usertable && usertable.length > 0 ? usertable.map((ele, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{ele.name}</td>
                                    <td>{ele.district}</td>
                                    <td>{ele.cropName}</td>
                                    <td>₹{ele.expense}</td>
                                    <td>₹{ele.sale}</td>
                                    <td > <span style={ele.profitAmount > 0 ? { backgroundColor: 'rgba(3, 209, 3, 0.23)', color: 'rgb(0, 137, 0)' } : { backgroundColor: 'rgba(255, 0, 0, 0.35)', color: 'rgb(255, 0, 0)' }}>₹{ele.profitAmount}</span></td>
                                    <td>{ele.profitPercentage}%</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan='8'>No data Found</td>

                                </tr>
                            )}


                        </tbody>
                    </table>

                </div>


            </div>

        </section>
    )
}

export default Adminprofit