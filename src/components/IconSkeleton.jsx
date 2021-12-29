import React from "react";
import { Skeleton } from "primereact/skeleton";
export default function IconSkeleton() {
	let rows = [];
	for (let i = 0; i < 12; i++) {
		let data = (
			<div className="p-col-6 p-sm-4 p-md-2" key={i}>
				<Skeleton height="4rem" />
			</div>
		);
		rows.push(data);
	}
	return <>{rows}</>;
}
