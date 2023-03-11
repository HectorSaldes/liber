import { Button } from "primereact/button";
import React from "react";

export default function ButtonUp({ goScrollUp }) {
	return (
		<div
			className='speeddial-tooltip-demo'
			style={{
				position: "fixed",
				bottom: "3em",
				right: "3em",
			}}
		>
			<Button
				icon='pi pi-arrow-up'
				className='p-button-rounded p-button-help p-button-lg speeddial-left'
				onClick={() => goScrollUp()}
			/>
		</div>
	);
}
