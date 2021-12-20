import React from 'react'
import Home from './pages/Home'
import Icons from './pages/Icons'
import Images from './pages/Images'
import Error from './pages/Error'
import {BrowserRouter as MainBrowser, Route, Routes} from 'react-router-dom'

export default function App() {
    return (
        <MainBrowser>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/icons" element={<Icons />}/>
                <Route path="/images" element={<Images />}/>
                <Route path="*" element={<Error />}/>
            </Routes>
        </MainBrowser>
    )
}