import React from 'react';
import ReactDOM from 'react-dom';
import GiftcardApp from './GiftcardApp';
import {
	render, waitForElementToBeRemoved,
} from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GiftcardApp />, div);
});
