import { useState, useEffect } from "react";

export function useLocalStorageStateCart(initialState, key) {
  "initial state",
    initialState,
    localStorage.getItem(key),
    JSON.parse(localStorage.getItem(key));
  const [value, setValue] = useState(initialState);

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
