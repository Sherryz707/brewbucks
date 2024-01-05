import { Outlet, useLoaderData } from "react-router-dom";
import SidebarNav from "./SidebarNav";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../../services/apiMenu";
import { useDBCartContext } from "../../context/CartDBContext";
import { getCartAPI } from "../../services/apiProduct";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";

function MenuPage() {
  const dispatch = useDispatch();
  const { initialMenu, initialCart } = useLoaderData();
  const { data: menu } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => getMenu(),
    initialMenu,
  });
  const { CartID } = useDBCartContext();
  const { data: cartDB } = useQuery({
    queryKey: ["cart", CartID],
    queryFn: getCartAPI(CartID),
    initialCart,
  });
  if (cartDB.items.length > 0) {
    cartDB.items?.map((el) => dispatch(addItem(el)));
  }
  return (
    <>
      <div className="lg:grid min-h-full lg:grid-cols-[0.5fr_2fr]">
        <div className="menu w-full bg-base-300 hidden lg:block my-3 rounded-lg">
          <SidebarNav origCateg={menu} category={menu} index={0} />
        </div>
        <Outlet />
      </div>
    </>
  );
}
export const loader = (queryClient) => async () => {
  const menu = await queryClient.ensureQueryData({
    queryKey: ["menu"],
    queryFn: async () => getMenu(),
  });
  const cartid = JSON.parse(localStorage.getItem("CartID"));
  const cart = await queryClient.ensureQueryData({
    queryKey: ["cart", cartid],
    queryFn: async () => getCartAPI(cartid),
  });
  return { initialMenu: menu, initialCart: cart };
};
export default MenuPage;
