import React from 'react';
import ReactDOM from 'react-dom';
import GiftcardApp from './GiftcardApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GiftcardApp />, div);
});