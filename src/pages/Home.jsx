import React from "react";
import Menu from "../components/Menu";

export default function Home() {
	return (
		<div style={{ color: "var(--yellow-50)", fontFamily: "Poppins" }}>
			<Menu />
			<div className="p-grid p-p-4">
				<div className="p-text-center">
					<div className="p-text-bold" style={{ fontSize: "8em" }}>
						LIBER
					</div>
					<div className="p-text-justify p-text-sm-center">
						<div
							className="p-text-italic"
							style={{
								color: "var(--bluegray-300)",
								fontSize: "1.5em",
							}}
						>
							Liber del romano significa libre.
						</div>
						<div
							className=""
							style={{
								fontSize: "2em",
							}}
						>
							Este un proyecto creado con la intención de ayudar a
							personas con la intención de descargar iconos con
							extención svg gratis y subir sus imágenes a internet
							mediante S3 de Amazon completamente gratis.
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
