import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import React, { useState, useEffect, useRef } from "react";
import ImagesService from "../service/ImagesService";
import LocalStorageService from "../service/LocalStorageService";
import Title from "../components/Title";
import { URL_CORS } from "../service/UtilService";

const _ImagesService = new ImagesService();
const _LocalStorageService = new LocalStorageService();
export default function Images() {
	const toast = useRef(null);
	const myLocalStorage = "liber-images";
	const [liberImages, setLiberImages] = useState([]);

	useEffect(() => {
		setLiberImages(_LocalStorageService.initLocal(myLocalStorage));
	}, []);

	const getImageUploaded = async (formData, batch) => {
		return _ImagesService.uploadImage(formData, batch)
			.then(({ data }) => data)
			.catch((err) => messages("error", "Fail to upload image", err));
	};

	const onUpload = async (e) => {
		if (e.files[0].type === "image/png" || e.files[0].type === "image/jpg" || e.files[0].type === "image/jpeg") {
			let batch = await JSON.parse(e.xhr.response);
			let imageTaken = e.files[0];
			if (e.xhr.status === 201) {
				if (batch.latency === 0) {
					messages("info", "Uploading image", "This can take a few seconds");
					let data = new FormData();
					data.append("image", imageTaken, imageTaken.name);
					let dataImage = await getImageUploaded(data, batch.id);
					if (_LocalStorageService.saveData(myLocalStorage, dataImage)) {
						setLiberImages(_LocalStorageService.getAllData(myLocalStorage));
						messages("success", "Image uploaded", "Your image has been saved");
					} else messages("error", "Image not uploaded", "Your image has not been saved",);
				}
			} else messages("error", "Problems with the server", "Try again later");
		} else messages("error", "Image not valid", "This kind of format is not valid");
	};

	const footer = `There are ${liberImages ? liberImages.length : 0} images.`;

	const name = ({ filename }) => <span>{filename}</span>;

	const dimensions = ({ source: { height, width } }) => (<span>{`${height} x ${width}`}</span>);

	const date = ({ date }) => <span>{`${date}`}</span>;

	const image = ({ source: { url } }) => (<img style={{ width: "100px" }} alt={url} src={url} />);

	const actions = ({ id, source: { url } }) => (
		<div>
			<a href={url} target='_blank' rel='noreferrer'><Button icon='pi pi-arrow-up-right' className='p-button-rounded p-button-warning'/></a>
			<Button icon='pi pi-trash' className='p-button-rounded p-button-danger sm:mx-2' onClick={() => confirm(id)}/>
			<Button icon='pi pi-copy' className='p-button-rounded p-button-info' onClick={() => copyToClipboard(url)}/>
		</div>
	);

	const copyToClipboard = (url) => {
		try {
			navigator.clipboard.writeText(url);
			messages("info", "URL copied", "We hace copied the URL to your clipboard");
		} catch (error) {
			messages("error", "URL not copied", "This browser does not support");
		}

	};

	const accept = (id) => {
		if (_LocalStorageService.deleteData(myLocalStorage, id)) {
			setLiberImages(_LocalStorageService.getAllData(myLocalStorage));
			messages("success", "Image deleted", "Delete successfull");
		} else messages("error", "There was an error", "Delete unsuccessful");
	};

	const confirm = (id) => {
		confirmDialog({
			header: "Delete",
			message: "Do you want to delete this file permanently?",
			icon: "pi pi-info-circle",
			acceptClassName: "p-button-danger",
			accept: () => accept(id),
			draggable: false,
			closable: true,
			closeOnEscape: true,
		});
	};

	const messages = (severity, summary, detail, sticky = false) =>
		toast.current.show({ severity, summary, detail, life: 3000, sticky });

	return (
		<div className='p-4'>
			<Toast ref={toast} />
			<ConfirmDialog />
			<div className='text-center'>
				<Title title='Images'
					description='Here you can upload you images on net and use them on a URL in format PNG, JPG, JPEG. NOTICE that the images are saved temporaly around 30 days.'
				/>
				<FileUpload
					name='File'
					url={`${URL_CORS}https://api-upscaler-origin.icons8.com/api/frontend/v1/batches`}
					onUpload={onUpload}
					onBeforeSend={(e) => {
						e.xhr.setRequestHeader("x-user-id", "63470d772cf095526d35ae49");
					}}
					accept='.png, .jpg, .jpeg'
					maxFileSize={5000000}
					chooseLabel='Add image'
					uploadLabel='Upload image'
					cancelLabel='Cancel'
					emptyTemplate={<p className='m-0'>You can only upload one image at a time</p>}
				/>
				<div className='col'>
					<div className='card'>
						<DataTable
							value={liberImages}
							header={
								<div style={{ color: "var(--surface-900)", fontSize: "20px" }}>Table of images saved locally</div>
							}
							footer={footer}
							responsiveLayout='stack'
							paginator
							rows={5}>
							<Column header='Name' body={name} />
							<Column header='Date' body={date} />
							<Column header='Dimens' body={dimensions} />
							<Column header='Image' body={image} />
							<Column header='Acctions' body={actions} />
						</DataTable>
					</div>
				</div>
			</div>
		</div>
	);
}
