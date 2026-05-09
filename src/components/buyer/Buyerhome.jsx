import React from 'react'
import Buyerheader from './Buyerheader'
import { Outlet } from 'react-router-dom'

const Buyerhome = () => {
  return (
   <section className='Buyersection p-0'>
        <Buyerheader/>

        <Outlet/>
   </section>
  )
}

export default Buyerhome