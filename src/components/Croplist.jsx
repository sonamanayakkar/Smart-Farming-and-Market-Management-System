import { section } from 'framer-motion/m'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import district from '../../public/district.json'
import Swal from 'sweetalert2'
import { apicall } from '../../handler/api'
import { getkey } from './localStorage/currentUser'

import { icon } from './PlantIcons/icon'


const Croplist = () => {
    let [isopen, setIsopen] = useState(false)
    let [refresh, setRefresh] = useState(false)
    let [inputs, setInputs] = useState({ cropName: '', totalKG: 0, priceperkg: '', district: '', description: '' })
    let [cropLists, setCroplists] = useState([])

    let [editid, setEditid] = useState(null)


    let submit = (e) => {
        e.preventDefault()

        let postdata = async () => {
            try {
                const crop = await fetch(`${apicall()}croplist`, {
                    method: 'POST',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                    body: JSON.stringify({ cropName: inputs.cropName, totalKG: inputs.totalKG, priceperkg: inputs.priceperkg, district: inputs.district, description: inputs.description, availableKG: inputs.totalKG })
                })
            }

            catch (error) {
                console.log(error);

            }
        }
        let updatedata = async () => {
            try {
                const crop = await fetch(`${apicall()}croplist/${editid}`, {
                    method: 'PUT',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                    body: JSON.stringify({ cropName: inputs.cropName, totalKG: inputs.totalKG, priceperkg: inputs.priceperkg, district: inputs.district, description: inputs.description, availableKG: inputs.totalKG })
                })
            }

            catch (error) {
                console.log(error);

            }
        }

        if (!editid) {
            postdata()
        }
        else {
            updatedata()
            setEditid(null)
            setInputs({ cropName: '', totalKG: 0, priceperkg: '', district: '', description: '' })
        }


        setRefresh(ele => !ele)
        setIsopen(false)

    }

    useEffect(() => {
        let getdata = async () => {
            try {
                const crop = await fetch(`${apicall()}croplist`, {
                    method: 'GET',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
                })

                const response = await crop.json()
                console.log(response);

                setCroplists(response.response)

            }

            catch (error) {
                console.log(error);

            }
        }
        getdata()
    }, [refresh])

    let update = (ele) => {
        setIsopen(true)
        setEditid(ele._id)
        setInputs({ cropName: ele.cropName, totalKG: ele.totalKG, priceperkg: ele.priceperkg, district: ele.district, description: ele.description })
    }

    let remove = (id) => {

        let removedata = async () => {
            try {
                const crop = await fetch(`${apicall()}croplist/${id}`, {
                    method: 'DELETE',
                    headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },

                })
            }

            catch (error) {
                console.log(error);

            }
        }



        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await removedata()
                setRefresh(ele => !ele)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <>
            <section className='plannersection croplistsection'>
                <div className="u">
                    <h3 className='fw-bold'>Planner</h3>
                    <p>Manage divestries, expenses & labour</p>
                </div>

                <div className="nav2 mt-5 mb-3 d-flex flex-wrap gap-3">
                    <div className="up " style={{backgroundColor:'rgb(255, 255, 255)'}}>
                        <Link to='/planner' style={{ textDecorationLine: 'none', color: 'rgb(0, 0, 0)' }}> <p className='m-0 fw-bold'>🌳 My Divestries</p></Link>
                    </div>
                    <div className="up " style={{backgroundColor:'rgb(12, 131, 32)'}}>
                        <Link to='/croplist' style={{ textDecorationLine: 'none', color: 'white' }}> <p className='m-0 fw-bold'>🏷️ List My Products</p></Link>

                    </div>
                    <div className="up " style={{backgroundColor:'rgb(255, 255, 255)'}}>
                        <Link to='/buyerOrders' style={{ textDecorationLine: 'none', color: 'rgb(0, 0, 0)' }}> <p className='m-0 fw-bold'>🗒️ Buyer Orders</p></Link>

                    </div>
                </div>

                <div className="header mt-4 d-flex flex-wrap align-items-center justify-content-between">
                    <div className="content">
                        <h5>🏷️ List My Products for Sale</h5>
                        <p>Upload your crop stock — buyers can see and order directly</p>
                    </div>
                    <button onClick={() => setIsopen(true)}>+ Add New Listing</button>
                </div>

                <div className="bottom ">
                   
                    <div className="two my-4">
                        <div className="container">
                            <div className="row row-cols-lg-3 row-cols-1">


                                {cropLists && cropLists.length > 0 ? cropLists.map((ele, idx) => (
                                    <div className="col mt-2 cropbox " key={idx}>
                                        <div className="card p-4" >
                                            <div className="one d-flex align-items-start  justify-content-between">
                                                <h1>{icon(ele.cropName.toLowerCase())}</h1>
                                                <div className="card-body py-2 ">
                                                    <h5 className="card-title">{ele.cropName}</h5>
                                                    <p className="card-text">₹{ele.priceperkg}/kg . Chennai</p>

                                                </div>
                                                <div className="active" >Active</div>
                                            </div>
                                            <div className="row row-cols-3 two my-3  ">
                                                <div className="col p-1  ">
                                                    <div className="three">
                                                        <h5>{ele.totalKG}Kg</h5>
                                                        <p className='m-0'>LISTED</p>
                                                    </div>

                                                </div>
                                                <div className="col p-1">
                                                    <div className="three">
                                                        <h5>{ele.soldKG}Kg</h5>
                                                        <p className='m-0'>SOLD</p>
                                                    </div>

                                                </div>
                                                <div className="col p-1">
                                                    <div className="three">
                                                        <h5>{ele.availableKG}Kg</h5>
                                                        <p className='m-0'>AVAILABLE</p>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="remains my-3">
                                                <div className="sold  d-flex align-items-center gap-2 justify-content-between">
                                                    <p>Sold progress</p>
                                                    <h6>{Math.round(((ele.soldKG) / (ele.totalKG)) * 100)}% sold</h6>
                                                </div>
                                                <div className="level">
                                                    <div className="inside" style={{ width: `${((ele.soldKG) / (ele.totalKG)) * 100}%` }}>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="revenue d-flex flex-wrap align-items-center  justify-content-center  justify-content-lg-between">
                                                <div className="l">
                                                    <p className='m-0'>SALES REVENUE</p>
                                                    <h3 className='m-0'>₹{ele.soldPrice}</h3>
                                                </div>
                                                <div className="buttons d-flex  gap-2">
                                                    <button className='py-1 ' style={{ backgroundColor: 'rgb(4, 78, 188)', color: 'rgb(255, 239, 239)' }} onClick={() => update(ele)}>Update</button>
                                                    <button className='py-1' style={{ backgroundColor: 'rgb(216, 24, 24)', color: 'rgb(255, 239, 239)' }} onClick={() => remove(ele._id)}>Remove</button>
                                                </div>
                                            </div>


                                        </div>
                                    </div>


                                )) : (
                                    <div className="col mt-2 cropbox "  >
                                        Crop not found
                                    </div>
                                )}
                                {/* <div className="col mt-2 cropbox "  >
                                    <div className="card p-4" >
                                        <div className="one d-flex align-items-start  justify-content-between">
                                            <h1>🍅</h1>
                                            <div className="card-body py-2 ">
                                                <h5 className="card-title">tomato</h5>
                                                <p className="card-text">₹32/kg . Chennai</p>

                                            </div>
                                            <div className="active" >Active</div>
                                        </div>
                                        <div className="row row-cols-3 two my-3  ">
                                            <div className="col p-1  ">
                                                <div className="three">
                                                    <h5>80Kg</h5>
                                                    <p className='m-0'>LISTED</p>
                                                </div>

                                            </div>
                                            <div className="col p-1">
                                                <div className="three">
                                                    <h5>20Kg</h5>
                                                    <p className='m-0'>SOLD</p>
                                                </div>

                                            </div>
                                            <div className="col p-1">
                                                <div className="three">
                                                    <h5>60Kg</h5>
                                                    <p className='m-0'>AVAILABLE</p>
                                                </div>

                                            </div>

                                        </div>

                                        <div className="remains my-3">
                                            <div className="sold  d-flex align-items-center gap-2 justify-content-between">
                                                <p>Sold progress</p>
                                                <h6>25% sold</h6>
                                            </div>
                                            <div className="level">
                                                <div className="inside">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="revenue d-flex align-items-center  justify-content-between">
                                            <div className="l">
                                                <p className='m-0'>SALES REVENUE</p>
                                                <h3 className='m-0'>₹640</h3>
                                            </div>
                                            <div className="buttons d-flex gap-2">
                                                <button className='py-1 ' style={{ backgroundColor: 'rgb(4, 78, 188)', color: 'rgb(255, 239, 239)' }}>Update</button>
                                                <button className='py-1' style={{ backgroundColor: 'rgb(216, 24, 24)', color: 'rgb(255, 239, 239)' }}>Remove</button>
                                            </div>
                                        </div>


                                    </div>
                                </div> */}



                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <div className="form" style={{ display: isopen ? 'flex' : 'none' }}>
                <form action="" className='divestryform' onSubmit={submit}>
                    <i className="fa-solid fa-xmark" onClick={() => { setIsopen(false); setEditid(null); setInputs({ cropName: '', totalKG: 0, priceperkg: '', district: '', description: '' }) }} ></i>
                    <div className="box">
                        <h4>🏷️ List Crop for Sale</h4>
                    </div>
                    <div className="box">
                        <label htmlFor="">CROP NAME</label>
                        <input type="text" value={inputs.cropName} required placeholder='e.g Peanut, Tomato...' onChange={(e) => setInputs({ ...inputs, cropName: e.target.value })} />
                    </div>
                    <div className="bigbox w-100 d-flex flex-lg-row flex-column  gap-3 align-items-center justify-content-center">
                        <div className="box w-100">
                            <label htmlFor="">AVAILABLE QUANTITY(KG)</label>
                            <input type="number" value={inputs.totalKG} required placeholder='e.g.100' onChange={(e) => setInputs({ ...inputs, totalKG: e.target.value })} />
                        </div>
                        <div className="box w-100">
                            <label htmlFor="">PRICE PER KG (₹)</label>
                            <input type="number" value={inputs.priceperkg} required placeholder='e.g.35' onChange={(e) => setInputs({ ...inputs, priceperkg: e.target.value })} />
                        </div>
                    </div>

                    <div className="box">
                        <label htmlFor="">District</label>
                        <select name="" id="" onChange={(e) => setInputs({ ...inputs, district: e.target.value })}>
                            <option value="">Select your District</option>
                            {district && district.districts.length > 0 ? district.districts.map((ele, idx) => (
                                <option value={ele.name} key={idx}>{ele.name}</option>
                            )) : null}

                        </select>
                    </div>
                    <div className="box">
                        <label htmlFor="">DESCRIPTION (Optional)</label>
                        <input type="text" value={inputs.description} required placeholder='e.g Fresh harvest, no pesticide used...' onChange={(e) => setInputs({ ...inputs, description: e.target.value })} />
                    </div>

                    <div className=" boxb ">
                        <button className='button1' type='button' onClick={() => { setIsopen(false); setEditid(null); setInputs({ cropName: '', totalKG: 0, priceperkg: '', district: '', description: '' }) }}>Cancel</button>
                        <button className='button2' type='submit'>✓ List for Sale</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default Croplist