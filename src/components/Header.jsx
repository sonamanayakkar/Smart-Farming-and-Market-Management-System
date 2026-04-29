import React, { useEffect, useState } from 'react'
import './styles/header.css'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { weather } from './localStorage/currentUser'
import { getWeather } from './localStorage/currentUser'
import { style } from 'framer-motion/client'
import Swal from 'sweetalert2'
import sun from '../components/images/home/sun.png'

const Header = ({ set }) => {


    let [currentuser, setCurrentuser] = useState({})
    let [slide, setslide] = useState(false)

    let [weathers, setWeathers] = useState([])

    let [liveweather, setLiveweather] = useState(null)

    let [isclicked, setIsclicked] = useState(false)
    let [navBg, setNavBg] = useState('')

    const location = useLocation().pathname


    let navcolor = (url) => {
        if (url == location) {
            return { bg: "rgba(0, 134, 20, 0.23)", text: "rgb(0, 115, 31)" };
        }
        return { bg: "rgba(0, 134, 20, 0)", text: "rgb(36, 36, 36)" };
    }




    const navigate = useNavigate()
    let logout = () => {
        Swal.fire({
            title: "Dou want to Logout?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    title: "Logging Out!",
                    // html: "I will close in <b></b> milliseconds.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        // timerInterval = setInterval(() => {
                        //     timer.textContent = `${Swal.getTimerLeft()}`;
                        // }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) navigate('/');
                });
            }
        });

    }

    useEffect(() => {
        let getdatafromlocal = JSON.parse(localStorage.getItem("User"))

        setCurrentuser(getdatafromlocal)

        const DEFAULT_LOCATION = {
            latitude: 11.6643,
            longitude: 78.1460,
        };


        let getliveweather = async () => {
            const weather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${DEFAULT_LOCATION.latitude}&lon=${DEFAULT_LOCATION.longitude}&appid=6d5537c504000fa78943d8d8ca819aa1&units=metric`)

            const liveweather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${DEFAULT_LOCATION.latitude}&lon=${DEFAULT_LOCATION.longitude}&appid=6d5537c504000fa78943d8d8ca819aa1`)

            const response = await weather.json()
            const response2 = await liveweather.json()



            setLiveweather(response2)
            let date = new Date()
            const dateonly = date.toISOString().split("T")[0]


            let fil = response.list.filter((ele) => (
                new Date(ele.dt_txt).toISOString().split("T")[0] == dateonly
            ))


            setWeathers(fil)

        }

        if (navigator.geolocation) {
            getliveweather()
        }

    }, [])

    let currentLocation = () => {
        setIsclicked(true)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let lat = position.coords.latitude;
                    let lng = position.coords.longitude;
                    // store in state

                    weather('weather', { latitude: lat, longitude: lng, error: true })
                },
                (error) => {
                    console.error("Error getting location:", error);
                }, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }

            );
        } else {
            alert("Geolocation not supported");
        }


        const { latitude, longitude } = getWeather()


        let getliveweather = async () => {
            const weather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=6d5537c504000fa78943d8d8ca819aa1&units=metric`)

            const liveweather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6d5537c504000fa78943d8d8ca819aa1`)

            const response = await weather.json()
            const response2 = await liveweather.json()


            setLiveweather(response2)
            let date = new Date()
            const dateonly = date.toISOString().split("T")[0]


            let fil = response.list.filter((ele) => (
                new Date(ele.dt_txt).toISOString().split("T")[0] == dateonly
            ))


            setWeathers(fil)

        }

        if (navigator.geolocation) {
            getliveweather()
        }

    }



    return (
        <>
            <header>
                <div className="header2 ">

                    <div className="logo">
                        <div className="image">

                        </div>
                        <h1 className='m-0'>Agri<span>Smart</span></h1>
                    </div>
                    <nav className='m-0'>
                        <ul className='m-0 p-0'>
                            <li style={{ backgroundColor: navcolor('/Home').bg }}>
                                <Link to='/Home' style={{ color: navcolor('/Home').text }}>Home</Link>
                            </li>
                            <li style={{ backgroundColor: navcolor('/search').bg }}>
                                <Link to='/search' style={{ color: navcolor('/search').text }}>Search</Link>
                            </li>
                            <li style={{ backgroundColor: navcolor('/planner').bg }}>
                                <Link to='/planner' style={{ color: navcolor('/planner').text }}>Planner</Link>
                            </li>
                            <li style={{ backgroundColor: navcolor('/profit').bg }}>
                                <Link to='/profit' style={{ color: navcolor('/profit').text }}>Profit</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="profile">

                        <div className="bell">
                            <i className="fa-solid fa-bell"></i>
                        </div>
                        <div className="me d-flex gap-2">
                            <div className="four">
                                <div className="image">
                                    <img src={currentuser.profileImage} alt="" />
                                </div>
                            </div>
                            <div className="name">
                                <h5 className='m-0'>{currentuser.firstName} {currentuser.lastName} <span>{currentuser.role}</span></h5>
                                <p className='m-0'>{currentuser.district} district</p>
                            </div>
                            <div className="four">
                                <div className="edit" onClick={() => set(true)}>
                                    <i className="fa-solid fa-pencil"></i>
                                </div>
                            </div>

                        </div>

                        <div className="four">
                            <button onClick={logout}><i className="fa-solid fa-right-from-bracket"></i></button>
                        </div>

                    </div>
                </div>

            </header>

            <div className="weather">



                <div className="inside d-flex flex-column flex-lg-row  align-items-center justify-content-between">
                    <div className="two d-flex flex-column flex-lg-row align-items-center gap-3">
                        <h5>{liveweather ? liveweather.name : ''}</h5>
                        <div className="image">
                            <img src={liveweather ? (`https://openweathermap.org/img/wn/${liveweather.weather[0].icon}@2x.png`) : sun} alt="" />
                        </div>
                        <div className="content">
                            <h1 className='fw-bold'>{liveweather ? (Math.round((liveweather.main.temp) - 273.15)) : null}<sup>0</sup>C</h1>
                            <p className='m-0 p'>{liveweather ? (liveweather.weather[0].description) : null}· Feels like {liveweather ? (Math.round((liveweather.main.temp) - 273.15 + 1)) : null}°C</p>
                        </div>


                    </div>
                    <div className="two d-flex gap-4">
                        <div className="three">
                            <h5 className='text-center'>💧</h5>
                            <h5 className='text-center'>{liveweather ? (liveweather.main.humidity) : null}%</h5>
                            <p className='text-center m-0'>Humidity</p>
                        </div>
                        <div className="three">
                            <h5 className='text-center'>💨</h5>
                            <h5 className='text-center'>{liveweather ? (Math.round((liveweather.wind.speed) * 3.6)) : null}km/h</h5>
                            <p className='text-center m-0'>Wind</p>
                        </div>
                        <div className="three">
                            <h5 className='text-center'>☀️</h5>
                            <h5 className='text-center'>{liveweather ? ((new Date(liveweather.sys.sunrise).toLocaleTimeString()).split(" ")[0]) : null} AM</h5>
                            <p className='text-center m-0'>Sunrise</p>
                        </div>
                        <div className="three">
                            <h5 className='text-center'>🌇</h5>
                            <h5 className='text-center'>{liveweather ? ((new Date(liveweather.sys.sunset).toLocaleTimeString()).split(" ")[0]) : null} PM</h5>
                            <p className='text-center m-0'>Sunset</p>
                        </div>


                    </div>
                </div>

                <div className="four d-flex  mt-2 gap-3">

                    <div className="locatinholder">
                        <div className="location" style={isclicked ? { animation: "none" } : { animation: "blink 1s ease infinite alternate-reverse" }} onClick={currentLocation}>
                            <p className='m-0' ><i className="fa-solid fa-location-crosshairs"></i> </p>

                        </div>
                        <div className="we" style={isclicked ? {display:'none'}:{display:'block'}}>
                            <i className="fa-solid fa-hand-pointer"></i>  Get Live Weather
                        </div>
                    </div>
                    <div className="days " onClick={() => setslide(!slide)}>
                        <p className='m-0 text-white'>🗓️ Show More <i className="fa-solid fa-angle-down" style={slide ? { display: 'none' } : { display: 'inline-block' }}></i> <i className="fa-solid fa-angle-up" style={slide ? { display: 'inline-block' } : { display: 'none' }}></i></p>
                    </div>

                </div>

            </div>

            <div className="container-fluid  whetherforcast " style={slide ? { transform: 'translateY(0px)', opacity: 1, transition: '.2s ease' } : { transform: 'translateY(-2000px)', position: 'absolute', opacity: 0, transition: '.2s ease' }}>
                <div className="container py-4">
                    <div className="row g-2 row-cols-lg-6 row-cols-1 row-cols-md-2">


                        {weathers && weathers.length > 0 ? weathers.map((ele, idx) => {

                            const date = new Date(ele.dt_txt)
                            const time = date.toLocaleTimeString();


                            return (<div className="col" key={idx}>
                                <div className="insidecol d-flex flex-column align-items-center p-2">
                                    <p className='fw-bold '>{time}</p>
                                    <img src={`https://openweathermap.org/img/wn/${ele.weather[0].icon}@2x.png`} alt="" />
                                    <h3 className='fw-bold text-white'>{ele.main.temp} <sup>0</sup>C</h3>
                                    <p className=' '> {ele.weather[0].description}</p>
                                    <div className="two d-flex flex-column gap-3">
                                        <span>💧 Humidity:{ele.main.humidity}%</span>
                                        <span>💨 Wind: {Math.round((ele.wind.speed) * 3.6)}km/h</span>
                                    </div>
                                </div>

                            </div>)
                        }) : (
                            <p>no data found!</p>
                        )}




                    </div>
                    <div className="b d-lg-flex justify-content-between align-items-center mt-3">
                        <p> ⛅Today Forecasting</p>
                        <span onClick={() => setslide(false)}>Close <i className="fa-solid fa-xmark"></i></span>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Header