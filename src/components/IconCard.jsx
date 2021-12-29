import React, { useRef, useState } from "react";
import IconsService from "../service/IconsService";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function IconCard({ payload, messages }) {
	let dofileDownload = useRef(null);
	const [fileDownloadUrl, setFileDownloadUrl] = useState(null);
	const { name, commonName, platform, id } = payload;

	const getIconToDownload = () => {
		try {
			IconsService.getIcon(id)
				.then(
					({
						data: {
							icon: { svg },
						},
					}) => {
						let decode = atob(svg);
						const blob = new Blob([decode]);
						const fileDownloadUrl = URL.createObjectURL(blob);
						setFileDownloadUrl(fileDownloadUrl);
						dofileDownload.click();
						URL.revokeObjectURL(fileDownloadUrl);
					}
				)
				.catch((err) => {
					messages("error", "Ocurrió un error en el servidor");
				});
		} catch (error) {
			messages(
				"error",
				"Ocurrió un error al esperar al servidor",
				"Vuelve a intentarlo un poco más tarde"
			);
		}
	};

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
					<a
						ref={dofileDownload}
						href={fileDownloadUrl}
						download={`${commonName}.svg`}
					>
						<Button
							label="SVG"
							icon="pi pi-download"
							className="p-button p-button-warning"
							onClick={getIconToDownload}
						/>
					</a>
				}
			/>
		</div>
	);
}
