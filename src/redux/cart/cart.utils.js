export const addItemToCart = (cartItems, itemToAdd) => {
    const existingInCart = cartItems.find(cartItem => cartItem.id === itemToAdd.id)

    if (existingInCart) {
        return cartItems.map(cartItem => 
            cartItem.id === itemToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : 
            cartItem
        )
    }

    return [...cartItems, { ...itemToAdd, quantity: 1 }];
}


export const removeItem = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id)

    if (existingItem.quantity === 1)  {
        return cartItems.filter(cartItem => cartItemToRemove.id !== cartItem.id)
    }

    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ? cartItem.quantity - 1 : cartItem)
}