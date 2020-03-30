import React from 'react';
import axios from 'axios'
import './GiftcardApp.css';
import GiftcardItem from './GiftcardItem';


class GiftcardApp extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
				giftcardDataById: {},
	    	displaySearch: false,
	    	searchResult: [],
	    }
	}

	componentDidMount() {
		this.fetchGiftCards();
	}

	fetchGiftCards = async () => {
		await axios.get(`${process.env.REACT_APP_ZIP_API_URL}/giftcards/api/giftcards`)
			.then(res => res.data)
			.then((giftcardData) => {
				this.setState({
					giftcardDataById: giftcardData.reduce(function(map, giftcard) {
						map[giftcard.id] = giftcard;
						return map;
					}, {}),
				})
			})
			.catch(console.log);
	}

	searchGiftCards = async (keyword) => {
		if (keyword !== '') {
			axios.get(`${process.env.REACT_APP_ZIP_API_URL}/giftcards/api/giftcards/keyword/${keyword.toLowerCase()}`)
			.then(res => res.data)
			.then((data) => {
				this.setState({
					displaySearch: true,
					searchResult: data.map(item => item._source.id),
				});
			})
			.catch(console.log);
		} else {
			this.setState({
				displaySearch: false,
				searchResult: [],
			});
		}
	}

	showPricing = (id) => {
		const { giftcardDataById } = this.state;

		let pricingOptions = "The gift card has the following pricing options:\n";
		giftcardDataById[id].denominations.forEach((denomination) => {
			pricingOptions += "$" + denomination.price + " " + denomination.currency + "\n";
		});

		return pricingOptions;
	}

	renderSearchResult() {
		const { displaySearch, searchResult, giftcardDataById } = this.state;
		if (!displaySearch) {
			return;
		}

		let result = (
			<div>
				<p>No results</p>
			</div>
		);
		if (searchResult.length > 0) {
			result = (
				<div className="giftcardGrid">
					{searchResult.map((id) => {
						return (
							<GiftcardItem
								key={id}
								id={id}
								imgSrc={giftcardDataById[id].image}
								brand={giftcardDataById[id].brand}
								showPricing={(key) => alert(this.showPricing(key))}
							/>
						);
					})}
				</div>
			);
		}
		return (
			<div>
				<h2>Search result</h2>
				{result}
			</div>
		);
	}

	renderAllGiftcards() {
		const { giftcardDataById } = this.state;

		return(
			<div>
				<h2>Featured cards</h2>
				<div className="giftcardGrid">
					{Object.keys(giftcardDataById).map((key) => {
						return(
							<GiftcardItem
								key={key}
								id={giftcardDataById[key].id}
								imgSrc={giftcardDataById[key].image}
								brand={giftcardDataById[key].brand}
								showPricing={(id) => alert(this.showPricing(id))}
							/>
						);
					})}
				</div>
      </div>
		);
	}

	render() {
		return (
			<div className="giftcardApp">
				<h1>ZIP Giftcards</h1>
				<input
					onChange={(event) => this.searchGiftCards(event.target.value)}
					className="searchBar"
					type="text"
					placeholder="Search gift cards"
				/>
				{this.renderSearchResult()}
				{this.renderAllGiftcards()}
			</div>
		)
	}
}
export default GiftcardApp;
