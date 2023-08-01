import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import React from "react";

export default function Menu() {
	const navigate = useNavigate();

	const items = [
		{
			label: "Home",
			icon: "pi pi-fw pi-home",
			command: () => navigate("/"),
		},
		{
			label: "Icons",
			icon: "pi pi-fw pi-box",
			items: [
				{
					label: "Search by word",
					icon: "pi pi-fw pi-box",
					command: () => navigate("/icons"),
				},
				{
					label: "Search by ID",
					icon: "pi pi-fw pi-box",
					command: () => navigate("/icons/by-id"),
				},{
					label: "Categories",
					icon: "pi pi-fw pi-box",
					command: () => navigate("/icons/by-category"),
				},
			],
		},
		{
			label: "Images",
			icon: "pi pi-fw pi-camera",
			command: () => navigate("/images"),
		},
	];

	return (
		<Menubar
			model={items}
			start={<h1 className='mr-2 font-semibold' style={{ color: "black" }}>LIBER</h1>}
			end={
				<a href='https://hectorsaldes.netlify.app/' target='_blank' rel='noreferrer' style={{ textDecoration: "none" }}>
					<Button text raised label='¡Give five! 👋🏼' className='p-button-warning'/>
				</a>
			}
		/>
	);
}
