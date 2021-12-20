import React from "react";
import Icon from '../assets/svg/icon.svg'
import Image from '../assets/svg/image.svg'
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <div className="w-full glassmorphism text-white py-3 px-6 md:px-10">
            <div className="flex justify-between">
                <Link to="/">
                    <h1 className="font-bold text-5xl">LIBER</h1>
                </Link>
                <div className="w-1/4 flex items-center">
                    <Link to="/icons" className="w-1/2">
                        <button className="flex justify-center items-center w-12 h-12 md:w-full rounded-full bg-blue-400 font-semibold text-xl py-2 transform hover:scale-105">
                            <img className="w-10" src={Icon} alt="IconSvg"/>
                            <span className="hidden md:block">Iconos</span>
                        </button>
                    </Link>
                    <hr className="mx-2 md:mx-3"/>
                    <Link to="/images" className="w-1/2">
                        <button className="flex justify-center items-center w-12 h-12 md:w-full rounded-full bg-yellow-400 font-semibold text-xl py-2 transform hover:scale-105">
                            <img className="w-10" src={Image} alt="ImageSvg"/>
                            <span className="hidden md:block">Imágenes</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
