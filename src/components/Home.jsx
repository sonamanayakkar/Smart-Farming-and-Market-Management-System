import React from 'react'
import './styles/home.css'
import Header from './Header'
import onion from './images/home/onion.jpg'

const Home = () => {
    return (
        
          
            <section className='container-fluid homesection'>


                <div className="weather my-3">

                    <div className="startside1 d-flex gap-2">
                        <span> ⛅ </span><h4>32 <sup>0</sup>C</h4>
                    </div>
                    <div className="endside">
                        <div className="startside d-flex gap-2">
                            <span> ⛅ </span><h4>32 <sup>0</sup>C</h4>
                        </div>
                        <div className="startside d-flex gap-2">
                            <h4>Tommorow Rain 🌧️</h4>
                        </div>
                        <div className="startside3 d-flex justify-content-between align-item-center gap-2 ">

                            <h4 className='m-0'><i class="fa-solid fa-location-dot"></i> Chennai </h4>
                            <h4><i class="fa-solid fa-angle-right fs-4"></i></h4>
                        </div>

                    </div>
                </div>

                <div className="border container-fluid summary">
                    <div className="top d-flex justify-content-between align-item-center">
                        <div className="two d-flex  align-item-center gap-2" ><i class="fa-solid fa-chart-simple"></i><h4>Summary</h4></div>
                        <div className="two">View All <i class="fa-solid fa-arrow-right"></i></div>
                    </div>
                    <div className="bottom">

                        <div className="three ">
                            <div className="inner">


                                <div className="e d-flex gap-2 align-item-center mb-2">
                                    <i className="fa-solid fa-wallet m-0"></i>
                                    <h5 className='m-0'>Expense</h5>
                                </div>
                                <div className="p">
                                    <h5>₹5,200</h5>
                                </div>
                            </div>
                        </div>

                        <div className="three ">
                            <div className="inner">


                                <div className="e d-flex gap-2 align-item-center mb-2">
                                    <i className="fa-solid fa-wallet m-0"></i>
                                    <h5 className='m-0'>Profit</h5>
                                </div>
                                <div className="p">
                                    <h5 className='pfit'>+ ₹5,200</h5>
                                </div>
                            </div>
                        </div>

                        <div className="three ">
                            <div className="inner">


                                <div className="e d-flex gap-2 align-item-center mb-2">
                                    <i className="fa-solid fa-wallet m-0"></i>
                                    <h5 className='m-0'>Sales</h5>
                                </div>
                                <div className="p">
                                    <h5>120 kg</h5>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="demand my-5">
                    <div className="header mb-4">
                        <h3 className='text-center'>🔥 High Demand Crops</h3>
                    </div>
                    <div className="slide d-flex gap-5 py-3">

                        <div className="lists">
                            <div className="image">
                                <img src={onion} alt="" />
                            </div>
                            <div className="details px-3 py-2 d-flex justify-content-between align-item-center">
                                <h4>Onion</h4>
                                <h4 className='m-0'>₹3200</h4>

                            </div>
                            <div className="rate px-3 py-2 d-flex justify-content-between align-item-center">
                                <div className="district"><p className='m-0'>Madurai</p></div>

                                <p className='m-0'>🔥 High demand</p>
                            </div>
                        </div>


                        <div className="lists">
                            <div className="image">
                                <img src={onion} alt="" />
                            </div>
                            <div className="details px-3 py-2 d-flex justify-content-between align-item-center">
                                <h4>Onion</h4>
                                <h4 className='m-0'>₹3200</h4>

                            </div>
                            <div className="rate px-3 py-2 d-flex justify-content-between align-item-center">
                                <div className="district"><p className='m-0'>Madurai</p></div>

                                <p className='m-0'>🔥 High demand</p>
                            </div>
                        </div>


                        <div className="lists">
                            <div className="image">
                                <img src={onion} alt="" />
                            </div>
                            <div className="details px-3 py-2 d-flex justify-content-between align-item-center">
                                <h4>Onion</h4>
                                <h4 className='m-0'>₹3200</h4>

                            </div>
                            <div className="rate px-3 py-2 d-flex justify-content-between align-item-center">
                                <div className="district"><p className='m-0'>Madurai</p></div>

                                <p className='m-0'>🔥 High demand</p>
                            </div>
                        </div>


                        <div className="lists">
                            <div className="image">
                                <img src={onion} alt="" />
                            </div>
                            <div className="details px-3 py-2 d-flex justify-content-between align-item-center">
                                <h4>Onion</h4>
                                <h4 className='m-0'>₹3200</h4>

                            </div>
                            <div className="rate px-3 py-2 d-flex justify-content-between align-item-center">
                                <div className="district"><p className='m-0'>Madurai</p></div>

                                <p className='m-0'>🔥 High demand</p>
                            </div>
                        </div>


                        <div className="lists">
                            <div className="image">
                                <img src={onion} alt="" />
                            </div>
                            <div className="details px-3 py-2 d-flex justify-content-between align-item-center">
                                <h4>Onion</h4>
                                <h4 className='m-0'>₹3200</h4>

                            </div>
                            <div className="rate px-3 py-2 d-flex justify-content-between align-item-center">
                                <div className="district"><p className='m-0'>Madurai</p></div>

                                <p className='m-0'>🔥 High demand</p>
                            </div>
                        </div>


                        <div className="lists">
                            <div className="image">
                                <img src={onion} alt="" />
                            </div>
                            <div className="details px-3 py-2 d-flex justify-content-between align-item-center">
                                <h4>Onion</h4>
                                <h4 className='m-0'>₹3200</h4>

                            </div>
                            <div className="rate px-3 py-2 d-flex justify-content-between align-item-center">
                                <div className="district"><p className='m-0'>Madurai</p></div>

                                <p className='m-0'>🔥 High demand</p>
                            </div>
                        </div>




                    </div>
                </div>

                {/* <div className="field ">

                    <div clclassNameass="container">

                        <div className=" d-flex gap-3" >

                            <div className="overview  overview1 ">
                                <div className="head d-flex gap-3" >
                                    <h4>Field Overview</h4>
                                    <hr />
                                </div>
                                <div className="image">
                                    <div className="crop">
                                        <h5 className='m-0'>Crop: <span>Wheat</span></h5>
                                    </div>
                                </div>
                            </div>


                            <div className="weather overview">
                                <div className=" overview2 ">
                                    <div className="head d-flex gap-3" >
                                        <h4>Weather Forecast</h4>
                                        <hr />
                                    </div>
                                    <div className="today py-3 d-flex">
                                        <div className="img">
                                            <img src="" alt="" />
                                        </div>
                                        <h5>Today: Sunny, <span>27<sup>0</sup>C</span></h5>
                                    </div>
                                    <div className="wea-ther">
                                        <div class="container">
                                            <div class="row row-cols-5 gap-2  justify-content-center">
                                                <div class="col p-0">
                                                    <div className="up">
                                                        <h5>WED 29<sup>0</sup>C</h5>
                                                        <div className="icon">
                                                            <img src="" alt="" />
                                                        </div>
                                                    </div>
                                                    <div className="down d-flex gap-3" >
                                                        <div className="icon">
                                                            <img src="" alt="" />
                                                        </div>
                                                        <p className='m-0'> Clear</p>
                                                    </div>
                                                </div>
                                                <div class="col">Column</div>
                                                <div class="col">Column</div>
                                                <div class="col">Column</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='w-100' />
                            </div>


                        </div>

                    </div>
                </div> */}

            </section>
      

    )
}

export default Home