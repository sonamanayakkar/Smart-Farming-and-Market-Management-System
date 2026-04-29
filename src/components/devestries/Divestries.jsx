import React, { useEffect, useState } from 'react'
import './divestry.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getkey } from '../localStorage/currentUser.js'
import {icon} from '../PlantIcons/icon.js'

const Divestries = () => {

    let [inputs, setInputs] = useState({ date: new Date().toISOString().split("T")[0], item: '', amount: '' })
    let [editid, setEditid] = useState(null)
    let [expences, setExpences] = useState([])
    let [labourHistory, setLabourhistory] = useState([])
    let [paid, setPaid] = useState(0)
    let [refresh, setrefresh] = useState(false)
    let [labourtable, setLabourtable] = useState(false)
    let [cropname, setCropname] = useState({ area: 0, cropName: '', date: '' })

    let [expenseamt, setExpensessmt] = useState({ totalExpences: '' })
    let [saleAmount, setSaleAmount] = useState(0)

    let [finalAmt, setFinalAmt] = useState({ totalExpences: 0, saleAmount: 0, amount: 0, percentage: 0, Isclosed: false })
    const { cropid } = useParams()  // get crop id from URL
    let [green, setGreen] = useState(false)

    const token = getkey()


    let addexpenses = (e) => {
        e.preventDefault()



        if (!editid) {

            let postdata = async () => {
                try {
                    const expence = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/profit/${cropid}`, {
                        method: 'PUT',
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({
                            date: inputs.date,
                            item: inputs.item,
                            Amount: Number(inputs.amount),

                        })
                    })
                    const response = await expence.json()
                    const data = response.response.expences
                    console.log(response);



                } catch (error) {

                }
            }
            postdata()



        } else {


            let updateData = async () => {

                try {
                    const expence = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/profit/expense/${cropid}/${editid}`, {
                        method: 'PUT',
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({
                            date: inputs.date,
                            item: inputs.item,
                            Amount: inputs.amount

                        })
                    })
                    const response = await expence.json()
                    const data = response.response.expences


                } catch (error) {

                }
            }

            updateData()

            setEditid(null)
        }

        setInputs({ date: new Date().toISOString().split("T")[0], item: '', amount: '' })
        setrefresh(!refresh)

    }

    let remove = (id) => {
        let removedata = async () => {
            try {
                const expence = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/profit/${cropid}/${id}`, {
                    method: 'DELETE',
                    headers: { "content-type": "application/json" }

                })
                const response = await expence.json()

                const data = response.response[0].expenses


                setExpences(data)

            } catch (error) {

            }
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Expense!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove this!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await removedata()
                setrefresh(!refresh)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Expense has been Deleted.",
                    icon: "success"
                });
            }
        });




        // setrefresh(!refresh)


    }

    let edit = (ele) => {
        setEditid(ele._id)
        setInputs({ date: ele.date, item: ele.item, amount: ele.Amount })
    }


    let profit = (e) => {
        e.preventDefault()
        let profitcalculation = () => {
            const saleAmount1 = Number(saleAmount)
            const finalAmount = saleAmount1 - expenseamt.totalExpences
            const profit = (finalAmount / expenseamt.totalExpences) * 100

            return [saleAmount1, finalAmount, profit]
        }

        let [saled, finalAmount, profitPercentage] = profitcalculation()

        let updateamounts = async () => {
            try {
                await fetch(`http://localhost:4500/api/v1/agreesmart/crops/profit/saled/${cropid}`, {
                    method: "PUT",
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({
                        saled: saled,
                        finalAmount: finalAmount,
                        profit: profitPercentage,
                        endDate: new Date()
                    })
                })
            } catch (error) {

            }
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Divestry!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Calculate and Close the Divestry!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await updateamounts()
                setrefresh(!refresh)
                Swal.fire({
                    title: "Success!",
                    text: "Your profit has been Calculated.",
                    icon: "success"
                });
            }
        });




    }

    let showlabour = (ids) => {
        setLabourtable(true)



        let labourHistory = async () => {
            try {
                const history = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/labour/history/${cropid}/${ids}`, {
                    method: "GET",
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` }
                })

                const response = await history.json()

                setLabourhistory(response.response[0].labours)
                setPaid(response.response[0].paid)
                console.log(response.response[0].paid);


            }
            catch (error) {

            }
        }
        labourHistory()

    }



    useEffect(() => {

        let getdata = async () => {
            try {
                const expence = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/profit/${cropid}`, {
                    method: 'GET',
                    headers: { "content-type": "application/json" }

                })
                const response = await expence.json()



                const area = response.response[0].area
                const cropName = response.response[0].cropName
                const date = new Date(response.response[0].createdAt);

                const onlyDate = date.toLocaleDateString("en-IN");


                setCropname({ area: area, cropName: cropName, date: onlyDate })

                const totalExpences = response.response[0].crops_withProfitsData[0].totalExpences
                const saleAmount = response.response[0].crops_withProfitsData[0].saleAmount
                const profitObj = response.response[0].crops_withProfitsData[0].profit
                const Isclosed = response.response[0].crops_withProfitsData[0].Isclosed




                const data = response.response[0].crops_withProfitsData[0].expenses
                setExpensessmt({ ...expenseamt, totalExpences: totalExpences })
                setExpences(data)
                setFinalAmt({ totalExpences: totalExpences, saleAmount: saleAmount, amount: profitObj.amount, percentage: parseInt(profitObj.percentage), Isclosed: Isclosed })


            } catch (error) {

            }
        }
        getdata()


    }, [refresh])

    const navigate = useNavigate()
    let attendance = () => {
        navigate(`/labours/${cropid}`)
    }




    return (
        <>
            <section className='container-fluid divestrysection '>

                <div className="l">
                    <div className="up mb-5" style={{ cursor: 'pointer' }}>
                        <p className='m-0'>🌳 My Divestries</p>
                    </div>
                    <div className="up mb-5 bg-white text-dark" style={{ cursor: 'pointer' }}>
                        <p className='m-0' onClick={attendance}>👷 Labour Attendance</p>
                    </div>
                </div>


                <div className="three py-3 px-5 mb-4">
                    <div class=" d-flex align-items-center" >
                        <h1 className='h1 m-0'>{icon(cropname.cropName)}</h1>
                        <div class="card-body ">
                            <h5 class="card-title fs-4 fw-bold">{cropname.cropName}</h5>
                            <p class="card-text">{cropname.area} Acres.started {cropname.date}</p>

                        </div>
                        <Link to='/planner' class="btn "><i class="fa-solid fa-arrow-left-long " ></i>  Back to Divestries</Link>

                    </div>
                </div>

                <div className="three py-3  p-4 mb-4 gap-3 align-items-center closed" style={finalAmt.Isclosed ? { display: 'flex' } : { display: "none" }}>
                    <h2>🔒</h2>
                    <div className="contents">
                        <h5 className='fs-6 fw-bold'>Divestry Closed —  Profit has been calculated. This record is read-only.</h5>

                    </div>
                </div>
                <div className="three2 py-3  mb-4">
                    <div className="container">
                        <div className="row row-cols-lg-3">

                            <div className="col">
                                <div class="card  c1" >

                                    <div class="card-body">
                                        <h6 class="card-title">TOTAL EXPENSE</h6>
                                        <h3>₹{expenseamt.totalExpences}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col ">
                                <div class="card c2" >

                                    <div class="card-body">
                                        <h6 class="card-title">SALE AMOUNT</h6>
                                        <h3>₹ {finalAmt.saleAmount}</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col ">
                                <div class="card c3" >

                                    <div class="card-body">
                                        <h6 class="card-title">NET PROFIT / LOSS</h6>
                                        <h3>₹ {finalAmt.amount}</h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="three py-3  p-4 mb-4">
                    <form class="row g-3 " onSubmit={addexpenses}>
                        <div class="col-md-3">

                            <label htmlFor="inputEmail4" class="form-label">DATE</label>
                            <input type="date" class="form-control" id="inputEmail4" required value={inputs.date} onChange={(e) => setInputs({ ...inputs, date: e.target.value })} style={finalAmt.Isclosed ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }} />
                        </div>
                        <div class="col-md-6">
                            <label htmlFor="inputPassword4" class="form-label">EXPENSE ITEM</label>
                            <input type="text" class="form-control" required id="inputPassword4" placeholder='e.g.Fertilizer,seeds,Labour' value={inputs.item} onChange={(e) => setInputs({ ...inputs, item: e.target.value })} style={finalAmt.Isclosed ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }} />
                        </div>
                        <div class="col-md-3  d-flex gap-3 align-items-center">
                            <div className="box">
                                <label htmlFor="inputPassword4" class="form-label">Amount ( ₹ )</label>
                                <input type="number" class="form-control" required id="inputPassword4" placeholder='e.g.Amount' value={inputs.amount} onChange={(e) => setInputs({ ...inputs, amount: e.target.value })} style={finalAmt.Isclosed ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }} />
                            </div>

                            <button type="submit" class=" mt-4" style={finalAmt.Isclosed ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }}>+ Add</button>

                        </div>





                    </form>

                </div>



                <div className="table  mb-4">
                    <table>
                        <thead>
                            <tr>
                                <th>S. NO</th>
                                <th>DATE</th>
                                <th>ITEM</th>
                                <th>AMOUNT</th>
                                <th style={finalAmt.Isclosed ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }}>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expences && expences.length > 0 ? expences.map((ele, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{ele.date}</td>
                                    <td>{ele.item}{(ele.item.includes('Labour')) ? (<i className="fa-solid fa-arrow-up-right-from-square ms-3" style={{ color: " rgb(0, 64, 255)" }} onClick={() => showlabour(ele.labourIds)}></i>) : ""}</td>
                                    <td>{ele.Amount}</td>
                                    <td style={finalAmt.Isclosed ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }}><i class="fa-solid fa-pencil me-2" onClick={() => edit(ele)}></i> <i class="fa-solid fa-xmark" onClick={() => remove(ele._id)}></i> </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan='5'>No Expenses added</td>

                                </tr>
                            )}



                        </tbody>
                    </table>
                </div>

                <div className="three py-3  p-4 mb-4 " style={finalAmt.Isclosed ? { display: 'none' } : { display: "block" }}>
                    <form class=" d-flex  flex-column " onSubmit={profit}>
                        <label htmlFor="" style={{color:'rgb(19, 139, 1)'}}>💸 ENTER FINAL HARVEST SALE AMOUNT (₹)</label>
                        <div className="l d-flex mt-3">

                            <input type="number" className='w-75 ps-4' required placeholder='Enter Total Amount Received From Selling The Harvest' onChange={(e) => setSaleAmount(e.target.value)} />
                            <button type='submit' className=''>Calculate Profit <i class="fa-solid fa-arrow-right"></i></button>

                        </div>





                    </form>

                </div>

                <div className="three py-3  p-4 mb-4 profitrange" style={{ display: finalAmt.Isclosed ? "block" : "none", backgroundColor: finalAmt.amount >= 0 ? "rgb(215, 235, 215)" : "rgb(255, 211, 211)", border: finalAmt.amount >= 0 ? "1.7px solid rgb(0, 143, 17)" : "1.7px solid rgb(220, 0, 0)" }}>
                    <p className='con' style={{ color: finalAmt.amount >= 0 ? "green" : "red" }}>{finalAmt.amount >= 0 ? "🎉 Congratulations! You made a Profit" : "⚠️ You are at a Loss this Divestry"}</p>
                    <h1 style={finalAmt.amount >= 0 ? { color: 'green' } : { color: 'red' }}>+ ₹ {finalAmt.amount}</h1>
                    <div className="b d-flex gap-3">
                        <div className="t">
                            <p>TOTAL EXPENSE</p>
                            <h5 style={finalAmt.amount >= 0 ? { color: 'green' } : { color: 'red' }}>₹5200</h5>
                        </div>
                        <div className="t">
                            <p>SALE AMOUNT</p>
                            <h5>₹ {finalAmt.saleAmount}</h5>
                        </div>
                        <div className="t">
                            <p>RETURN</p>
                            <h5 style={finalAmt.amount >= 0 ? { color: 'green' } : { color: 'red' }}>{finalAmt.percentage}%</h5>
                        </div>
                    </div>

                    <div className="l mt-3" style={{ backgroundColor: finalAmt.amount >= 0 ? "rgba(0, 165, 11, 0.4)" : "rgba(255, 0, 0, 0.47)" }} >
                        <div className="level" style={{ width: finalAmt.amount < 0 ? (finalAmt.percentage.toString()).slice(1) + "%" : finalAmt.percentage + "%", backgroundColor: finalAmt.amount >= 0 ? "rgb(0, 165, 11)" : "red" }} ></div>
                    </div>

                    <p className='return' style={{ color: finalAmt.amount >= 0 ? "green" : "red" }}>{finalAmt.amount >= 0 ? finalAmt.percentage + "% return on investment" : "Expenses exceeded sale by ₹" + finalAmt.saleAmount}</p>


                </div>

                <div className="three py-3  p-4 mb-4 gap-3 align-items-center closed" style={finalAmt.Isclosed ? { display: 'flex' } : { display: "none" }}>
                    <h2>🔒</h2>
                    <div className="contents">
                        <h5 className='fs-6 fw-bold'>Divestry Closed — Read Only</h5>
                        <p className='fs-6 m-0'>This record is now locked. No further changes can be made.</p>
                    </div>
                </div>

                <div className="popup" style={labourtable ? { display: "flex" } : { display: "none" }}>
                    <div className="inner">
                        <div className="header d-flex align-items-center justify-content-between mb-3">
                            <h5>👷 Labour Details</h5>
                            <i class="fa-solid fa-xmark" onClick={() => setLabourtable(false)} style={{ cursor: "pointer" }}></i>
                        </div>
                        <div className="table  mb-4">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S. NO</th>
                                        <th>DATE</th>
                                        <th>NAME</th>
                                        <th>DAILY SALARY</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {labourHistory && labourHistory.length > 0 ? labourHistory.map((ele, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{ele.date}</td>
                                            <td>{ele.labourName}</td>
                                            <td>₹ {ele.salary}</td>

                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan='5'>No Expenses added</td>

                                        </tr>
                                    )}



                                </tbody>
                            </table>
                        </div>
                        <div className="paid d-flex align-items-center justify-content-between ">
                            <h5 className='m-0'>Total Salary Paid</h5>
                            <h4 className='m-0'>₹ {paid}</h4>
                        </div>
                        <div className="button  d-flex justify-content-end  mt-3 w-100">
                            <button onClick={() => setLabourtable(false)} className=''> close</button>
                        </div>


                    </div>


                </div>


            </section>


        </>
    )
}

export default Divestries