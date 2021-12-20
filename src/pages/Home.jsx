import React from "react";
import Menu from "../components/Menu";

export default function Home() {
	return (
		<div
			className="w-full h-screen p-4 text-white"
			style={{
				background:
					"linear-gradient(116.82deg, #410066 0%, #340052 100%)",
			}}
		>
			<div className="glassmorphism w-full h-full">
				<Menu />
				<div className="w-full h-5/6 flex justify-center items-center text-center">
					<div>
						<h1 className="text-9xl font-bold">LIBER</h1>
						<p className="text-4xl font-extralight my-6">
							<i>Liber</i> del romano significa libre.{" "}
							<i>Liber</i> se usa para decir que algo es libre o
							gratis
						</p>
						<a
							href="https://hectorsaldes.netlify.app/"
							className="text-xl"
							target="_blank"
							without
							rel="noreferrer"
						>
							Aplicación web escrita desde un teclado con amor.
							Hector 💥
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
