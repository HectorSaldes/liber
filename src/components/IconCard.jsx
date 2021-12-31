import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function IconCard({ payload, getIconToDownload }) {
	const { name, commonName, platform, id } = payload;

	const header = () => (
		<div className="p-d-flex p-jc-center p-pt-2">
			<img
				src={`https://img.icons8.com/${platform}/2x/${commonName}.png`}
				alt={commonName}
				style={{ height: "100px", width: "100px" }}
			/>
		</div>
	);

	return (
		<div className="p-col-6 p-sm-4 p-md-2" key={id}>
			<Card
				key={id}
				title={name}
				header={header}
				footer={
					<Button
						label="SVG"
						icon="pi pi-download"
						className="p-button p-button-warning"
						onClick={() => getIconToDownload(id, commonName)}
					/>
				}
			/>
		</div>
	);
}
