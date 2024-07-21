import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Algorithm from './components/Algorithm'

const App = () => {
  return (
    <div className="relative h-screen w-full bg-neutral-900">
            <div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]">
                </div>
   <BrowserRouter>
   <Routes>
    <Route index element={<Algorithm/>}/>
   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
