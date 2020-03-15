import React from 'react';
import './GiftcardApp.css';

class Giftcard extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	data: props.giftcardData,
	    };
	}

	showPricing() {
		const { denominations } = this.state.data;
		let pricingOptions = "The gift card has the following pricing options:\n";
		denominations.forEach((denomination) => {
			pricingOptions += "$" + denomination.price + " " + denomination.currency + "\n";
		});
		return pricingOptions;
	}

	render() {
		return (
			<div className="giftcardContainer">
				<button className="giftcardBtn" onClick={() => alert(this.showPricing())}>
					<img src={this.state.data.image} className="giftcardImg" alt={this.state.data.brand}/>
				</button>
				<p>{this.state.data.brand}</p>
			</div>
		)
	}
}
export default Giftcard;
