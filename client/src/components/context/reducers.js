export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ALL_DATA":{
        return
    }
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };

    case "Remove_From_Cart":
      return {
        ...state,
        cart: [...state.cart.filter(item=>item._id!== action.payload._id)],
      };


    default:
      return state;
  }
};
