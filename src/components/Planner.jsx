import React, { useEffect, useRef, useState } from 'react'
import './styles/planner.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { object } from 'framer-motion/client';
import Swal from 'sweetalert2'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getkey } from './localStorage/currentUser.js'
import { icon } from './PlantIcons/icon.js';
import { topview } from './topView/topview.js';
import { apicall } from '../../handler/api.js';
import { autologout } from './autologout/autoLogout.js';

const Planner = () => {
    let [cross, setCross] = useState(true);
    let [refresh, setRefresh] = useState(false);
    let [editid, setEditid] = useState(null);

    let [inputs, setInputs] = useState({ cropName: '', area: '', startDate: new Date().toISOString().split("T")[0] })

    let [crops, setCrops] = useState([])

    const token = getkey()

    const plannerref = useRef()

    // CRUD operations

    let createdivestry = (e) => {
        e.preventDefault()


        if (!editid) {
            let apipost = async () => {
                const postingdata = await fetch(`${apicall()}crops`, {
                    method: "POST",
                    headers: { "content-type": "application/json", "Authorization": `Bearer ${token}` },
                    body: JSON.stringify({
                        cropName: inputs.cropName,
                        area: inputs.area,
                        startDate: inputs.startDate,
                        status: "active"

                    })
                })

                const response = await postingdata.json()



                const customToast = (msg) => {
                    toast(({ closeToast }) => (
                        <div className="flex justify-between items-center">
                            <span>{msg}</span>
                            {/* <button onClick={closeToast}>✖</button> */}
                        </div>
                    ), {
                        style: {
                            background: "linear-gradient(135deg, #028800, #cbf8c3)",
                            color: "#fff"
                        },
                        autoClose: true
                    });
                };
                if (response) {
                    customToast(response.message)
                }


            }
            apipost()


        }
        else {
            let apipost = async () => {
                const postingdata = await fetch(`${apicall()}crops/edit/${editid}`, {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({
                        cropName: inputs.cropName,
                        area: inputs.area,
                        startDate: inputs.startDate,

                    })
                })

                const response = await postingdata.json()
                Swal.fire({
                    title: response.message,
                    icon: "success",
                    draggable: true
                });


            }
            apipost()
        }


        setRefresh(!refresh)



        setInputs({ cropName: '', area: '', startDate: '' })
        setCross(true)
        setEditid(null)


    }

    let trash = (id) => {
        const cropid = id
        let apipost = async () => {
            try {
                const crop = await fetch(`${apicall()}crops/${cropid}`, {
                    method: "DELETE",
                    headers: { "content-type": "application/json" }
                })

                const response = await crop.json()




            } catch (error) {
                console.log(error);

            }
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await apipost()
                setRefresh(ele => !ele)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });




    }

    let edit = (ele) => {
        setCross(ele => !ele)
        setEditid(ele._id)
        setInputs({ cropName: ele.cropName, area: ele.area, startDate: ele.startDate })
    }

    let crossmark = () => {
        setInputs({ cropName: '', area: '', startDate: new Date().toISOString().split("T")[0] })
        setEditid(null)
        setCross(true)
    }
    let cancel = () => {
        setInputs({ cropName: '', area: '', startDate: new Date().toISOString().split("T")[0] })
        setEditid(null)
        setCross(true)
    }



    useEffect(() => {

        autologout()

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

            setCrops(cropsdata)

        }
        setTimeout(() => {
            apiget()
        }, 1000);


    }, [refresh])




    // CROP CLICK
    const navigate = useNavigate()
    let cropdiv = (id) => {
        navigate(`/divestry/${id}`)
    }

    const statusColors = {
        "In Progress": "rgb(255, 115, 0)",
        Completed: "gray",
        active: "green"
    };

    return (
        <>

            <section className='container-fluid plannersection ' ref={plannerref}>
                <div className="u">
                    <h3 className='fw-bold'>Planner</h3>
                    <p>Manage divestries, expenses & labour</p>
                </div>
                <div className="up mt-5 mb-3">
                    <p className='m-0 fw-bold'>🌳 My Divestries</p>
                </div>
                <div className="bottom ">
                    <div className="two  d-flex justify-content-between align-items-center">
                        <h4 className='fw-bold m-0'>🌾 ALL DIVESTRIES</h4>
                        <button onClick={() => setCross(ele => false)}>+ New Divestries</button>
                    </div>
                    <div className="two my-4">
                        <div className="container">
                            <div className="row row-cols-lg-4 row-cols-1">

                                  <div className="col cropbox mt-2" onClick={() => setCross(ele => false)}>
                                    <div className="card card2 p-4 d-flex align-items-center justify-content-center" style={{ cursor: "pointer" }}>
                                        <div className="new">
                                            +
                                        </div>
                                        <h6 className='mt-2'>New Divestry</h6>
                                    </div>
                                </div>

                                {crops && crops.length > 0 ? crops.map((ele, idx) =>

                                (

                                    <div className="col mt-2 cropbox " key={idx} >
                                        <div className="  card p-4" >
                                            {/* <img src="..." className="card-img-top" alt="..." /> */}
                                            <h1>{icon(ele.cropName)}</h1>
                                            <div className="card-body py-2 px-0">
                                                <h5 className="card-title">{ele.cropName}</h5>
                                                <p className="card-text">{ele.area} Acres.started {ele.startDate}</p>


                                                <div className="active" style={{ color: statusColors[ele.status] || "gray" }}>{ele.status}</div>

                                            </div>
                                            <div className="editupdate" >

                                                <i className="fa-solid fa-pencil me-2" onClick={() => edit(ele)} style={{ display: ele.status == 'Completed' ? "none" : "inline-block" }}></i>
                                                <i className="fa-regular fa-trash-can" onClick={() => trash(ele._id)}></i>
                                            </div>
                                            <i className="fa-solid fa-square-arrow-up-right" onClick={() => cropdiv(ele._id)}></i>
                                        </div>
                                    </div>

                                )) : (
                                    <div className="col cropbox  mt-2">
                                        <div className="card p-4 d-flex align-items-center justify-content-center" >
                                            <h4 className='text-center'>No crops have been created yet!</h4>
                                        </div>
                                    </div>
                                )}




                              


                            </div>
                        </div>
                    </div>
                </div>

                <div className="topview" onClick={() => topview(plannerref)}><i className="fa-solid fa-arrow-up"></i></div>

            </section>

            <div className="form" style={cross ? { display: 'none' } : { display: 'block' }}>
                <form action="" className='divestryform' onSubmit={createdivestry}>
                    <i className="fa-solid fa-xmark" onClick={crossmark} ></i>
                    <div className="box">
                        <h4>🌴 New Divestry</h4>
                    </div>
                    <div className="box">
                        <label htmlFor="">CROP NAME</label>
                        <input type="text" placeholder='e.g Peanut, Tomato...' value={inputs.cropName} required onChange={(e) => setInputs({ ...inputs, cropName: e.target.value })} />
                    </div>
                    <div className="box">
                        <label htmlFor="">AREA (Acres)</label>
                        <input type="number" placeholder='4.5' required value={inputs.area} onChange={(e) => setInputs({ ...inputs, area: e.target.value })} />
                    </div>
                    <div className="box">
                        <label htmlFor="">START DATE</label>
                        <input type="date" required value={inputs.startDate} onChange={(e) => setInputs({ ...inputs, startDate: e.target.value })} />
                    </div>
                    <div className=" boxb ">
                        <button className='button1' type='button' onClick={cancel}>Cancel</button>
                        <button className='button2' type='submit'>{editid ? "update" : "create"}</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Planner