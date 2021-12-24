import React from "react";
import Menu from "../components/Menu";

export default function Icons() {
	return (
		<div style={{ color: "var(--yellow-50)", fontFamily: "Poppins" }}>
			<Menu />
			<div className="p-grid p-dir-col p-text-center p-p-4">
				<div className="p-col">
					<div className="p-text-bold" style={{ fontSize: "40px" }}>
						Iconos
					</div>

					<div
						className="p-mb-2 p-text-justify p-text-sm-center"
						style={{ fontSize: "25px" }}
					>
						Próximamente...
					</div>
				</div>
			</div>
		</div>
	);
}
