 import React from 'react';
import Navigation from './Components/Navigation/Navigation.js';
import Logo from './Components/Logo/Logo.js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/rank.js';
import Register from './Components/Register/Register.js';
import Signin from './Components/Signin/Signin.js';
import Clarifai from 'clarifai';
// import Particles from 'react-particles-js';
import './App.css';

// const particlesOption = {
// 	 particles: {
// 	 	number: {
// 	 		value: 30,
// 	 		density: {
// 	 			enable: true,
// 	 			value_area: 800
// 	 		}
// 	 	}
// 	 }
// }

const app = new Clarifai.App({
	apiKey: '69046c46e2434a7c9758db2f3c321efa'
});

const initialState ={
			input: '',
			imageUrl: '',
			box: {}, //to box around fcaes
			route: 'signin',
			isSignedIn: false,
			user: {
				id: '',
				name:'',
				email: '',
				entries: 0,
				joined:''
			}
			

}

class App extends React.Component
{
	constructor()
	{
		super();
		this.state= initialState;
	}
	//why password is not included??


	loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  // why password not included in loadUser??

	componentDidMount() {
		fetch('http://localhost:3000/')
		.then(response => response.json())
		.then(console.log)  //or .then(console.log)
	}

	calculateFaceLocation = (data) =>
	{
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		//^this above gives percenages at which the point is wrt image..
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		console.log(width,height);
		return{	
			leftCol : clarifaiFace.left_col * width,
			topRow : clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row *height)

		}
	}

	displayFaceBox = (box)=> 
	{
		console.log(box);
		this.setState({box: box});
	}


	onInputChange = (event) => 
	{
		console.log(event.target.value);
		this.setState({input: event.target.value});
	}

	onButtonClick = () => 
	{
		// console.log('click');
		
		this.setState({imageUrl: this.state.input});
		// "https://samples.clarifai.com/face-det.jpg"
		// const x = this.state.imageUrl;
		// app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
		// .then(response => {
			fetch('http://localhost:3000/imageurl', {
				method: 'post',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					input: this.state.input
				})
			})
			.then(response  => response.json())
			.then(response => {
				if(response){
				fetch('http://localhost:3000/image',{
					method: 'put',
					headers:{"Content-Type": 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
				.then(response => response.json())
				.then(count => {
					// this.setState({
					// 	user: {
					// 		entries: count
					// 	}
					// }) cause its changing whole onject .. thats why!! we'll use this below
					this.setState(Object.assign(this.state.user, { entries : count}))
				})
				.catch(console.log)
			
		}
		this.displayFaceBox(this.calculateFaceLocation(response))
	})
		.catch(err=> console.log(err));
			// {
				// console.log(response);
				// console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
				
			
	// 		function(err)
	// 		{
	// 			console.log(err);
	// 		}
	// 	);
	}

	onRouteChange=(route)=>{
		if(route==='signin')
		{
			this.setState(initialState);
		} 
		else if(route==='home') 
		{
			this.setState({isSignedIn: true});
			
		}
		this.setState({route: route});
	}

	render()
	{
		return(

			<div className="App">
			{/*}	<Particles className='particles'
			// 		params={particlesOption}
			// 	/>*/}
				<Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
				{this.state.route === 'home' 
				? <div>
					<Logo />
					<Rank name={this.state.user.name} entries={this.state.user.entries}/>
					<ImageLinkForm onItCe={this.onInputChange} onButtonClick={this.onButtonClick}/>
					<FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
				</div>
					:(
						this.state.route === 'signin'
						? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
						: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
				)
			}
			</div>
			);
	}
}

export default App;