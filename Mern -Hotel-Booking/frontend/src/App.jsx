import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import HotelDetails from './pages/HotelDetails'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/room/:id' element={<HotelDetails />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App