import React from "react";
import { Skeleton } from "primereact/skeleton";

export default function IconSkeleton() {
	let rows = [];
	for (let i = 0; i < 12; i += 1) {
		const data = (
			<div className="col-6 sm:col-4 md:col-2" key={i}>
				<Skeleton height="4rem" key={i} />
			</div>
		);
		rows.push(data);
	}
	return <div	className='grid'>{rows}</div>;
}
