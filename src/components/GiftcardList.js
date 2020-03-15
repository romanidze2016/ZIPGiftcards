import React from 'react';
import './GiftcardList.css';
import Giftcard from './Giftcard';


class GiftcardList extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	giftcards: [],
	    	displaySearch: false,
	    	searchResult: [],
	    }
	    this.handleSearch = this.handleSearch.bind(this);
	}

	componentDidMount() {
		fetch('https://zip.co/giftcards/api/giftcards')
		.then(res => res.json())
		.then((data) => {
			this.setState({ giftcards: data })
		})
		.catch(console.log)
	}

	handleSearch(e) {
		if (e.target.value !== '') {
			fetch('https://zip.co/giftcards/api/giftcards/keyword/' + e.target.value)
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
				<div class="giftcardGrid">
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
				<div class="giftcardGrid">
					{giftcards.map((giftcard) => (
		            	<Giftcard key={giftcard.id} giftcardData={giftcard}/>
		            ))}
	            </div>
            </div>
		);
	}

	render() {
		return (
			<div className="GiftcardList">
				<h1>ZIP Giftcards</h1>
				<input onChange={this.handleSearch} className="searchBar" type="text" placeholder="Search gift cards" />
				{this.renderSearchResult()}
				{this.renderAllGiftcards()}
			</div>
		)
	}
}
export default GiftcardList;
