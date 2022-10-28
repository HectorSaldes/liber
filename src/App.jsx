import {HashRouter as MainBrowser, Route, Routes} from 'react-router-dom';
import React from 'react';
import Menu from './components/Menu';
import Home from './pages/Home';
import IconsByWord from './pages/icons/IconsByWord';
import Images from './pages/Images';
import Illustrations from './pages/Illustrations';
import Error from './pages/Error';
import IconsById from "./pages/icons/IconsById";

export default function App() {
  return (
    <MainBrowser>
      <Menu/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/icons' element={<IconsByWord/>} />
        <Route path='/icons/by-id' element={<IconsById/>} />
        <Route path='/images' element={<Images/>} />
        <Route path='/illustrations' element={<Illustrations/>} />
        <Route path='*' element={<Error/>}
        />
      </Routes>
    </MainBrowser>
  );
}
