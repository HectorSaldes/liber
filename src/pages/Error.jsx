import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";

export default function Error() {
	return (
		<div
			className="p-d-flex p-jc-center p-ai-center"
			style={{
				height: "90vh",
				width: "auto",
				color: "var(--yellow-50)",
				fontFamily: "Poppins",
			}}
		>
			<div className="p-text-center">
				<div className="p-text-bold" style={{ fontSize: "8em" }}>
					LIBER
				</div>
				<div className="p-text-bold" style={{ fontSize: "3em" }}>
					ERROR 404
				</div>
				<p
					className=""
					style={{
						fontSize: "2em",
					}}
				>
					No se encontró esta página
				</p>
				<Link to="/">
					<Button
						label="Regresar al inicio"
						icon="pi pi-home"
						className="p-button-lg"
					/>
				</Link>
			</div>
		</div>
	);
}
