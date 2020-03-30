import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";
import GiftcardApp from './GiftcardApp';

afterEach(cleanup);

it("fetches and displays featured giftcards", async () => {
  axiosMock.get.mockResolvedValue({
    data: [
      {
  			id: 'Woolworths',
  			brand: 'Woolworths',
  			image: 'https://files-sb.prezzee.com.au/media/sku-theme-designs/woolworths-d53dec77-da14-429d-9778-efc57607cc89/woolworths.jpg',
  			denominations: [{
  				price: '100',
  				currency: 'AUD',
  			}],
		  },
      {
  			id: 'Coles',
  			brand: 'Coles',
  			image: 'https://files-sb.prezzee.com.au/media/sku-theme-designs/coles-bf6e5d02-5763-4c98-b1ce-fc3e7c1219da/coles.jpg',
  			denominations: [{
  				price: '12',
  				currency: 'AUD',
  			}],
		  },
    ]
  });

  const { getAllByTestId, getByText } = render(<GiftcardApp />);
  const allGiftcards = await waitForElement(() => getAllByTestId('giftcardItem'));
  const colesGifcardTitle = await waitForElement(() => getByText('Coles'));
  const woolworthsGifcardTitle = await waitForElement(() => getByText('Woolworths'));

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(allGiftcards.length).toEqual(2);
  expect(colesGifcardTitle).toBeInTheDocument();
  expect(woolworthsGifcardTitle).toBeInTheDocument();
});

it('alerts pricing options when giftcard is clicked', async () => {
  axiosMock.get.mockResolvedValue({
    data: [
      {
  			id: 'Coles',
  			brand: 'Coles',
  			image: 'https://files-sb.prezzee.com.au/media/sku-theme-designs/coles-bf6e5d02-5763-4c98-b1ce-fc3e7c1219da/coles.jpg',
  			denominations: [{
  				price: '12',
  				currency: 'AUD',
  			}],
		  }
    ]
  });
	global.alert = jest.fn();

	const { getByRole } = render(<GiftcardApp />)
  const fetchedGiftcard = await waitForElement(() => getByRole('button'));
  fireEvent.click(fetchedGiftcard)

	expect(global.alert).toBeCalledWith("The gift card has the following pricing options:\n$12 AUD\n");
})
