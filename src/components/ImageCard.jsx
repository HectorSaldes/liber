import React from "react";

export default function ImageCard({
	img,
	// Swal,
	// message,
	myLocalStorage,
	LocalStorageService,
	setLiberImages,
}) {
	const { id, filename } = img;
	const { height, width, type, url } = img.source;

	const removeImage = () => {
		// Swal.fire({
		// 	title: "¿Quieres eliminar esta imagen?",
		// 	text: "No se puede revertir este cambio",
		// 	icon: "warning",
		// 	showCancelButton: true,
		// 	confirmButtonColor: "#3085d6",
		// 	cancelButtonColor: "#d33",
		// 	confirmButtonText: "Si, eliminar!",
		// 	cancelButtonText: "No, guardar",
		// }).then((result) => {
		// 	if (result.isConfirmed) {
		// 		if (LocalStorageService.deleteData(myLocalStorage, id)) {
		// 			message("success", "Imagen eliminada correctamente");
		// 			setLiberImages(
		// 				LocalStorageService.getAllData(myLocalStorage)
		// 			);
		// 		} else {
		// 			message(
		// 				"error",
		// 				"Ocurrío un error al eliminar la imagen localmente"
		// 			);
		// 		}
		// 	}
		// });
	};

	return (
		<div className="glassmorphism w-full h-36 flex justify-between text-left mb-5 overflow-hidden">
			<img
				className="w-1/4 object-cover mr-2 transform hover:scale-105 cursor-pointer"
				src={url}
				alt={filename}
			/>
			<div className="flex-grow self-center">
				<table className="table-auto border-collapse w-full">
					<tbody>
						<tr>
							<th className="w-1/2">Nombre del archivo:</th>
							<td>{filename}</td>
						</tr>
						<tr>
							<th className="w-1/2">Dimensiones:</th>
							<td>{`${height} x ${width}`}</td>
						</tr>
						<tr>
							<th className="w-1/2">Tipo:</th>
							<td>{type}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="self-center mr-3">
				<a href={url} target="_blank" rel="noreferrer">
					<button className="bg-yellow-400 p-2 rounded-full hover:bg-yellow-500">
					</button>
				</a>
				<p className="my-2" />
				<button
					className="bg-red-500 p-2 rounded-full hover:bg-red-600"
					// onClick={removeImage}
				>
				</button>
			</div>
		</div>
	);
}
