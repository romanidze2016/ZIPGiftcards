import React from 'react';
import './Giftcard.css';
import Giftcard from './Giftcard';


class GiftcardApp extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	giftcards: [],
	    	displaySearch: false,
	    	searchResult: [],
	    }
	}

	componentDidMount() {
		this.fetchGiftCards();
	}

	fetchGiftCards = () => {
		let url = `${process.env.REACT_APP_ZIP_API_URL}/giftcards/api/giftcards`;

		fetch(url)
			.then(res => res.json())
			.then((allGiftcards) => {
				this.allGiftcards = allGiftcards;
				return this.setState({
					giftcards: allGiftcards,
				})
			})
			.catch(console.log);
	}

	searchGiftCards= (keyword) => {
		if (keyword !== '') {
			fetch(`${process.env.REACT_APP_ZIP_API_URL}/giftcards/api/giftcards/keyword/${keyword.toLowerCase()}`)
			.then(res => res.json())
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

	renderSearchResult() {
		const { giftcards, displaySearch, searchResult } = this.state;
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
					{giftcards.filter(giftcard => searchResult.includes(giftcard.id)).map((giftcard) => {
						return (
							<Giftcard key={giftcard.id} giftcardData={giftcard}/>
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
		const { giftcards } = this.state;

		return(
			<div>
				<h2>Featured cards</h2>
				<div className="giftcardGrid">
					{giftcards.map((giftcard) => (
		            	<Giftcard key={giftcard.id} giftcardData={giftcard}/>
		            ))}
	            </div>
            </div>
		);
	}

	render() {
		return (
			<div className="giftcardList">
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
