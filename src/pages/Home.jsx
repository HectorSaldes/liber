import React from "react";
import Menu from "../components/Menu";
import { Card } from "primereact/card";

export default function Home() {
	const myCards = [
		{
			title: "Heroku",
			image: "https://alejandrojs.files.wordpress.com/2017/07/heroku-og-cad174838a49b266550809e29026ec9bc18e056dae8f9cf523ea4237379691f9.png",
			text: "Se utiliza Heroku para habilitar la peticón a las APIs y asi evitar problemas de CORS dentro de la aplicación, por lo que existen posibilidades de que la aplicación al principio tarde en ejecutar una petición.",
		},
		{
			title: "Iconos Ocho",
			image: "https://maxst.icons8.com/vue-static/landings/page-index/plugins-preview.png",
			text: "Los iconos que se muestran y descargan son directamente de los iconos de Icon8 en su versión premium SVG, solamente es posible descargar en formato SVG, para guardar su alta calidad.",
		},
		{
			title: "Imágenes AWS",
			image: "https://i.ytimg.com/vi/ciQ83A20mHM/maxresdefault.jpg",
			text: "Las imágenes que se guardan son almacenadas en el servicio de Amazon S3",
		},
	];

	return (
		<div style={{ color: "var(--yellow-50)", fontFamily: "Poppins" }}>
			<Menu />
			<div className="p-p-4">
				<div
					className="p-text-bold p-text-center"
					style={{ fontSize: "8em" }}
				>
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
			<div className="p-grid p-mx-sm-6 p-text-center">
				{myCards.map((c) => (
					<div className="p-col">
						<Card
							title={c.title}
							header={
								<img
									style={{
										backgroundSize: "cover",
										backgroundRepeat: "no-repeat",
									}}
									alt={c.title}
									height="200"
									width="auto"
									src={c.image}
								/>
							}
							style={{
								width: "25rem",
								marginBottom: "2em",
								fontSize: "20px",
							}}
						>
							<div
								className="p-m-0 p-text-justify"
								style={{ lineHeight: "1.5" }}
							>
								{c.text}
							</div>
						</Card>
					</div>
				))}
			</div>
		</div>
	);
}
