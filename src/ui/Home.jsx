import { useDispatch } from "react-redux";
import { createCart, getCartAPI } from "../services/apiProduct";
import { useDBCartContext } from "../context/CartDBContext";
import { addItem } from "../features/cart/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const initialData = useLoaderData();
  const { CartID } = useDBCartContext();
  const { data: cartDB } = useQuery({
    queryKey: ["cart", CartID],
    queryFn: getCartAPI(CartID),
    initialData,
  });
  "data", cartDB;
  if (cartDB.items.length > 0) {
    cartDB.items?.map((el) => dispatch(addItem(el)));
  }
  return <div className="bg-yellow-500">Home</div>;
}
export const loader = (queryClient) => async () => {
  const cartid = JSON.parse(localStorage.getItem("CartID"));
  const data = await queryClient.ensureQueryData({
    queryKey: ["cart", cartid],
    queryFn: async () => getCartAPI(cartid),
  });
  return data;
};
export default Home;
