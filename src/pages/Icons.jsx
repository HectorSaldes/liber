import React from "react";
import Menu from "../components/Menu";

export default function Icons() {
    return (
        <div
            className="w-full h-screen p-4 text-white"
            style={{
                background:
                    "linear-gradient(116.82deg, #00567A 0%, #003A52 100%)",
            }}
        >
            <div className="glassmorphism w-full h-full">
                <Menu />
                <div className="mt-5">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold">LIBER</h1>
                        <p className="text-xl">Iconos</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
