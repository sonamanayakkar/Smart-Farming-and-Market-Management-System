import React, { useEffect, useState } from 'react'
import './styles/search.css'
import onion from './images/home/onion.jpg'
import { data } from 'react-router-dom'
import districts from '../../public/district.json'

const Search = () => {
    let [datas, setDatas] = useState([])  // all data
    let [finaldata, setFinaldata] = useState([])
    let [filtered, setFiltered] = useState([])
    let [selectopt, setSelectopt] = useState('')
    let [fill, setFill] = useState({ search: '', filter: '' })

    let [loadercheck, setLoadercheck] = useState(false)

    useEffect(() => {


        let fetchdata = async () => {
            try {
                let prices = await fetch('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001367747db4b0c4802691ea07f75878c91&offset=0&limit=1000&&filters[state]=kerala&format=csv&format=json')


                let formated = await prices.json()

                let infos = formated.records
                setLoadercheck(true)
                setDatas(infos)
                setFiltered(infos)

            }
            catch (error) {

            }
        }

        setTimeout(() => {
            fetchdata()
        }, 2000);
    }, [])



    let filtering = (e) => {
        e.preventDefault()
        setFill({ ...fill, filter: selectopt })


    }
    useEffect(() => {


        let filtered;
        if (fill.search == '' && fill.filter == '') {

            filtered = datas.filter((ele) => {
                return ele
            })
        }
        else if (fill.search !== '' || fill.filter != '') {
            filtered = datas.filter((ele) => {
                return ((ele.commodity.toLowerCase().includes(fill.search.toLowerCase())) && (ele.district.toLowerCase().includes(fill.filter.toLowerCase())))
            })
        }
        else {
            filtered = datas.filter((ele) => {
                return (ele.commodity.toLowerCase().includes(fill.search.toLowerCase()))
            })


        }

        setFiltered(filtered)
    }, [fill])


    return (
        <section className='searchsection container-fluid '>

            <div class=" container-fluid">
                <div class="row">
                    <div class="col col-lg-4 border p-4 searchcol">
                        <form action="" className='d-flex flex-column'>
                            <div className="up d-flex flex-column gap-4 my-4">
                                <h4><i class="fa-solid fa-magnifying-glass"></i> Search Crops</h4>
                                <div className="input">
                                    <input type="text" placeholder='e.g. Onion,Tomato...' onChange={(e) => setFill({ ...fill, search: e.target.value })} />
                                    {/* <button type='submit'><i class="fa-solid fa-magnifying-glass"></i></button> */}
                                </div>
                            </div>

                        </form>

                        <form action="" onSubmit={filtering}>
                            <div className="bottom d-flex flex-column gap-4">
                                <div className="box2 d-flex justify-content-between">
                                    <h5 className='m-0'><i class="fa-solid fa-bars-staggered"></i> Filters</h5>
                                   
                                </div>
                                <div className="box">
                                    <label htmlFor="">District</label>
                                    <select name="" id="" onChange={(e) => setSelectopt(e.target.value)}>
                                        <option value="">All District</option>
                                        {districts ? (districts.districts.map((ele, idx) =>
                                        (
                                            <option value={ele.name} key={idx}>{ele.name}</option>
                                        )
                                        )) : (<option value="">Select your district</option>)}

                                    </select>
                                </div>

                                <button className='p-2 '>Find Markets</button>
                            </div>
                        </form>


                    </div>
                    <div class="col col-lg-8 p-4 ">
                        <div className="fixed d-flex justify-content-between">
                            <h4>{filtered.length} markets Found </h4>
                        </div>
                        <div className="sliders d-flex flex-column align-items-center  gap-3">

                            {filtered && filtered.length > 0 ? filtered.map((ele, idx) => (
                                <div key={idx} className="scale border d-lg-flex justify-content-between align-items-center">
                                    <div className="u d-flex gap-3">
                                        {/* <div className="image">
                                            <img src={ele.image} alt="" />
                                        </div> */}
                                        <div className="infos">
                                            <div className="two">
                                                <h5 className='fw-bold'>{ele.district}</h5>
                                                <p>{ele.market}</p>
                                            </div>
                                            <div className="two d-flex flex-lg-row flex-column gap-3">
                                                <div className="f">
                                                    <p className='m-0'>Varity : <span>{ele.commodity}</span></p>

                                                </div>
                                                <div className="f">
                                                    <p className='m-0'>Arrival : <span>today</span></p>

                                                </div>
                                                <div className="f">
                                                    <p className='m-0'>Grade : <span>{ele.grade}</span></p>

                                                </div>
                                                <div className="f">
                                                    <p className='m-0'>Min Price : <span>₹ {ele.min_price}</span></p>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="u u2 d-flex flex-column justify-content-between">
                                        <div className="p m-lg-0 mt-3" >
                                            <h4>₹ {ele.modal_price} <span >/Quantal</span></h4>

                                            {/* <h5 className='demandn'>🔥 High Demand</h5> */}
                                            {/* <button >view Details</button> */}
                                        </div>


                                    </div>
                                </div>
                            )) : (<h5>No Markets Found. Adjust your filters. </h5>)}

                           
                            <div class="dot-spinner " style={loadercheck?{display:"none"}:{display:'flex'}}>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                            </div>
                            {/* <div className="scale border d-flex justify-content-between align-items-center">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5 className='fw-bold'>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p className='m-0'>Varity : <span>Onion</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Arrival : <span>today</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Grade : <span>Local</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Min Price : <span>₹700</span></p>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u u2 d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                        <button >view Details</button>
                                    </div>


                                </div>
                            </div> */}



                            {/* <div className="scale border d-flex justify-content-between align-items-center">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5 className='fw-bold'>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p className='m-0'>Varity : <span>Onion</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Arrival : <span>today</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Grade : <span>Local</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Min Price : <span>₹700</span></p>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u u2 d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                        <button >view Details</button>
                                    </div>


                                </div>
                            </div>



                            <div className="scale border d-flex justify-content-between align-items-center">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5 className='fw-bold'>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p className='m-0'>Varity : <span>Onion</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Arrival : <span>today</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Grade : <span>Local</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Min Price : <span>₹700</span></p>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u u2 d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                        <button >view Details</button>
                                    </div>


                                </div>
                            </div>



                            <div className="scale border d-flex justify-content-between align-items-center">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5 className='fw-bold'>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p className='m-0'>Varity : <span>Onion</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Arrival : <span>today</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Grade : <span>Local</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Min Price : <span>₹700</span></p>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u u2 d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                        <button >view Details</button>
                                    </div>


                                </div>
                            </div>



                            <div className="scale border d-flex justify-content-between align-items-center">
                                <div className="u d-flex gap-3">
                                    <div className="image">
                                        <img src={onion} alt="" />
                                    </div>
                                    <div className="infos">
                                        <div className="two">
                                            <h5 className='fw-bold'>Trichy</h5>
                                            <p>Gandhi Market</p>
                                        </div>
                                        <div className="two d-flex gap-3">
                                            <div className="f">
                                                <p className='m-0'>Varity : <span>Onion</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Arrival : <span>today</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Grade : <span>Local</span></p>

                                            </div>
                                            <div className="f">
                                                <p className='m-0'>Min Price : <span>₹700</span></p>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="u u2 d-flex flex-column justify-content-between">
                                    <div className="p" >
                                        <h4>₹3200 <span >/Quantal</span></h4>

                                        <h5 className='demandn'>🔥 High Demand</h5>
                                        <button >view Details</button>
                                    </div>


                                </div>
                            </div> */}





                        </div>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default Search