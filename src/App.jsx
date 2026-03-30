import { useState } from 'react'
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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="main">
        <Header />
        <Routes >
          <Route path='' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/planner' element={<Planner />} />
          <Route path='/divestry' element={<Divestries />} />
          <Route path='/back' element={<Planner  />} />
          
        </Routes>

      </div>

    </>
  )
}

export default App
