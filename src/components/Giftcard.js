import React from 'react';
import './Giftcard.css';

class Giftcard extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: props.giftcardData,
	    };
	    this.onClick = this.onClick.bind(this);
	}

	onClick() {
		console.log(this.state.data);
		alert(this.state.data.terms);
	}

	render() {
		return (
			<div>
				<img src={this.state.data.image} className="giftcardImg" onClick={this.onClick} alt={this.state.data.brand}/>
				<p>{this.state.data.brand}</p>
			</div>
		)
	}
}
export default Giftcard;
