import React from 'react'
import './divestry.css'
import { Link } from 'react-router-dom'

const Divestries = () => {
    return (
        <section className='container-fluid divestrysection '>

            <div className="l">
                <div className="up mb-5">
                    <p className='m-0'>🌳 My Divestries</p>
                </div>
                <div className="up mb-5 bg-white text-dark">
                    <p className='m-0'>👷 Labour Attendance</p>
                </div>
            </div>


            <div className="three py-3 px-5 mb-4">
                <div class=" d-flex align-items-center" >
                    <img src="..." class="card-img-top" alt="..." />
                    <div class="card-body ">
                        <h5 class="card-title fs-2 fw-bold">Peanut</h5>
                        <p class="card-text">4.5 Acres.started jun 2025</p>

                    </div>
                    <Link to='/back' class="btn "><i class="fa-solid fa-arrow-left-long " ></i>  Back to Divestries</Link>

                </div>
            </div>
            <div className="three2 py-3  mb-4">
                <div className="container">
                    <div className="row row-cols-lg-3">

                        <div className="col">
                            <div class="card" >

                                <div class="card-body">
                                    <h6 class="card-title">TOTAL EXPENSE</h6>
                                    <h3>₹7150</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div class="card" >

                                <div class="card-body">
                                    <h6 class="card-title">SALE AMOUNT</h6>
                                    <h3>₹0</h3>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div class="card" >

                                <div class="card-body">
                                    <h6 class="card-title">NET PROFIT / LOSS</h6>
                                    <h3>-----</h3>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="three py-3  p-4 mb-4">
                <form class="row g-3 ">
                    <div class="col-md-3">
                        <label for="inputEmail4" class="form-label">DATE</label>
                        <input type="date" class="form-control" id="inputEmail4" />
                    </div>
                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">EXPENSE ITEM</label>
                        <input type="text" class="form-control" id="inputPassword4" placeholder='e.g.Fertilizer,seeds,Labour' />
                    </div>
                    <div class="col-md-3  d-flex gap-3 align-items-center">
                        <div className="box">
                            <label for="inputPassword4" class="form-label">Amount</label>
                            <input type="text" class="form-control" id="inputPassword4" placeholder='e.g.Amount' />
                        </div>

                        <button type="submit" class="btn btn-primary mt-4">+ Add</button>

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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>1</td>
                            <td>28/3/2004</td>
                            <td>fertilizer</td>
                            <td>2000</td>
                            <td><i class="fa-solid fa-xmark"></i></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>28/3/2004</td>
                            <td>fertilizer</td>
                            <td>2000</td>
                            <td><i class="fa-solid fa-xmark"></i></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>28/3/2004</td>
                            <td>fertilizer</td>
                            <td>2000</td>
                            <td><i class="fa-solid fa-xmark"></i></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>28/3/2004</td>
                            <td>fertilizer</td>
                            <td>2000</td>
                            <td><i class="fa-solid fa-xmark"></i></td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div className="three py-3  p-4 mb-4 ">
                <form class=" d-flex  flex-column ">
                    <label htmlFor="">FINAL HARVEST SALE AMOUNT (₹)</label>
                    <div className="l d-flex mt-3">

                        <input type="text" className='w-75' placeholder='Enter Total Amount Received From Selling The Harvest'/>
                        <button>Calculate Profit <i class="fa-solid fa-arrow-right"></i></button>

                    </div>





                </form>

            </div>


        </section>
    )
}

export default Divestries