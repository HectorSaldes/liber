import {Button} from "primereact/button";
import React, {useEffect, useState} from "react";

export default function ButtonUp() {
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => setScroll(window.pageYOffset);

    const goScrollUp = () => {
        window.scrollTo(0, 0);
        document.querySelector("#inputSearch").focus();
    };

    return (
        <div className='speeddial-tooltip-demo'
             style={{
                 position: "fixed",
                 bottom: "3em",
                 right: "3em",
             }}
        >
            {scroll > 200 && (<Button
                icon='pi pi-arrow-up'
                className='p-button-rounded p-button-help p-button-lg speeddial-left'
                onClick={() => goScrollUp()}
            />)}

        </div>
    );
}
