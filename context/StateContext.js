import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const showCartData = window.localStorage.getItem('isShowCart')
    const cartItemsData = window.localStorage.getItem('cartItems')
    const totalQuantitiesData = window.localStorage.getItem('totalQuantities')
    const totalPriceData = window.localStorage.getItem('totalPrice')

    if (showCartData !== null) setShowCart(showCartData)

    if (cartItemsData !== null) setCartItems(JSON.parse(cartItemsData))
    if (totalQuantitiesData !== null) setTotalQuantities(JSON.parse(totalQuantitiesData))
    if (totalPriceData !== null) setTotalPrice(JSON.parse(totalPriceData))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('isShowCart', JSON.stringify(showCart))
    window.localStorage.setItem('cartItems', JSON.stringify(cartItems))
    window.localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities))
    window.localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
  }, [showCart, cartItems, totalQuantities, totalPrice])

  let foundProduct;
  let index;

  const onAddToCart = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          const newQuantity = cartProduct.quantity + quantity;
          return {
            ...cartProduct,
            quantity: newQuantity,
          };
        } else {
          return {
            ...cartProduct,
          };
        }
      })
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, { ...product }]));
    }
    toast.success(`${quantity} ${product.name} added`)

  }


  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id)
    const newCartItems = cartItems.filter((item) => item._id !== product._id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems)
  }

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id)
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if (value === 'inc') {
      setCartItems([
        ...newCartItems.slice(0, index),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...newCartItems.slice(index)
      ]);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems.slice(0, index),
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ...newCartItems.slice(index)
        ]);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }

  return (
    <Context.Provider value={{ showCart, setShowCart, cartItems, setCartItems, totalPrice, setTotalPrice, setTotalQuantities, totalQuantities, quantity, onAddToCart, toggleCartItemQuantity, onRemove }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)