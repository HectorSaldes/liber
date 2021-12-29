import React, { useState, useRef } from "react";
import Menu from "../components/Menu";
import IconsService from "../service/IconsService";
import IconSkeleton from "../components/IconSkeleton";
import IconCard from "../components/IconCard";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

export default function Icons() {
	const toast = useRef(null);
	const [listSearch, setListSearch] = useState([]);
	const [valueSelected, setValueSelected] = useState(null);
	const [listOfIcons, setListOfIcons] = useState([]);

	const searchWithText = async ({ query }) => {
		let data = await querySearch(query);
		let replace = await data.map((d) => d.replaceAll("-", " "));
		setListSearch(replace);
	};

	const querySearch = async (text) => {
		return await IconsService.autoComplete(text)
			.then(({ data: { data } }) => data)
			.catch((err) =>
				messages(
					"error",
					"Problemas en el servidor",
					"Vuelve a intentarlo"
				)
			);
	};

	const searchIcons = () => {
		try {
			if (valueSelected) {
				getAllIcons();
			} else {
				messages(
					"info",
					"Debes colocar alguna palabra",
					"Dentro del cuadro de texto"
				);
			}
		} catch (error) {
			messages(
				"error",
				"Ocurrió un error al esperar al servidor",
				"Vuelve a intentarlo un poco más tarde"
			);
		}
	};

	const getAllIcons = async () => {
		let allIcons = await IconsService.searchIcons(valueSelected);
		setListOfIcons(allIcons);
	};

	const messages = (severity, summary, detail) => {
		toast.current.show({ severity, summary, detail, life: 3000 });
	};

	return (
		<div style={{ color: "var(--yellow-50)", fontFamily: "Poppins" }}>
			<Menu />
			<Toast ref={toast}></Toast>
			<div className="p-grid p-dir-col p-text-center p-p-4">
				<div className="p-col">
					<div className="p-text-bold" style={{ fontSize: "40px" }}>
						Iconos
					</div>

					<div
						className="p-mb-2 p-text-justify p-text-sm-center"
						style={{ fontSize: "25px" }}
					>
						Empieza a buscar algún icono en el campo de texto
					</div>
				</div>
				<div className="p-col">
					<AutoComplete
						className=""
						value={valueSelected}
						suggestions={listSearch}
						completeMethod={searchWithText}
						onChange={(e) => setValueSelected(e.value)}
						inputStyle={{ fontSize: "25px" }}
					/>
					<br />
					<br />
					<Button
						label="Buscar"
						icon="pi pi-search"
						className="p-button-lg"
						onClick={searchIcons}
					/>
				</div>
				<div className="p-col">
					<div className="p-grid">
						{listOfIcons.length === 0 ? (
							<IconSkeleton />
						) : (
							listOfIcons &&
							listOfIcons.map((i, key) => (
								<IconCard
									payload={i}
									key={key}
									messages={messages}
								/>
							))
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
