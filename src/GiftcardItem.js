import React from 'react';
import PropTypes from 'prop-types';
import './GiftcardApp.css';

const GiftcardItem = ({id, imgSrc, brand, showPricing}) => (
  <div data-testid="giftcardItem" className="giftcardContainer">
    <button className="giftcardBtn" onClick={() => showPricing(id)}>
      <img src={imgSrc} className="giftcardImg" alt={brand}/>
    </button>
    <p>{brand}</p>
  </div>
);

GiftcardItem.propTypes = {
  id: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  showPricing: PropTypes.func.isRequired,
};

export default GiftcardItem;
