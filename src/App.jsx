import { useReducer } from 'react';
import './App.css';
import ProductItem from './components/Producitem';
import ShoppingCartProduct from './components/ShoppingCartProduct';
import { reducerCart, productsInitialState } from './reducers/shoppingCart_reducer';
import TYPES from './reducers/actionTypes';

function App() {

  const [state, dispatch] = useReducer(reducerCart, productsInitialState);

  const addToCart = (id) => {
    dispatch({
      type: TYPES.ADD_TO_CART,
      payload: id
    })
  }

  const deleteFromCart = (id) => {
    dispatch({
      type: TYPES.DELETE_PRODUCT_FROM_CART,
      payload: id
    })
  }

  const clearCart = () => {
    dispatch({
      type: TYPES.DELETE_ALL_FROM_CART
    })
  }

  const calculateTotalPriceOfCart = () => {
    dispatch({ type: TYPES.CALCULATE_TOTAL_PRICE_OF_THE_CART })
  }


  return (
    <>
      <h1 className='title'>Tienda De Practica Reducer</h1>
      <hr />
      <h2 className='subtitle_products'>Productos Disponibles</h2>
      <div className='container_grid_products'>
        {
          state.products.map((product) => {
            return <ProductItem key={product.id} data={product} addToCart={addToCart} />
          })
        }
      </div>

      <hr />
      <h2 className='subtitle_shopping_cart'>Carrito de Compras</h2>
      <div className='container_buttons'>
        <button className='btn btn_totalPrice' onClick={() => calculateTotalPriceOfCart()}>Precio Total</button>
        {state.totalPriceShoppingCart > 0 && <p className='totalPrice_shoppingCart'>Total a Pagar: {state.totalPriceShoppingCart}</p>}
        <button className='btn btn_ClearCart' onClick={() => clearCart()}>Vaciar Carrito</button>
      </div>
      {
        state.cart.length === 0 && <p className='text_NoProductsInCart'>No hay nada en el carrito</p>
      }

      <div className='container_grid_shopping_cart'>


        {
          state.cart.map((productCart) => {
            return <ShoppingCartProduct key={productCart.id + (Math.random() * 50)} data={productCart} deleteFromCart={deleteFromCart} />
          })
        }
      </div>
    </>
  )
}

export default App