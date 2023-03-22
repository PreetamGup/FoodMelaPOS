const intialState= {
    loading: false,
    cartItems:[]
}

export const rootReducer = (state= intialState, action)=>{

    switch (action.type) {
      case "AddToCart":
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };

      case "UpdateCart":
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };

      case "DeleteFromCart":
        return {
          ...state,
          cartItems: state.cartItems.filter((item) =>
            item._id !== action.payload._id
          ),
        };
      default:
        return state;
    }
}