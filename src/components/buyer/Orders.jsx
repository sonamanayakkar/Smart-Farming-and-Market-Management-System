import React, { useEffect, useRef, useState } from 'react'
import './styles/order.css'
import { apicall } from '../../../handler/api'
import { getkey } from '../localStorage/currentUser'
import { icon } from '../PlantIcons/icon'
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";
import { topview } from '../topView/topview'
import { autologout } from '../autologout/autoLogout.js'

const Orders = () => {
  let [refresh, setRefresh] = useState(false)
  let [orders, setOrders] = useState([])

  useEffect(() => {
    autologout()
    let getdata = async () => {
      try {
        const crop = await fetch(`${apicall()}orders`, {
          method: 'GET',
          headers: { "Content-type": "application/json", "Authorization": `Bearer ${getkey()}` },
        })

        const response = await crop.json()

        setOrders(response.response)


      }

      catch (error) {

      }
    }
    getdata()
  }, [refresh])

  let cancelorder = (ele) => {

    let remove = async () => {
      try {

        const canceledorder = await fetch(`${apicall()}cancelOrder`, {
          method: "DELETE",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(ele)
        })

        const response = await canceledorder.json()
        console.log(response.message);

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

        customToast(response.message)

        setRefresh(ele => !ele)
      } catch (error) {

      }
    }


    Swal.fire({
      title: "Are you sure?",
      text: "Do You want to cancel order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        remove()
      }
    });



  }
  const homeref = useRef()

  return (
    <section ref={homeref} className='plannersection ordersection'>
      <div className="header">
        <h4>🛍️ My Orders</h4>
        <p>Review and confirm your purchases</p>
      </div>
      <div className="orders">
        <div className="box">

          {orders && orders.length > 0 ? orders.map((ele, idx) => (
            <div className="list d-flex flex-lg-row flex-md-row gap-3 flex-column align-items-lg-start align-items-lg-center justify-content-between mb-3" key={idx}>
              <div className="l d-flex align-items-center gap-3">
                <div className="image">
                  <h1>{icon(ele.cropName)}</h1>
                </div>
                <div className="content">
                  <h4>{ele.cropName}</h4>
                  {/* <p>Farm from fresh tomato</p> */}
                  <h5>{ele.quantity} kg</h5>
                </div>
              </div>
              <div className="c d-flex  justify-content-center gap-3 flex-column">

                <div className="l d-flex align-items-center gap-2">
                  <div className="two"><h4>🪪</h4></div>
                  <div className="two">
                    <p className='mb-1'>Order ID</p>
                    <h6 className='m-0'>#{ele._id.slice(0, 8)}</h6>
                  </div>
                </div>

                <div className="l d-flex align-items-center gap-2">
                  <div className="two"><h4>👤</h4></div>
                  <div className="two">
                    <p className='mb-1'>Farmer</p>
                    <h6 className='m-0'>{ele.u[0].firstName} {ele.u[0].lastName}</h6>
                  </div>
                </div>
                <div className="l d-flex align-items-center gap-2">
                  <div className="two"><h4>📆</h4></div>
                  <div className="two">
                    <p className='mb-1'>Order Date</p>
                    <h6 className='m-0'>{ele.updatedAt.split("T")[0]}</h6>
                  </div>
                </div>

              </div>
              <div className="prices">
                <div className="u mb-3">
                  <p className='m-0'>Total Amount</p>
                  <h5>₹ {ele.price}</h5>
                </div>
                <div className="u">
                  <p className='m-0'>Payment Method</p>
                  <h6>{ele.paymentMethod}</h6>
                </div>
              </div>
              <div className="status d-flex align-items-center  justify-content-center gap-2 flex-column">
                <span style={ele.status == 'PENDING' ? { backgroundColor: 'rgba(0, 98, 255, 0.46)', color: 'rgb(13, 0, 255)' } : { backgroundColor: 'rgb(255, 231, 187)', color: ' rgb(255, 98, 0)' }}>{ele.status}</span>
                <button onClick={() => cancelorder(ele)} style={ele.status != 'PENDING' ? { display: 'none' } : null}>Cancel order</button>
              </div>
            </div>
          )) : (
            <div className="list d-flex align-items-center justify-content-center mb-3">
              order section empty
            </div>
          )}




        </div>
      </div>

      <div className="topview" onClick={() => topview(homeref)}><i className="fa-solid fa-arrow-up"></i></div>

    </section>
  )
}

export default Orders