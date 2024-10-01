export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: '1'

  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
  },
]

export const saveToStorage=()=>{
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const addToCart = (productId) => {
  const itemIndex = cart.findIndex((item) => item.productId === productId);

  cart[itemIndex]?.productId === productId
    ? [...cart, cart[itemIndex].productId, cart[itemIndex].quantity++]
    : cart.push({ productId, quantity: 1 , deliveryOptionId:'1'});

    saveToStorage()
};

export const removeFromCart=(ID)=>{
  cart = cart.filter((item)=> item.productId !== ID)
  saveToStorage()
}