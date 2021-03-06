import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import LIBER from '../assets/svg/LIBER.svg';

export default function Menu() {
	const navigate = useNavigate();

	const items = [
		{
			label: 'Inicio',
			icon: 'pi pi-fw pi-home',
			command: () => navigate('/'),
		},
		{
			label: 'Iconos',
			icon: 'pi pi-fw pi-box',
			command: () => navigate('/icons'),
		},
		{
			label: 'Ilustraciones',
			icon: 'pi pi-fw pi-image',
			command: () => navigate('/illustrations'),
		},
		{
			label: 'Imágenes',
			icon: 'pi pi-fw pi-camera',
			command: () => navigate('/images'),
		},
	];

	return (
		<Menubar
			model={items}
			start={
				<img
					className='mr-5'
					width='100'
					src={LIBER}
					alt='LOGO LIBER'
				/>
			}
			end={
				<a
					href='https://hectorsaldes.netlify.app/'
					target='_blank'
					rel='noreferrer'
					style={{ textDecoration: 'none' }}>
					<Button
						label='¡Dame esos 5! 👋🏼'
						className='p-button-info p-button-outlined'
					/>
				</a>
			}
		/>
	);
}
