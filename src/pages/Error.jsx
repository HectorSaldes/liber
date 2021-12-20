import React from "react";
import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div
            className="w-screen h-screen p-4 text-white"
            style={{
                background:
                    "linear-gradient(116.82deg, #3B0602 0%, #651A13 0.01%, #3C0602 100%, #3C0602 100%)",
            }}
        >
            <div className="glassmorphism w-full h-full">
                <div className="w-full h-full flex justify-center items-center text-center">
                    <div>
                        <h1 className="text-9xl font-bold">LIBER</h1>
                        <p className="text-4xl font-semibold my-3">ERROR 404</p>
                        <p className="text-2xl">No se encontró esta página</p>
                        <Link to="/">
                            <button className="w-3/4 glassmorphism text-2xl font-semibold py-2 mt-5 transform delay-200 hover:scale-105">
                                Regresar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
