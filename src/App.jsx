import { useState } from 'react'
import { useTranslation } from 'react-i18next'    // translator
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './components/Home'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Search from './components/Search'
import Planner from './components/Planner'
import Divestries from './components/devestries/Divestries'
import Submain from './components/Submain'
import Register from './components/Register'
import Login from './components/Login'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Adminhome from './components/adminPannel/Adminhome'
import Dashboard from './components/adminPannel/Dashboard'
import Farmers from './components/adminPannel/Farmers'
import Adminprofit from './components/adminPannel/Adminprofit'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
      <ToastContainer />
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/Admin/*" element={<Adminhome />} >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="farmers" element={<Farmers />} />
          <Route path="profitreports" element={<Adminprofit />} />
        </Route>
        <Route path="/*" element={<Submain />} />


      </Routes>



    </>
  )
}

export default App
