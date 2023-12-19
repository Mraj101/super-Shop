import React, { createContext, useContext, useReducer, useState } from "react";
import { reducer } from "./reducers";

export const AppContext = createContext();

const initialState= {
  fetchSingleProduct:[],
  cartProduct:[],
}



export const ContextProvider = ({ children }) => {

 const [cartProducts,setCartProducts]=useState([])
 
 const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <AppContext.Provider value={{cartProducts,setCartProducts}}>
      {children}
    </AppContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
