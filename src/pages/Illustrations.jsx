import { Toast } from "primereact/toast";
import Search from "../components/Search";
import React, { useState, useRef, useEffect } from "react";
import IllustrationsService from "../service/IllustrationsService";
import { handleScroll } from "../service/UtilService";
import { illustrationsCategories } from "../assets/utils/Items";
import SkeletonCard from "../components/SkeletonCard";
import EmptySearch from "../components/EmptySearch";
import IllustrationCard from "../components/IllustrationCard";
import ButtonMore from "../components/ButtonMore";
import ButtonUp from "../components/ButtonUp";
import Title from "../components/Title";

export default function Illustrations() {
	const toast = useRef(null);
	const [valueSelected, setValueSelected] = useState(null);
	const [listSearch, setListSearch] = useState([]);
	const [categorySelected, setCategorySelected] = useState("");
	const [listOfIllustrations, setListOfIllustrations] = useState([]);
	const [scroll, setScroll] = useState(0);
	const [loading, setLoading] = useState(false);
	let pageSelectec = 1;

	const goScrollUp = () => {
		window.scrollTo(0, 0);
		document.querySelector("#inputSearch").focus();
	};

	useEffect(() => {
		window.addEventListener("scroll", () => setScroll(handleScroll), {
			passive: true,
		});
		return () => {
			window.removeEventListener("scroll", () => setScroll(handleScroll));
		};
	}, []);

	const onLoadingClick = () => {
		setLoading(true);
		pageSelectec++;
		getPartialIllustrations();
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	};

	const searchWithText = async ({ query }) => {
		const data = await querySearch(query);
		let array = data.map((i) => i.name);
		setListSearch(array);
	};

	const fileToDownload = async (url, pretty_id) => {
		const tag = document.createElement("a");
		tag.href = await toDataURL(url);
		tag.download = `${pretty_id}.png`;
		tag.setAttribute("target", "_blank");
		document.body.appendChild(tag);
		tag.click();
		document.body.removeChild(tag);
	};

	async function toDataURL(url) {
		return fetch(url)
			.then((response) => response.blob())
			.then((blob) => URL.createObjectURL(blob));
	}

	const getIllustrationDownload = async (id) => {
		try {
			messages("info", "Downloading...");
			await IllustrationsService.getIllustration(id).then(({ data }) => {
				fileToDownload(data.resources.editor.url, data.id);
			});
		} catch (error) {
			messages("error", "Something went wrong", "Please try again later.");
		}
	};

	const messages = (severity, summary, detail) => {
		toast.current.show({
			severity,
			summary,
			detail,
			life: 3000,
		});
	};

	const querySearch = async (text) => {
		return IllustrationsService.autoComplete(text)
			.then(({ data }) => data)
			.catch(() => null);
	};

	const searchIllustration = async (e) => {
		try {
			if (e === "Enter") {
				messages("info", "Searching...");
				if (valueSelected) {
					let flag = await getAllIllustration();
					if (flag) cleanMessages();
					else
						messages(
							"error",
							"There were no results for your search",
							"Try another search.",
						);
				} else {
					messages(
						"error",
						"You must enter a search",
						"To search for illustrations.",
					);
				}
			}
		} catch (error) {
			messages(
				"error",
				"Ocurrió un error al esperar al servidor",
				"Vuelve a intentarlo un poco más tarde",
			);
		}
	};

	const getPartialIllustrations = async () => {
		const newIllustrations = await IllustrationsService.searchIllustrations(
			valueSelected,
			pageSelectec,
			categorySelected,
		);
		setListOfIllustrations([...listOfIllustrations, ...newIllustrations]);
	};

	const getAllIllustration = async () => {
		const allIllus = await IllustrationsService.searchIllustrations(
			valueSelected,
			pageSelectec,
			categorySelected,
		);
		setListOfIllustrations(allIllus);
		return allIllus.length !== 0;
	};

	const cleanFilters = () => {
		setListSearch([]);
		setValueSelected(null);
		setCategorySelected("");
		setListOfIllustrations([]);
		messages("success", "Pantalla limpiada", "repito, pantalla limpiada");
	};

	const cleanMessages = () => toast.current.clear();

	return (
		<div className="p-4">
			<Toast ref={toast} />
			<div className="text-center">
				<Title
					title="Illustrations"
					description="Here you can download necessary illustration"
				/>
			</div>

			<Search
				autoCompleteState={valueSelected}
				autoCompleteSetState={setValueSelected}
				autoCompleteSuggetions={listSearch}
				autoCompleteMethod={searchWithText}
				autoCompleteSearchIcons={searchIllustration}
				dropdownCategories={illustrationsCategories}
				dropdownState={categorySelected}
				dropdownSetState={setCategorySelected}
				buttonSearch={searchIllustration}
				buttonClear={cleanFilters}
			/>

			<div className="grid">
				{valueSelected === null ? (
					<EmptySearch title="illustrations" color="yellow" />
				) : listOfIllustrations.length === 0 ? (
					<SkeletonCard />
				) : (
					listOfIllustrations &&
					listOfIllustrations.map((i, key) => (
						<IllustrationCard
							key={key}
							payload={i}
							getIllustrationDownload={getIllustrationDownload}
						/>
					))
				)}
				{listOfIllustrations.length !== 0 && (
					<ButtonMore
						title="Cargar más ilustraciones..."
						loading={loading}
						onLoadingClick={onLoadingClick}
					/>
				)}
			</div>
			{scroll >= 200 && <ButtonUp goScrollUp={goScrollUp} />}
		</div>
	);
}
