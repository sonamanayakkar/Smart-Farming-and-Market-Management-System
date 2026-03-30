import React from 'react'
import './styles/planner.css'
import { Link } from 'react-router-dom'

const Planner = () => {
    return (
        <section className='container-fluid plannersection '>

            <div className="up mb-5">
                <p className='m-0'>🌳 My Divestries</p>
            </div>
            <div className="bottom ">
                <div className="two  d-flex justify-content-between align-item-center">
                    <h4>🌾 ALL DIVESTRIES</h4>
                    <button>+ New Divestries</button>
                </div>
                <div className="two my-4">
                    <div className="container">
                        <div className="row row-cols-lg-4">
                            <Link to='/divestry'>
                                <div className="col mt-2">
                                    <div className="card p-4" >
                                        <img src="..." class="card-img-top" alt="..." />
                                        <div className="card-body py-2 px-0">
                                            <h5 className="card-title">Peanut</h5>
                                            <p className="card-text">4.5 Acres.started jun 2025</p>
                                            <div className="active">Active</div>

                                        </div>
                                    </div>
                                </div>
                            </Link>


                            <div className="col mt-2">
                                <div className="card p-4" >
                                    <img src="..." class="card-img-top" alt="..." />
                                    <div className="card-body py-2 px-0">
                                        <h5 className="card-title">Peanut</h5>
                                        <p className="card-text">4.5 Acres.started jun 2025</p>
                                        <div className="active">Active</div>

                                    </div>
                                </div>
                            </div>
                            <div className="col mt-2">
                                <div className="card p-4" >
                                    <img src="..." class="card-img-top" alt="..." />
                                    <div className="card-body py-2 px-0">
                                        <h5 className="card-title">Peanut</h5>
                                        <p className="card-text">4.5 Acres.started jun 2025</p>
                                        <div className="active">Active</div>

                                    </div>
                                </div>
                            </div>
                            <div className="col mt-2">
                                <div className="card p-4" >
                                    <img src="..." class="card-img-top" alt="..." />
                                    <div className="card-body py-2 px-0">
                                        <h5 className="card-title">Peanut</h5>
                                        <p className="card-text">4.5 Acres.started jun 2025</p>
                                        <div className="active">Active</div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Planner