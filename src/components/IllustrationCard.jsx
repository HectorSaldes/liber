import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import '../assets/css/cardStyle.css';

export default function IllustrationCard({ payload, getIllustrationDownload }) {
	const {
		id,
		thumb2x: { url },
	} = payload;
	const header = () => (
		<div className='flex justify-content-center'>
			<Image
				src={url}
				alt='illus'
				height='300px'
				width='auto'
				style={{
					objectFit: 'cover',
					objectPosition: 'botton',
				}}
				preview
			/>
		</div>
	);

	return (
		<div
			className='col-12 sm:col-6 lg:col-4'
			data-aos="fade-up"
			key={id}>
			<Card
				style={{
					backgroundColor: 'var(--gray-600)',
				}}
				className='w-full iconCards'
				header={header}
				key={id}
				footer={
					<Button
						label='PNG'
						icon='pi pi-download'
						className='col-12 p-button p-button-warning p-button-outlined'
						onClick={() => getIllustrationDownload(id)}
					/>
				}
			/>
		</div>
	);
}
