import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';

export default function Error() {
	return (
		<div className='p-4 text-center'>
			<div
				className='font-semibold text-center'
				style={{ fontSize: '7em', color: 'var(--yellow-600)' }}>
				ERROR 404
			</div>
			<div
				className='mb-5'
				style={{ fontSize: '2em' }}>
				No se encontró esta página
			</div>
			<Link
				to='/'
				style={{ textDecoration: 'none' }}>
				<Button
					label='Regresar al inicio'
					icon='pi pi-home'
					className='p-button p-button-outlined p-button-secondary'
				/>
			</Link>
		</div>
	);
}
