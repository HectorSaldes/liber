import {Outlet, useNavigate} from "react-router-dom";
import {Menubar} from "primereact/menubar";
import {Button} from "primereact/button";

export default function Menu() {
    const navigate = useNavigate();

    const items = [
        {
            id: 1,
            label: "Home",
            icon: "pi pi-home",
            command: () => navigate("/"),
        },
        {
            id: 2,
            label: "Icons",
            icon: "pi pi-discord",
            command: () => navigate("/icons"),
        },
      /*  {

            label: "Icons",
            icon: "pi pi-box",
            items: [
                {
                    label: "Search by word",
                    icon: "pi pi-box",
                    command: () => navigate("/icons/by-word"),
                },
                {
                    label: "Search by ID",
                    icon: "pi pi-box",
                    command: () => navigate("/icons/by-id"),
                }, {
                    label: "Categories",
                    icon: "pi pi-box",
                    command: () => navigate("/icons/by-category"),
                },
            ],
        },
        {
            id: 3,
            label: "Images",
            icon: "pi pi-fw pi-camera",
            command: () => navigate("/images"),
        },*/
    ];

    const Start = () => (<div className='font-bold text-4xl lg:text-6xl'>LIBER</div>)

    const End = () => (
        <a href='https://hectorsaldes.netlify.app/' target='_blank' rel='noreferrer'>
            <Button icon='pi pi-heart-fill' raised label='¡Give five!'/>
        </a>
    )

    return (
        <div>
            <Menubar model={items} start={<Start/>} end={<End/>} style={{fontFamily: 'Space Grotesk'}}/>
            <Outlet/>
        </div>
    );
}
