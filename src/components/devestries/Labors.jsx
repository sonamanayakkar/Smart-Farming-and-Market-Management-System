import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import {getkey} from '../localStorage/currentUser.js'

const Labors = () => {

    let [inputs, setInputs] = useState({ date: new Date().toISOString().split("T")[0], labourName: '', salary: '' })
    let [editid, setEditid] = useState(null)
    let [labourdata, setLabourdata] = useState([])
    let [labourcost, setLabourcost] = useState({ length: 0, total: 0 })
    let [isCompleted, setIscompleted] = useState(false)
    let [refresh, setRefresh] = useState(false)
    const { cropid } = useParams()

    const token = getkey()


    let submit = (e) => {
        e.preventDefault()

        if (!editid) {
            console.log('eleui');

            let addlabour = async () => {
                try {
                    const labour = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/labour/${cropid}`, {
                        method: "PUT",
                        headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify(inputs)
                    })
                }
                catch (error) {

                }
            }
            addlabour()
        } else {
            let updatelabour = async () => {
                try {
                    const labour = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/labour/update/${cropid}/${editid}`, {
                        method: "PUT",
                        headers: { "Content-type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify(inputs)
                    })
                }
                catch (error) {

                }
            }
            updatelabour()
            setEditid(null)
        }

        setRefresh(!refresh)
        setInputs({ date: new Date().toISOString().split("T")[0], labourName: '', salary: '' })
    }


    let remove = (id) => {
        let removedata = async () => {
            try {
                const expence = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/labour/delete/${cropid}`, {
                    method: 'DELETE',
                    headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` }

                })
                const response = await expence.json()



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
                setRefresh(!refresh)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Expense has been Deleted.",
                    icon: "success"
                });
            }
        });




        setRefresh(!refresh)


    }

    let update = (ele) => {
        setEditid(ele._id)
        setInputs({ date: ele.date, labourName: ele.labourName, salary: ele.salary })

    }

    let addtodivestry = () => {

        const labourIds = labourdata.map(ele => ele._id)
       

        let postdata = async () => {
            try {
                const expence = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/profit/${cropid}`, {
                    method: 'PUT',
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        date: new Date().toISOString().split("T")[0],
                        item: ` Labour Cost ${labourdata.length}`,
                        Amount: labourcost.total,
                        labourIds: labourIds

                    })
                })
                const response = await expence.json()
                const data = response.response.expences
                console.log(response);


                if (expence.ok) {
                    console.log("Calling second API...");
                    const makeempty = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/labour/empty/${cropid}`, {
                        method: 'DELETE',
                        headers: { "content-type": "application/json" }

                    })
                    const response2 = await makeempty.json()
                    console.log('hi');

                    console.log(response2);


                }




            } catch (error) {

            }
        }


        Swal.fire({
            title: "Are you sure?",
            text: "Dou You want add this Labour Cost In Your Expense!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add this!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await postdata()
                setRefresh(!refresh)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Expense has been Deleted.",
                    icon: "success"
                });
            }
        });

    }




    useEffect(() => {

        let getdata = async () => {
            try {
                const expence = await fetch(`http://localhost:4500/api/v1/agreesmart/crops/labour/${cropid}`, {
                    method: 'GET',
                    headers: { "content-type": "application/json" }

                })
                const response = await expence.json()

               

                // setIscompleted(response.response[0].isCompleted)
                
                

                setLabourcost({ ...labourcost, length:  response.response[0].labours.length, total: response.response[0].totalsalary })

                setLabourdata(response.response[0].labours)



            } catch (error) {

            }
        }
        setTimeout(() => {
            getdata()
        }, 1000);


    }, [refresh])

    const navigate = useNavigate()
    let divestry = () => {
        navigate(`/divestry/${cropid}`)
    }


    return (
        <section className='container-fluid divestrysection '>

            <div className="l">
                <div className="up mb-5 bg-white text-dark" style={{ cursor: 'pointer' }}>
                    <p className='m-0' onClick={divestry}>🌳 My Divestries</p>
                </div>
                <div className="up mb-5  " style={{ cursor: 'pointer' }}>
                    <p className='m-0'>👷 Labour Attendance</p>
                </div>
            </div>


            <div className="three2 py-3  mb-4">
                <div className="u">
                    <h3 className='fw-bold'>👷 Labour Attendance</h3>
                    <p>Mark daily attendance and calculate salary</p>
                </div>
            </div>


            <div className="three py-3  p-4 mb-4">
                <h5 className='mb-3'>➕ Mark Attendance</h5>
                <form class="row g-3 " onSubmit={submit}>
                    <div class="col-md-3">

                        <label htmlFor="inputEmail4" class="form-label">DATE</label>
                        <input type="date" class="form-control" id="inputEmail4" required value={inputs.date} onChange={(e) => setInputs({ ...inputs, date: e.target.value })} style={isCompleted ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }} />
                    </div>
                    <div class="col-md-6">
                        <label htmlFor="inputPassword4" class="form-label">LABOUR NAME</label>
                        <input type="text" class="form-control" required id="inputPassword4" placeholder='e.g.Ravi kumar' value={inputs.labourName} onChange={(e) => setInputs({ ...inputs, labourName: e.target.value })} style={isCompleted ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }} />
                    </div>
                    <div class="col-md-3  d-flex gap-3 align-items-center">
                        <div className="box">
                            <label htmlFor="inputPassword4" class="form-label">DAILY SALARY (₹)</label>
                            <input type="number" class="form-control" required id="inputPassword4" placeholder='e.g.350' value={inputs.salary} onChange={(e) => setInputs({ ...inputs, salary: e.target.value })} style={isCompleted ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }} />
                        </div>

                        <button type="submit" class=" mt-4" style={isCompleted ? { pointerEvents: "none", opacity: 0.5 } : { pointerEvents: "auto", opacity: 1 }}>+ Add</button>

                    </div>





                </form>

            </div>



            <div className="table  mb-4">
                <table>
                    <thead>


                        <tr>
                            <th>S. NO</th>
                            <th>DATE</th>
                            <th>NAME</th>
                            <th>DAILY SALARY</th>
                            <th >ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labourdata && labourdata.length > 0 ? labourdata.map((ele, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{ele.date}</td>
                                <td>{ele.labourName}</td>
                                <td>{ele.salary}</td>
                                <td ><i class="fa-solid fa-pencil me-2" onClick={() => update(ele)}></i> <i class="fa-solid fa-xmark" onClick={() => remove(ele._id)}></i> </td>
                            </tr>
                        )) : (
                            <tr >
                                <td colSpan='5'>no data found</td>

                            </tr>
                        )}





                    </tbody>
                </table>
            </div>



            <div className="three py-3  p-4 mb-4 labourtotalsalary" style={labourdata.length > 0 ? { display: "block" } : { display: "none" }}>
                <div className="u d-flex justify-content-between align-items-center">
                    <div className="l_side">
                        <h5>💰 TOTAL LABOUR SALARY TO PAY</h5>
                        <h1>₹ {labourcost.total}</h1>
                        <p>Present workers only · {labourcost.length} workers</p>
                    </div>
                    <div className="l_side d-flex flex-column justify-content-center align-items-end">
                        <p>Add this as Labour Cost
                            to your Divestry expense</p>

                        <button onClick={addtodivestry}><i class="fa-solid fa-arrow-right-long" ></i> Add to Divestry Expense</button>
                    </div>
                </div>
            </div>





        </section>
    )
}

export default Labors