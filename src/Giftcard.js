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
		const { denominations } = this.state.data;
		let pricingOptions = "The gift card has the following pricing options:\n";
		denominations.forEach((denomination) => {
			pricingOptions += "$" + denomination.price + " " + denomination.currency + "\n";
		});
		alert(pricingOptions);
	}

	render() {
		return (
			<div className="giftcardContainer">
				<button className="giftcardBtn">
					<img src={this.state.data.image} className="giftcardImg" onClick={this.onClick} alt={this.state.data.brand}/>
				</button>
				<p>{this.state.data.brand}</p>
			</div>
		)
	}
}
export default Giftcard;
