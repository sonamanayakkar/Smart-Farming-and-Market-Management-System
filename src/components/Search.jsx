import React from 'react'
import './styles/search.css'
import onion from './images/home/onion.jpg'

const Search = () => {
    return (
        <section className='searchsection container-fluid '>

            <div class=" container-fluid">
                <div class="row">
                    <div class="col col-lg-4 border p-4 searchcol">
                        <form action="" className='d-flex flex-column'>
                            <div className="up d-flex flex-column gap-4 my-4">
                                <h4><i class="fa-solid fa-magnifying-glass"></i> Search Crops</h4>
                                <div className="input">
                                    <input type="text" />
                                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                                </div>
                            </div>

                        </form>

                        <form action="">
                            <div className="bottom d-flex flex-column gap-4">
                                <div className="box2 d-flex justify-content-between">
                                    <h5 className='m-0'><i class="fa-solid fa-bars-staggered"></i> Filters</h5>
                                    <h5 className='m-0'>reset</h5>
                                </div>
                                <div className="box">
                                    <label htmlFor="">District</label>
                                    <select name="" id="">
                                        <option value="">All District</option>
                                        <option value="">Dindigul</option>
                                        <option value="">karur</option>
                                    </select>
                                </div>
                                <div className="bigbox d-flex gap-3 ">
                                    <div className="box w-50  ">
                                        <label htmlFor="">Min price</label>
                                        <select name="" id="">
                                            <option value="">All District</option>
                                            <option value="">Dindigul</option>
                                            <option value="">karur</option>
                                        </select>
                                    </div>
                                    <div className="box w-50">
                                        <label htmlFor="">max price</label>
                                        <select name="" id="">
                                            <option value="">All District</option>
                                            <option value="">Dindigul</option>
                                            <option value="">karur</option>
                                        </select>
                                    </div>
                                </div>
                                <button className='p-2 '>Find Markets</button>
                            </div>
                        </form>


                    </div>
                    <div class="col col-lg-8 p-4 ">
                        <div className="fixed d-flex justify-content-between">
                            <h4>Search Result for <span>"Onion"</span></h4>
                            <p>3 markets Found</p>
                        </div>
                        <div className="sliders d-flex flex-column gap-3">

                            <div className="scale border d-flex justify-content-between">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p>Varity</p>
                                                <h6>Onion</h6>
                                            </div>
                                            <div className="f">
                                                <p>Arrival</p>
                                                <h6>today</h6>
                                            </div>
                                            <div className="f">
                                                <p>Grade</p>
                                                <h6>Local</h6>
                                            </div>
                                            <div className="f">
                                                <p>Min Price</p>
                                                <h6>₹700</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                    </div>

                                    <button>view Details</button>
                                </div>
                            </div>

                          
                            <div className="scale border d-flex justify-content-between">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p>Varity</p>
                                                <h6>Onion</h6>
                                            </div>
                                            <div className="f">
                                                <p>Arrival</p>
                                                <h6>today</h6>
                                            </div>
                                            <div className="f">
                                                <p>Grade</p>
                                                <h6>Local</h6>
                                            </div>
                                            <div className="f">
                                                <p>Min Price</p>
                                                <h6>₹700</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                    </div>

                                    <button>view Details</button>
                                </div>
                            </div>

                          
                            <div className="scale border d-flex justify-content-between">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p>Varity</p>
                                                <h6>Onion</h6>
                                            </div>
                                            <div className="f">
                                                <p>Arrival</p>
                                                <h6>today</h6>
                                            </div>
                                            <div className="f">
                                                <p>Grade</p>
                                                <h6>Local</h6>
                                            </div>
                                            <div className="f">
                                                <p>Min Price</p>
                                                <h6>₹700</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                    </div>

                                    <button>view Details</button>
                                </div>
                            </div>

                          
                            <div className="scale border d-flex justify-content-between">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p>Varity</p>
                                                <h6>Onion</h6>
                                            </div>
                                            <div className="f">
                                                <p>Arrival</p>
                                                <h6>today</h6>
                                            </div>
                                            <div className="f">
                                                <p>Grade</p>
                                                <h6>Local</h6>
                                            </div>
                                            <div className="f">
                                                <p>Min Price</p>
                                                <h6>₹700</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                    </div>

                                    <button>view Details</button>
                                </div>
                            </div>

                          
                            <div className="scale border d-flex justify-content-between">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p>Varity</p>
                                                <h6>Onion</h6>
                                            </div>
                                            <div className="f">
                                                <p>Arrival</p>
                                                <h6>today</h6>
                                            </div>
                                            <div className="f">
                                                <p>Grade</p>
                                                <h6>Local</h6>
                                            </div>
                                            <div className="f">
                                                <p>Min Price</p>
                                                <h6>₹700</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                    </div>

                                    <button>view Details</button>
                                </div>
                            </div>

                          
                            <div className="scale border d-flex justify-content-between">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p>Varity</p>
                                                <h6>Onion</h6>
                                            </div>
                                            <div className="f">
                                                <p>Arrival</p>
                                                <h6>today</h6>
                                            </div>
                                            <div className="f">
                                                <p>Grade</p>
                                                <h6>Local</h6>
                                            </div>
                                            <div className="f">
                                                <p>Min Price</p>
                                                <h6>₹700</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                    </div>

                                    <button>view Details</button>
                                </div>
                            </div>

                          
                            <div className="scale border d-flex justify-content-between">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p>Varity</p>
                                                <h6>Onion</h6>
                                            </div>
                                            <div className="f">
                                                <p>Arrival</p>
                                                <h6>today</h6>
                                            </div>
                                            <div className="f">
                                                <p>Grade</p>
                                                <h6>Local</h6>
                                            </div>
                                            <div className="f">
                                                <p>Min Price</p>
                                                <h6>₹700</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                    </div>

                                    <button>view Details</button>
                                </div>
                            </div>

                          
                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Search