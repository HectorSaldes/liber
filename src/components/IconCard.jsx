import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function IconCard({ payload, getIconToDownload }) {
	const { name, commonName, platform, id } = payload;

	const header = () => (
		<div className='col-12 flex justify-content-center pt-2'>
			<img
				src={`https://img.icons8.com/${platform}/2x/${commonName}.png`}
				alt='icon'
				style={{ height: '100px', width: '100px' }}
			/>
		</div>
	);

	return (
		<div
			className='col-6 sm:col-4 md:col-2'
			key={id}>
			<Card
				style={{
					backgroundColor: 'var(--gray-600)',
				}}
				key={id}
				subTitle={() => name.substring(0, 12)}
				header={header}
				footer={
					<Button
						label='SVG'
						icon='pi pi-download'
						className='col-12 p-button p-button-warning p-button-outlined'
						onClick={() => getIconToDownload(id, commonName)}
					/>
				}
			/>
		</div>
	);
}
