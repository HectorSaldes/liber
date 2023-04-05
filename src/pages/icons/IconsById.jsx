import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Title from "../../components/Title";
import EmptySearch from "../../components/EmptySearch";
import SkeletonCard from "../../components/SkeletonCard";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import IconsService from "../../service/IconsService";
import { Card } from "primereact/card";

const IconsById = () => {
	const [valueSelected, setValueSelected] = useState("");
	const [iconFounded, setIconFounded] = useState(null);
	const toast = useRef(null);

	const messages = (severity, summary, detail) => {
		toast.current.show({ severity, summary, detail, life: 3000 });
	};

	const convertSvgToFileAndDownload = () => {
		const decode = atob(iconFounded.svg);
		const blob = new Blob([decode]);
		const fileUrl = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = fileUrl;
		link.setAttribute("download", `${iconFounded.name}.svg`);
		document.body.appendChild(link);
		link.click();
		URL.revokeObjectURL(fileUrl);
		link.parentNode.removeChild(link);
	};

	const searchIcons = () => {
		messages("info", "Loading data", "Plase wait");
		if (valueSelected.length > 0) {
			IconsService.getIcon(valueSelected)
				.then((data) => {
					setIconFounded(data.data.icon);
					messages("success", "Icon found", "I repeat, icon found");
				})
				.catch((err) => {
					messages("error", "Icon not found", "I repeat, icon not found");
				});
		} else messages("error", "You must type an ID", "For looking for");
	};

	const clearSearch = () => {
		setValueSelected("");
		setIconFounded(null);
		messages("success", "Screen cleaned", "I repeat, screen cleaned");
	};

	const header = () => (
		<div className="col-12 flex justify-content-center pt-2">
			<img
				src={`https://img.icons8.com/${iconFounded.platform}/2x/${iconFounded.commonName}.png`}
				alt="icon"
				style={{ height: "100px", width: "100px" }}
			/>
		</div>
	);

	return (
		<>
			<Toast ref={toast} />
			<div className="text-center">
				<Title
					title="Icons by id"
					description="Here you can download directly by ID"
				/>
			</div>
			<div className="grid p-2">
				<div className="col-12 col-offset-0 md:col-6 md:col-offset-3">
					<div className="grid">
						<div className="col-12 md:col-6">
							<span className="p-input-icon-left w-full">
								<i className="pi pi-search" />
								<InputText
									placeholder="Search ID"
									style={{ width: "100%" }}
									value={valueSelected}
									onChange={(event) => setValueSelected(event.target.value)}
								/>
							</span>
						</div>
						<div className="col-12 md:col-6">
							<Button
								label="Search"
								icon="pi pi-search"
								className="p-button-info"
								onClick={() => searchIcons()}
								style={{ width: "100%" }}
							/>
						</div>
						<div className="col-12">
							<Button
								label="Clear filters"
								icon="pi pi-times"
								className="p-button-warning"
								onClick={() => clearSearch()}
								style={{ width: "100%" }}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="text-center" style={{ fontSize: "1.2em" }}>
				Please read the next blog post to know how to get the ID of the icon you
				want to download:
				<br />
				<a
					href="https://hectorsald.notion.site/How-can-I-get-the-ID-of-an-Icon-7b16361ec7eb49a4b146659a619f6deb"
					target="_blank"
					rel="noreferrer"
				>
					How can I get the ID of an Icon?
				</a>
			</div>
			{iconFounded ? (
				<div className="mt-5 grid md:col-offset-4">
					<Card
						className="iconCards col-12 md:col-6"
						style={{ backgroundColor: "var(--yellow-50)"  }}
						key={1}
						subTitle={iconFounded.name}
						header={header}
						footer={
							<Button
								label="SVG"
								icon="pi pi-download"
								className="col-12 p-button p-button-warning"
								onClick={() => convertSvgToFileAndDownload()}
							/>
						}
					/>
				</div>
			) : valueSelected.length === 0 ? (
				<EmptySearch title="icons or icon" color="green" />
			) : (
				<div className="grid mt-5">
					<SkeletonCard />
				</div>
			)}
		</>
	);
};

export default IconsById;
