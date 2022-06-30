import {HashRouter as MainBrowser, Route, Routes} from 'react-router-dom';
import React, {useEffect} from 'react';
import Menu from './components/Menu';
import Home from './pages/Home';
import Icons from './pages/Icons';
import Images from './pages/Images';
import Illustrations from './pages/Illustrations';
import Error from './pages/Error';
import Aos from "aos";
import "aos/dist/aos.css";

export default function App() {
  useEffect(() => {
    Aos.init({duration: 2000});
  }, []);
  return (
    <MainBrowser>
      <Menu/>
      <Routes>
        <Route
          path='/'
          element={<Home/>}
        />
        <Route
          path='/icons'
          element={<Icons/>}
        />
        <Route
          path='/images'
          element={<Images/>}
        />
        <Route
          path='/illustrations'
          element={<Illustrations/>}
        />
        <Route
          path='*'
          element={<Error/>}
        />
      </Routes>
    </MainBrowser>
  );
}
