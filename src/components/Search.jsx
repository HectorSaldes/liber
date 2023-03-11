import { AutoComplete } from "primereact/autocomplete";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import React from "react";

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
		<div className='grid p-2'>
			<div className='col-12 col-offset-0 md:col-6 md:col-offset-3'>
				<div className='grid'>
					<AutoComplete
						inputId='inputSearch'
						className='col-12 md:col-6'
						placeholder='Search here'
						value={autoCompleteState}
						autoFocus
						suggestions={autoCompleteSuggetions}
						completeMethod={autoCompleteMethod}
						onChange={(e) => autoCompleteSetState(e.value)}
						onKeyPress={({ key }) => autoCompleteSearchIcons(key)}
						inputStyle={{
							width: "100%",
						}}
					/>
					<div className='col-12 md:col-6'>
						<Dropdown
							style={{ width: "100%" }}
							options={dropdownCategories}
							value={dropdownState}
							emptyMessage='No options'
							placeholder='Select a category'
							onChange={(e) => dropdownSetState(e.value)}
						/>
					</div>
					<div className='col-12 md:col-6'>
						<Button
							label='Search'
							icon='pi pi-search'
							className='p-button-info'
							onClick={() => buttonSearch("Enter")}
							style={{
								width: "100%",
							}}
						/>
					</div>
					<div className='col-12 md:col-6'>
						<Button
							label='Clear filters'
							icon='pi pi-times'
							className='p-button-danger'
							onClick={() => buttonClear()}
							style={{
								width: "100%",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
