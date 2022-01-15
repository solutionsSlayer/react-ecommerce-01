import { createSelector } from "reselect";

export const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export  const selectCartHidden = createSelector(
    [selectCart],
    cart  => cart.hidden  
);

export const selectItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
    (accumulatedValue, cartItem) => accumulatedValue + cartItem.quantity,
    0
  )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumulatedValue, cartItem) => accumulatedValue + (cartItem.quantity * cartItem.price), 0)
)