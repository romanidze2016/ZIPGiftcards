import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render } from '@testing-library/react';
import Giftcard from './Giftcard';

const giftcardJson = {
	"brand": "Ebay",
	"image": "https://files.prezzee.com.au/media/sku-theme-designs/ebay-e0cf8e10-4cda-41cb-be86-0f558a76bdbc/ebay.jpg",
	"denominations": [{"currency": "AUD", "price": 100}]
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Giftcard giftcardData={giftcardJson} />, div);
});

it('renders giftcard name', () => {
  const { getByText } = render(<Giftcard giftcardData={giftcardJson} />);
  expect(getByText('Ebay')).toBeInTheDocument();
});

it('component has correct structure', () => {
	const { container } = render(<Giftcard giftcardData={giftcardJson} />);
	expect(container).toMatchInlineSnapshot(`
     <div>
       <div
         class="giftcardContainer"
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

it('alerts pricing options on click', async () => {
	global.alert = jest.fn();
	const { getByRole } = render(<Giftcard giftcardData={giftcardJson} />)
  	fireEvent.click(getByRole('button'))
	expect(global.alert).toBeCalledWith("The gift card has the following pricing options:\n$100 AUD\n");
})