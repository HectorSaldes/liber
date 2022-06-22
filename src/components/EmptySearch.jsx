import React from 'react';
import Empty from '../assets/svg/emptyIcons.svg';

export default function EmptySearch({title, color}) {
	return (
		<div className='col-12 text-center'>
			<h1>Empieza por buscar algun@s {title}</h1>
			<img
				src={Empty}
				alt='empty'
				width={300}
				style={{
					backgroundColor: `var(--${color}-400)`,
				}}
			/>
		</div>
	);
}
