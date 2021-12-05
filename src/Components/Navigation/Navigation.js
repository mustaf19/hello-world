import React from 'react';

const Navigation = ({onRouteChange,isSignedIn}) =>{
		if(isSignedIn === true)
		{
			return(
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick={()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign Out</p>
				</nav>
				);
		}
		else
		{
			return(
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick={()=>onRouteChange('signin')} className="f3 link dim black underline pa3 pointer">Sign In</p>
					<p onClick={()=>onRouteChange('register')} className="f3 link dim black underline pa3 pointer">Register</p>
				</nav>
			);
		}
		
}

export default Navigation;

// /* tachyons keywords
// f3=>
// 	same as h3
// 	and f1 f2 f3.. f6 == h1 h2 h3..h6
// link=>
// 	type of text
// 	same as anchor tag
// dim black=>
// 	whenever you hover/click on it ..
// 	it chnages color to dim(of what color you mention)
// 	try dim blue
// pa3=>
// 	padding 3
// pointer=>
// 	so whenever you hover over it.. it shows a pointer to you

// */