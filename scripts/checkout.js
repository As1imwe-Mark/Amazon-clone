import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
// import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

// console.log(dayjs)

let cartSummaryHtml = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  const item = products.find((product) => product.id === productId);

  cartSummaryHtml += `
<div class="cart-item-container">
<div class="delivery-date">
  Delivery date: Wednesday, June 15
</div>

<div class="cart-item-details-grid">
  <img class="product-image"
    src="${item?.image}">

  <div class="cart-item-details">
    <div class="product-name">
    ${item?.name}
    </div>
    <div class="product-price">
      $${(item?.priceCents / 100).toFixed(2)}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-quantity" data-cart-id="${
        cartItem.productId
      }">
        Delete
      </span>
    </div>
  </div>

  <div class="delivery-options">
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>

      ${deliveryOptionsHtml(item)}
  </div>
</div>
</div>
`;

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;
});
  


function deliveryOptionsHtml(item){
  let html = ''
  deliveryOptions.forEach((option)=>{
    const prices = option.priceCents === 0 ? 'FREE' : `$${(option.priceCents /100).toFixed(2) } -`

    // const today = dayjs()

    // const deliverydate = today.add(option.deliveryDays, 'days')

    // const formattedDate = deliverydate.format('dddd, mmmm D')

   html+= `
    <div class="delivery-option">
      <input type="radio" checked class="delivery-option-input"
        name="delivery-option-${item?.id}">
      <div>
        <div class="delivery-option-date">
          Thursday, September 2024
        </div>
        <div class="delivery-option-price">
          ${prices} Shipping
        </div>
      </div>
    </div>
    `
  });

  return html
}

document.querySelectorAll(".js-delete-quantity").forEach((link) => {
  link.addEventListener("click", (e) => {
    const itemId = link.dataset.cartId;
    removeFromCart(itemId);
    e.target.parentElement.parentElement.parentElement.parentElement.remove();
    console.log(cart);
  });
});
