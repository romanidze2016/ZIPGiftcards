import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import GiftcardItem from './GiftcardItem';

const giftcardProps = {
  id: "Ebay",
  brand: "Ebay",
  imgSrc: "https://files.prezzee.com.au/media/sku-theme-designs/ebay-e0cf8e10-4cda-41cb-be86-0f558a76bdbc/ebay.jpg",
  showPricing: () => {},
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GiftcardItem {...giftcardProps}/>, div);
});

it('renders giftcard name', () => {
  const { getByText } = render(<GiftcardItem {...giftcardProps} />);
  expect(getByText('Ebay')).toBeInTheDocument();
});

it('component has correct structure', () => {
	const { container } = render(<GiftcardItem {...giftcardProps} />);
	expect(container).toMatchInlineSnapshot(`
     <div>
       <div
         class="giftcardContainer"
         data-testid="giftcardItem"
       >
         <button
           class="giftcardBtn"
         >
           <img
             alt="Ebay"
             class="giftcardImg"
             src="https://files.prezzee.com.au/media/sku-theme-designs/ebay-e0cf8e10-4cda-41cb-be86-0f558a76bdbc/ebay.jpg"
           />
         </button>
         <p>
           Ebay
         </p>
       </div>
     </div>
	 `)
});
