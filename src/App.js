import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachObj => eachObj.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachObj => {
        if (eachObj.id === id) {
          const newQuantity = eachObj.quantity + 1
          return {...eachObj, quantity: newQuantity}
        }
        return eachObj
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const targetProduct = cartList.find(eachProd => eachProd.id === id)
    if (targetProduct.quantity === 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(eachObj => eachObj.id !== id),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachObj => {
          if (eachObj.id === id && eachObj.quantity > 1) {
            const newQuantity = eachObj.quantity - 1
            return {...eachObj, quantity: newQuantity}
          }
          return eachObj
        }),
      }))
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const targetProduct = cartList.find(eachProd => eachProd.id === product.id)
    if (targetProduct === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachObj => {
          if (eachObj.id === targetProduct.id) {
            const newQuantity = eachObj.quantity + product.quantity
            return {...eachObj, quantity: newQuantity}
          }
          return eachObj
        }),
      }))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
