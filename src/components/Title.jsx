import React from "react";

const Title = ({ title, description }) => (
	<div className='my-3 text-center'>
		<div className='font-bold mb-3' style={{ fontSize: "30px", color:'red' }}>
			ATENTION: TO USE THIS APP YOU NEED TO ALLOW CORS API. {' '}
			<a href="https://hectorsald.notion.site/How-to-allow-CORS-API-d53563af139e4992abebf40e04f06bbf" target='_blank' rel='noreferrer'>
				CLICK HERE TO SEE HOW TO DO IT
			</a>
		</div>
		<div className='font-bold' style={{ fontSize: "40px" }}>{title}</div>
		<div className='text-justify sm:text-center' style={{ fontSize: "25px" }}>{description}</div>
	</div>
);

export default Title;
