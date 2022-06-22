import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import React from 'react';

export default function Search({
	autoCompleteState,
	autoCompleteSetState,
	autoCompleteSuggetions,
	autoCompleteMethod,
	autoCompleteSearchIcons,
	dropdownCategories,
	dropdownState,
	dropdownSetState,
	buttonSearch,
	buttonClear,
}) {
	return (
		<>
			<AutoComplete
				inputId='inputSearch'
				className='col-12 md:col-6'
				placeholder='Busca aquí...'
				value={autoCompleteState}
				autoFocus
				suggestions={autoCompleteSuggetions}
				completeMethod={autoCompleteMethod}
				onChange={(e) => autoCompleteSetState(e.value)}
				onKeyPress={({ key }) => autoCompleteSearchIcons(key)}
				inputStyle={{
					width: '100%',
				}}
			/>
			<div className='col-12 md:col-6'>
				<Dropdown
					style={{ width: '100%' }}
					options={dropdownCategories}
					value={dropdownState}
					emptyMessage='No hay opciones'
					placeholder='Selecciona una categoría'
					onChange={(e) => dropdownSetState(e.value)}
				/>
			</div>
			<div className='col-12 md:col-6'>
				<Button
					label='Buscar'
					icon='pi pi-search'
					className='p-button-info p-button-outlined'
					onClick={() => buttonSearch('Enter')}
					style={{
						width: '100%',
					}}
				/>
			</div>
			<div className='col-12 md:col-6'>
				<Button
					label='Borrar filtros'
					className='p-button-danger p-button-outlined'
					onClick={() => buttonClear()}
					style={{
						width: '100%',
					}}
				/>
			</div>
		</>
	);
}
