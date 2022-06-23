import { Button } from 'primereact/button';
import React from 'react'

export default function ButtonMore({ title, loading, onLoadingClick }) {
  return (
    <div className='col-12 text-center mt-5'>
		<Button
			className='p-button-info p-button-outlined'
			label={title}
			loading={loading}
			onClick={onLoadingClick}
		/>
	</div>
  )
}
