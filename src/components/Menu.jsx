import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import LIBER from '../assets/svg/LIBER.svg';

export default function Menu() {
	const navigate = useNavigate();

	const items = [
		{
			label: 'Home',
			icon: 'pi pi-fw pi-home',
			command: () => navigate('/'),
		},
		{
			label: 'Icons',
			icon: 'pi pi-fw pi-box',
      items: [
        {
          label: 'Search by word',
          icon: 'pi pi-fw pi-box',
          command: () => navigate('/icons'),
        },{
          label: 'Search by ID',
          icon: 'pi pi-fw pi-box',
          command: () => navigate('/icons/by-id'),
        }
      ]
		},
		{
			label: 'Illustrations',
			icon: 'pi pi-fw pi-image',
			command: () => navigate('/illustrations'),
		},
		{
			label: 'Images',
			icon: 'pi pi-fw pi-camera',
			command: () => navigate('/images'),
		},
	];

	return (
		<Menubar
			model={items}
			start={<img className='mr-5' width='100' src={LIBER} alt='LOGO LIBER'/>}
			end={
				<a
					href='https://hectorsaldes.netlify.app/'
					target='_blank'
					rel='noreferrer'
					style={{ textDecoration: 'none' }}>
					<Button
						label='¡Give five! 👋🏼'
						className='p-button-warning p-button-outlined'
					/>
				</a>
			}
		/>
	);
}
