import React from 'react';
import Tilt from 'react-tilt';
import logo1 from './logo.png';

const Logo=()=>
{
	return(
		<div className="ma4 mt0" style={{ float: 'left'}}>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 250, width: 250 }} >
		 		<div className="Tilt-inner pa3">
		 			<img alt="logow" src={logo1} />
		 		</div>
			</Tilt>
		</div>
		);

}

export default Logo;