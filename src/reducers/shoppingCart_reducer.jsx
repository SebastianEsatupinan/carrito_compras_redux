import TYPES from "./actionTypes";

export const productsInitialState = {
  products: [
    { id: 1, name: "Reloj", price: 50 },
    { id: 2, name: "Pulsera", price: 30 },
    { id: 3, name: "Colonia", price: 40 },
    { id: 4, name: "Memoria RAM", price: 78 },
    { id: 5, name: "Computador", price: 90 },
    { id: 6, name: "Billetera", price: 60 }
  ],
  cart: [],
  totalPriceShoppingCart: 0
}

export const reducerCart = (state, action) => {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newProduct = state.products.find(product => product.id === action.payload);
      let existingProduct = state.cart.find(product => product.id === newProduct.id);

      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(product =>
            product.id === newProduct.id ? { ...product, quantity: product.quantity + 1 } : product
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...newProduct, quantity: 1 }]
        };
      }
    }

    case TYPES.DELETE_PRODUCT_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload)
      }
    }

    case TYPES.DELETE_ALL_FROM_CART: {
      return productsInitialState;
    }

    case TYPES.CALCULATE_TOTAL_PRICE_OF_THE_CART: {
      return {
        ...state,
        totalPriceShoppingCart: state.cart.reduce((previousValue, product) => previousValue + product.price * product.quantity, 0)
      }
    }
    default:
      return state;
  }

  throw Error("Unknown action: " + action.type);
}
