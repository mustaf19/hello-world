import React from 'react';

const Rank=({name,entries})=>
{
	return(
		<div style={{ textAlign:"center" }}>
			<div className="white f3">
				{` ${name} Hi! How are you!!`}
			</div>
			<div className = "white f1">
				{entries}

			</div>
		</div>
		);

}

export default Rank;