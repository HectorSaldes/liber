import React, { useState, useRef } from "react";
import Menu from "../components/Menu";
import Empty from "../assets/svg/emptyIcons.svg";
import IconsService from "../service/IconsService";
import IconSkeleton from "../components/IconSkeleton";
import IconCard from "../components/IconCard";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";

export default function Icons() {
	const toast = useRef(null);
	const [listSearch, setListSearch] = useState([]);
	const [valueSelected, setValueSelected] = useState(null);
	const [categorySelected, setCategorySelected] = useState("all");
	const [offsetSelected, setOffsetSelected] = useState(0);
	const [listOfIcons, setListOfIcons] = useState([]);
	const [loading, setLoading] = useState(false);

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

	const searchIcons = (e) => {
		try {
			if (e === "Enter") {
				if (valueSelected) {
					getAllIcons();
				} else {
					messages(
						"error",
						"Debes colocar alguna palabra",
						"Para empezar a buscar"
					);
				}
			}
		} catch (error) {
			messages(
				"error",
				"Ocurrió un error al esperar al servidor",
				"Vuelve a intentarlo un poco más tarde"
			);
		}
	};

	const onLoadingClick = () => {
		setLoading(true);
		setOffsetSelected(offsetSelected + 50);
		getPartialcons();
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	};

	const getAllIcons = async () => {
		let allIcons = await IconsService.searchIcons(
			valueSelected,
			categorySelected,
			offsetSelected
		);
		setListOfIcons(allIcons);
	};

	const getPartialcons = async () => {
		let allIcons = await IconsService.searchIcons(
			valueSelected,
			categorySelected,
			offsetSelected + 50
		);
		console.log(offsetSelected);
		setListOfIcons([...listOfIcons, ...allIcons]);
	};

	const getIconToDownload = async (id, commonName) => {
		try {
			await IconsService.getIcon(id).then(({ data }) => {
				convertSvgToFileAndDownload(data.icon.svg, commonName);
			});
		} catch (error) {
			messages(
				"error",
				"Ocurrió un error al esperar al servidor",
				"Vuelve a intentarlo un poco más tarde"
			);
		}
	};

	const convertSvgToFileAndDownload = (svg, name) => {
		let decode = atob(svg);
		const blob = new Blob([decode]);
		const fileUrl = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = fileUrl;
		link.setAttribute("download", `${name}.svg`);
		document.body.appendChild(link);
		link.click();
		URL.revokeObjectURL(fileUrl);
		link.parentNode.removeChild(link);
	};

	const messages = (severity, summary, detail) => {
		toast.current.show({ severity, summary, detail, life: 3000 });
	};

	const cleanFilters = () => {
		setListSearch([]);
		setValueSelected(null);
		setCategorySelected("all");
		setOffsetSelected(0);
		setListOfIcons([]);
	};

	const categories = [
		{ label: "Todos los estilos", value: "all" },
		{ label: "Emoji", value: "emoji" },
		{ label: "iOS | Outlined", value: "ios7" },
		{ label: "iOS | Filled", value: "ios_filled" },
		{ label: "iOS | Glyph", value: "ios11" },
		{ label: "Material | Filled", value: "androidL" },
		{ label: "Material | Outlined", value: "m_outlined" },
		{ label: "Material | Rounded", value: "m_rounded" },
		{ label: "Material | Sharp", value: "m_sharp" },
		{ label: "Material | Two Tone", value: "m_two_tone" },
		{ label: "Color", value: "color" },
		{ label: "Simple Small", value: "p1em" },
		{ label: "Glyph Neue", value: "glyph-neue" },
		{ label: "Color Glass", value: "clr-gls" },
		{ label: "Stickers", value: "stickers" },
		{ label: "Office | XS", value: "office16" },
		{ label: "Office | S", value: "office30" },
		{ label: "Office | M", value: "office40" },
		{ label: "Office | L", value: "office80" },
		{ label: "Cute | Outlined", value: "Dusk_Wired" },
		{ label: "Cute | Color", value: "dusk" },
		{ label: "Cute | Clipart", value: "cool" },
		{ label: "Blue UI", value: "ultraviolet" },
		{ label: "Dotted", value: "dotty" },
		{ label: "Gradient", value: "nolan" },
		{ label: "Pastel | Outlined", value: "cotton" },
		{ label: "Pastel | Glyph", value: "pastel_glyph" },
		{ label: "Ice Cream", value: "android" },
		{ label: "Fluency", value: "fluent" },
		{ label: "Fluency System | Regular", value: "fluent-systems-regular" },
		{ label: "Fluency System | Filled", value: "fluent-systems-filled" },
		{ label: "Plumpy", value: "plumpy" },
		{ label: "Doodle", value: "doodle" },
		{ label: "Infographic", value: "flat_round" },
		{ label: "Windows | Metro", value: "win8" },
		{ label: "Windows | 10", value: "win10" },
		{ label: "Cloud", value: "clouds" },
		{ label: "Bubbles", value: "bubbles" },
		{ label: "Hand Drawn | Outlined", value: "carbon_copy" },
		{ label: "Hand Drawn | Color", value: "plasticine" },
	];

	return (
		<div style={{ color: "var(--yellow-50)", fontFamily: "Poppins" }}>
			<Menu />
			<Toast ref={toast}></Toast>
			<div className="p-text-center p-p-4">
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

			<div className="p-grid p-text-center">
				<div className="p-col-12 p-md-6 p-md-offset-3">
					<div className="p-grid">
						<div className="p-col">
							<AutoComplete
								placeholder="Busca iconos..."
								value={valueSelected}
								suggestions={listSearch}
								completeMethod={searchWithText}
								onChange={(e) => setValueSelected(e.value)}
								onKeyPress={({ key }) => searchIcons(key)}
								inputStyle={{ width: "20em" }}
							/>
						</div>
						<div className="p-col">
							<Dropdown
								options={categories}
								value={categorySelected}
								emptyMessage="No hay opciones"
								placeholder="Selecciona una categoría"
								onChange={(e) => setCategorySelected(e.value)}
								style={{ width: "20em" }}
							/>
						</div>
						<div className="p-col">
							<Button
								label="Buscar"
								icon="pi pi-search"
								className="p-button"
								onClick={() => searchIcons("Enter")}
							/>
						</div>
						<div className="p-col">
							<Button
								label="Borrar filtros"
								className="p-button-link"
								onClick={() => cleanFilters()}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="p-grid p-p-4">
				{valueSelected === null ? (
					<div className="p-col-12 p-text-center">
						<h1>Empieza por buscar algunos iconos</h1>
						<img
							src={Empty}
							alt="empty"
							width={300}
							style={{ backgroundColor: "var(--yellow-400)" }}
						/>
					</div>
				) : listOfIcons.length === 0 ? (
					<IconSkeleton />
				) : (
					listOfIcons &&
					listOfIcons.map((i, key) => (
						<IconCard
							payload={i}
							key={key}
							getIconToDownload={getIconToDownload}
						/>
					))
				)}
				{listOfIcons.length !== 0 && (
					<div className="p-col-12 p-text-center p-mt-5">
						<Button
							label="Cargar más iconos..."
							loading={loading}
							onClick={onLoadingClick}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
