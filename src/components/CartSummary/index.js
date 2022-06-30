// Write your code here
import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const amountList = cartList.map(
        eachObj => eachObj.quantity * eachObj.price,
      )
      const totalAmount = amountList.reduce((a, b) => a + b)

      return (
        <div className="cart-summary">
          <h1 className="order-total">
            Order Total: <span className="money-total">Rs {totalAmount}/-</span>
          </h1>
          <p className="order-items-count">{cartList.length} Items in cart</p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
