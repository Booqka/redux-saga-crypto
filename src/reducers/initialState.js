const initialState = {
  cryptos: [
    {
      name: 'bitcoin',
      price: 0,
      growth: true,
    },
    {
      name: 'ethereum',
      price: 0,
      growth: false,
    },
    {
      name: 'monero',
      price: 0,
      growth: false,
    },
    {
      name: 'litecoin',
      price: 0,
      growth: false,
    },
  ],
  loading: false,
  error: false,
};

export default initialState;
