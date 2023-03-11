import React from "react";
import Empty from "../assets/svg/emptyIcons.svg";

export default function EmptySearch({ title, color }) {
	return (
		<div className='col-12 text-center'>
			<h1>Begin looking for some {title}</h1>
			<img
				src={Empty}
				alt='empty'
				width={300}
				style={{ backgroundColor: `var(--yellow-200)` }}
			/>
		</div>
	);
}
