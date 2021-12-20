import React, { useState, useEffect } from "react";
import Menu from "../components/Menu";
import ImagesService from "../service/ImagesService";
import LocalStorageService from "../service/LocalStorageService";
import Swal from "sweetalert2";
import ImageCard from "../components/ImageCard";

export default function Images() {
	const myLocalStorage = "liber-images";
	const [liberImages, setLiberImages] = useState([]);
	const [image, setImage] = useState(null);
	const [imageData, setImageData] = useState(null);

	useEffect(() => {
		setLiberImages(LocalStorageService.initLocal(myLocalStorage));
	}, []);

	const onSubmit = async () => {
		if (image !== null) {
			waitForResponse();
			let data = new FormData();
			data.append("image", image, image.name);
			let batch = await getBatch();
			if (batch.latency === 0) {
				let dataImage = await getImageUploaded(data, batch.id);
				Swal.close();
				setImageData(dataImage);
				if (LocalStorageService.saveData(myLocalStorage, dataImage)) {
					message(
						"success",
						"Imagen subida y guardada correctamente"
					);
					setLiberImages(
						LocalStorageService.getAllData(myLocalStorage)
					);
				} else {
					message(
						"error",
						"Ocurrío un error al guardar la imagen localmente"
					);
				}
			}
		} else {
			message(
				"error",
				"Necesitas colocar una imagen .jpg, .jpeg, o .png"
			);
		}
	};

	const waitForResponse = () => {
		Swal.fire({
			title: "Guardando en la nube",
			html: "Esto no tardará demasiado",
			allowOutsideClick: false,
			didOpen: () => Swal.showLoading(),
		});
	};

	const removeImage = () => {
		setImageData(null);
		setImage(null);
	};

	const getBatch = async () => {
		return ImagesService.getBatches()
			.then(({ data }) => data)
			.catch((err) => {
				Swal.close();
				message(
					"error",
					"Ocurrió un error con la petición al servidor"
				);
			});
	};

	const getImageUploaded = async (formData, batch) => {
		return ImagesService.uploadImage(formData, batch)
			.then(({ data }) => data)
			.catch((err) => {
				Swal.close();
				message(
					"error",
					"Ocurrió un error con la petición al servidor"
				);
			});
	};

	const message = (type, desc) => {
		Swal.fire({
			position: "top-end",
			icon: type,
			title: desc,
			showConfirmButton: false,
			timer: 2000,
		});
	};

	return (
		<div
			className="w-full h-full md:h-screen p-4 text-white"
			style={{
				background:
					"linear-gradient(116.82deg, #B47904 0%, #8C5E03 100%)",
			}}
		>
			<div className="glassmorphism w-full h-full overflow-y-auto">
				<Menu />
				<div className="mt-5 w-auto h-auto">
					<div className="text-center">
						<p className="text-5xl font-bold">Imágenes</p>
						<p className="text-2xl py-2">
							Aquí podrás guardar tus imágenes en internet para
							poder usarlas en cualquier lado
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 p-5 gap-3">
						<div className="text-center p-3">
							<div>
								<div className="flex justify-center">
									<div className="mb-3 w-full">
										<h2 className="mb-2 text-3xl font-semibold">
											Escoge tu imagen
										</h2>
										<input
											className="block w-full px-2 py-1.5 text-xl text-gray-700 bg-white border border-solid  border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600  focus:outline-none"
											id="image"
											type="file"
											name="image"
											accept="image/*"
											onChange={(e) =>
												setImage(e.target.files[0])
											}
										/>
									</div>
								</div>
								<button
									className="glassmorphism w-full md:w-1/2 py-3 text-xl font-semibold hover:bg-yellow-400 hover:text-black"
									onClick={onSubmit}
								>
									Guardar imagen
								</button>
								<button
									className="glassmorphism mt-2 md:mt-0 ml-0 md:ml-2 w-full md:w-1/3 py-2 px-5 text-lg font-semibold hover:bg-red-500 hover:text-black"
									onClick={removeImage}
								>
									Quitar imagen
								</button>
							</div>

							{imageData && (
								<div className="mt-10">
									<h2 className="mb-2 text-3xl font-semibold">
										Resultado de imagen guardada
									</h2>
									<div className="w-full rounded-md glassmorphism">
										<img
											className="w-full h-52 object-cover"
											src={imageData.source.url}
											alt=""
										/>
										<div className="p-5 text-xl text-left">
											<table className="table-auto border-collapse w-full">
												<thead>
													<tr>
														<th>Clave</th>
														<th>Valor</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>ID:</td>
														<td>{imageData.id}</td>
													</tr>
													<tr>
														<td>
															Nombre del archivo:
														</td>
														<td>
															{imageData.filename}
														</td>
													</tr>
													<tr>
														<td>Dimensiones:</td>
														<td>{`${imageData.source.height} x ${imageData.source.width}`}</td>
													</tr>
													<tr>
														<td>Tipo:</td>
														<td>
															{
																imageData.source
																	.type
															}
														</td>
													</tr>
													<tr>
														<td>URL:</td>
														<td>
															<a
																href={
																	imageData
																		.source
																		.url
																}
																target="_blank"
																className="underline text-yellow-300"
																rel="noreferrer"
															>
																Enlace aquí
															</a>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							)}
						</div>
						<div className="text-center p-3 ">
							<h2 className="mb-2 text-3xl font-bold">
								Tus imágenes almacenadas
							</h2>
							<div className="p-3">
								{liberImages.map((img, i) => (
									<ImageCard
										key={i}
										img={img}
										Swal={Swal}
										message={message}
										myLocalStorage={myLocalStorage}
										LocalStorageService={
											LocalStorageService
										}
										setLiberImages={setLiberImages}
									/>
								))}
								{liberImages.length === 0 ? (
									<div>
										<h2 className="text-2xl">
											¡No hay nada almanecado aún!
										</h2>
										<p className="text-xl">
											Empieza a subir imágenes 😎
										</p>
									</div>
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
