import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=({onItCe,onButtonClick})=>
{
	return(
		<div className="f3" style={{textAlign:"center", marginBottom:"10%"}}>
			<div>
				<p>
				{'THis thing gonna detect faces in your images'}
				</p><br/>
				<div className='form center pa4 shadow-5 '>
					<input className ='center f4 w-70' type='text' onChange={onItCe}/><br/>
					<div className='center'>
						<button className = 'grow f4 link ma1 dib white bg-light-green' onClick={onButtonClick}>Detect</button>
					</div>
				</div>
			</div>
		</div>
		);

}

export default ImageLinkForm;