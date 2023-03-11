import React from "react";

const Title = ({ title, description }) => (
	<div className='my-3'>
		<div className='font-bold' style={{ fontSize: "40px" }}>
			{title}
		</div>
		<div className='text-justify sm:text-center' style={{ fontSize: "25px" }}>
			{description}
		</div>
	</div>
);

export default Title;
