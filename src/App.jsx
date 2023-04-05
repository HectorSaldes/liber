import { HashRouter as MainBrowser, Route, Routes } from "react-router-dom";
import React from "react";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import IconsByWord from "./pages/icons/IconsByWord";
import Images from "./pages/Images";
// rome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import  Error from "./pages/Error";
import IconsById from "./pages/icons/IconsById";
import IconsByCategory from "./pages/icons/IconsByCategory";

export default function App() {
	return (
		<MainBrowser>
			<Menu />
			<div className='p-4'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/icons' element={<IconsByWord />} />
					<Route path='/icons/by-id' element={<IconsById />} />
					<Route path='/icons/by-category' element={<IconsByCategory />} />
					<Route path='/images' element={<Images />} />
					<Route path='*' element={<Error />} />
				</Routes>
			</div>
		</MainBrowser>
	);
}
