import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCart} from "../services/apiProduct";
import { useDispatch } from "react-redux";


const DBCARTContext = createContext();

function DBCARTContextProvider({ children }) {
  const { mutate } = useMutation({
    mutationFn: createCart,
    onSuccess: (data) => {
      setCartID(data);
    },
  });
  
  let jsonString = localStorage.getItem("CartID");
  if (jsonString) {
    try {
      if (!jsonString) {
        mutate();
      } else {
        jsonString = JSON.parse(jsonString);
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      mutate();
    }
  } else {
    console.error("No JSON data found in localStorage");
    mutate();
  }
  const [CartID, setCartID] = useState(jsonString);
  useEffect(
    function () {
      localStorage.setItem("CartID", JSON.stringify(CartID));
    },

    [CartID]
  );
  
  return (
    <DBCARTContext.Provider value={{ CartID, setCartID }}>
      {children}
    </DBCARTContext.Provider>
  );
}
function useDBCartContext() {
  const context = useContext(DBCARTContext);
  if (context === undefined)
    throw new Error("CartContext was used outside of CartProvider");
  return context;
}

export { DBCARTContextProvider, useDBCartContext };
