export const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
  // Calculate item price
  // (
  //   product.price -
  //   product.price * (product.discountPercent / 100)
  // ).toFixed(2)}
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + (item.price - (item.price * (item.discountPercent/100))) * item.qty, 0)
  );

  // Calculate shipping price (If order is over $100 then free, else $10 shpping)

  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate tax price (15% tax)

  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate total price

  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
