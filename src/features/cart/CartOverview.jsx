import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/helpers";
import { useSelector } from "react-redux";
import {getTotalCartPrice, getTotalCartQty } from "./cartSlice";


function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQty);
  const totalCartPrice = useSelector(getTotalCartPrice);
  if (!totalCartQuantity) return null;
  return (
    <div className="btm-nav bg-primary z-[9999]">
      <p className="space-x-4 font-semibold text-md sm:space-x-6 flex flex-row">
        <span>{totalCartQuantity} items</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to={`/cart`} className="capitalize font-bold text-md">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
